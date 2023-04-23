// eslint-disable-next-line @typescript-eslint/no-var-requires
const i18NextConfig = require('./next-i18next.config');
const { i18n } = i18NextConfig;

const isProd = process.env.NODE_ENV === 'production';

const BASE_PREFIX_APP = '/nextjs-demo';
const BASE_VERSION_ONLY = '/0.0.0';
const BASE_PREFIX_APP_WITH_VERSION = `${BASE_PREFIX_APP}${BASE_VERSION_ONLY}`;

// const _crypto = require('crypto');

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  ...(isProd ? { output: 'standalone' } : {}),
  outputFileTracing: isProd,
  experimental: {
    bundleServerPackages: isProd,
  },

  i18n,

  // We want the static assets, api calls, and _next/data calls
  // to have /nextjs-demo/0.0.0/ as the prefix so they route cleanly
  // to an isolated folder on the S3 bucket and to a specific
  // lambda URL without having to do any path manipulation

  assetPrefix: isProd ? BASE_PREFIX_APP_WITH_VERSION : BASE_PREFIX_APP_WITH_VERSION,

  // Compression is on by default, but we want to turn it off because
  // we're using AWS Lambda Web Adapter to handle the compression
  compress: false,

  webpack: (config, options) => {
    const { dev, isServer } = options;

    if (isServer && config.name === 'server' && !dev) {
      // We don't need huge code on the server-side
      config.optimization.minimize = true;

      // If some packages need to be forced external, do that here
      // config.externals.push({
      //   'package': 'package',
      // });
    }

    return config;
  },

  // Get the _next/data calls rebased with the version
  // This requires custom Next.js routing in the Origin Request
  // Lambda function
  async generateBuildId() {
    return BASE_VERSION_ONLY.slice(1);
  },

  // Strip the version out of the path
  // When static assets reach S3 they will still have the version
  // in the path, which is perfect because that's where the assets
  // will be on the S3 bucket.
  async rewrites() {
    return {
      beforeFiles: [
        {
          /** Static Assets and getServerSideProps (_next/data/) */
          source: `${BASE_PREFIX_APP_WITH_VERSION}/_next/static/:path*`,
          destination: `/_next/static/:path*`,
        },
        {
          // Favicon
          // Only used for local development
          source: `${BASE_PREFIX_APP_WITH_VERSION}/favicon.ico`,
          destination: `/favicon.ico`,
        },
        {
          // Images
          // Only used for local development
          // On deployed environments, the images are served from S3
          // and image requests will never reach this rewrite
          source: `${BASE_PREFIX_APP_WITH_VERSION}/images/:query*`,
          destination: `/images/:query*`,
        },
      ],
      afterFiles: [
        {
          /** Image optimizer (not tested yet) */
          source: `${BASE_VERSION_ONLY}/_next/image/:query*`,
          destination: `/_next/image/:query*`,
        },
        /** Api Calls */
        {
          source: `${BASE_VERSION_ONLY}/api/:path*`,
          destination: `/api/:path*`,
        },
      ],
    };
  },

  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: isProd ? BASE_PREFIX_APP_WITH_VERSION : BASE_PREFIX_APP_WITH_VERSION,
  },

  typescript: {
    tsconfigPath: './tsconfig.json',
  },
};
