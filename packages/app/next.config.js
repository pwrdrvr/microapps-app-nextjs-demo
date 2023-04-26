// eslint-disable-next-line @typescript-eslint/no-var-requires
const i18NextConfig = require('./next-i18next.config');
const { i18n } = i18NextConfig;

const isProd = process.env.NODE_ENV === 'production';

const BASE_PREFIX_APP = '/nextjs-demo';
const BASE_VERSION_ONLY = '/0.0.0';
const BASE_PREFIX_APP_WITH_VERSION = `${BASE_PREFIX_APP}${BASE_VERSION_ONLY}`;

const USE_BASE_PATH = process.env.USE_BASE_PATH === 'true';

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

  assetPrefix: BASE_PREFIX_APP_WITH_VERSION,

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

  // If testing with basePath, the app will be at:
  // - English: http://localhost:3000/nextjs-demo/nextjs-demo
  // - Swedish: http://localhost:3000/nextjs-demo/sv/nextjs-demo
  // Without basePath, the app will be at:
  // - English: http://localhost:3000/nextjs-demo
  // - Swedish: http://localhost:3000/sv/nextjs-demo
  ...(USE_BASE_PATH ? { basePath: BASE_PREFIX_APP } : {}),

  // Strip the version out of the path
  // When static assets reach S3 they will still have the version
  // in the path, which is perfect because that's where the assets
  // will be on the S3 bucket.
  async rewrites() {
    // Rewrites needed in both Prod and Dev
    const afterFilesAlways = [
      // Api Calls
      {
        source: `${BASE_VERSION_ONLY}/api/:path*`,
        destination: `/api/:path*`,
      },
    ];

    if (isProd) {
      return {
        afterFiles: [...afterFilesAlways],
      };
    }

    // Local Development Rewrites
    return {
      beforeFiles: [
        {
          // Static Assets
          // Next.js evaluates the `source` path after removing `basePath`
          // A request for `/release/0.0.0/_next/static/...` will be rewritten
          // to `/0.0.0/_next/static/...` before the `source` is looked up for a match.
          // This is why we need to use `BASE_VERSION_ONLY` here instead of `BASE_PREFIX_APP_WITH_VERSION`
          // The destination similarly does not need to repeat the `basePath` because
          // Next.js is already adding it to any resulting URL.
          //
          // When `basePath` is not set this must have BASE_PREFIX_APP_WITH_VERSION
          source: `${
            USE_BASE_PATH ? BASE_VERSION_ONLY : BASE_PREFIX_APP_WITH_VERSION
          }/_next/static/:path*`,
          destination: `/_next/static/:path*`,
        },
        {
          // Other statics including favicon
          source: `${
            USE_BASE_PATH ? BASE_VERSION_ONLY : BASE_PREFIX_APP_WITH_VERSION
          }/static/:path*`,
          destination: `/static/:path*`,
        },
        {
          // Images
          // Only used for local development
          // On deployed environments, the images are served from S3
          // and image requests will never reach this rewrite
          source: `${
            USE_BASE_PATH ? BASE_VERSION_ONLY : BASE_PREFIX_APP_WITH_VERSION
          }/images/:query*`,
          destination: `/images/:query*`,
        },
      ],
      afterFiles: [...afterFilesAlways],
    };
  },

  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: BASE_PREFIX_APP_WITH_VERSION,
  },

  typescript: {
    tsconfigPath: './tsconfig.json',
  },
};
