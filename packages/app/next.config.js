// eslint-disable-next-line @typescript-eslint/no-var-requires
// const path = require('path');
// next-compose-plugins
// const withPlugins = require('next-compose-plugins');
// next-images
// const withImages = require('next-images')

const BASE_PREFIX_APP = '/prefix/nextjs-demo';
const BASE_VERSION_ONLY = '/0.0.0'
const BASE_PREFIX_APP_WITH_VERSION = `${BASE_PREFIX_APP}${BASE_VERSION_ONLY}`;

// eslint-disable-next-line no-undef
module.exports = {
  // TODO switch to https://nextjs.org/docs/advanced-features/output-file-tracing
  // target: 'serverless',
  // output: 'standalone',

  // We want the app under the app name like /nextjs-demo
  basePath: BASE_PREFIX_APP,

  // We want the static assets, api calls, and _next/data calls
  // to have /nextjs-demo/0.0.0/ as the prefix so they route cleanly
  // to an isolated folder on the S3 bucket and to a specific
  // lambda URL without having to do any path manipulation
  assetPrefix: BASE_PREFIX_APP_WITH_VERSION,

  // Get the _next/data calls rebased with the version
  // This requires custom Next.js routing in the Origin Request
  // Lambda function
  async generateBuildId() {
    return BASE_VERSION_ONLY.slice(1);
  },

  async redirects() {
    return [
      // assetPrefix breaks webpack-hmr, so we fix it here.
      // See: https://github.com/vercel/next.js/issues/18080
      // redirects is used because rewrites does not work for webpack-hmr
      {
        source: '/:any*/_next/webpack-hmr:path*',
        destination: '/_next/webpack-hmr:path*',
        permanent: false,
      },
    ];
  },

  // Strip the version out of the path
  // When static assets reach S3 they will still have the version
  // in the path, which is perfect because that's where the assets
  // will be on the S3 bucket.
  async rewrites() {
    return [
      {
        /** Static Assets and getServerSideProps (_next/data/) */
        source: `${BASE_VERSION_ONLY}/_next/:path*`,
        destination: `/_next/:path*`
      },
      {
        /** Image optimizer (not tested yet) */
        source: `${BASE_VERSION_ONLY}/_next/image/:query*`,
        destination: `/_next/image/:query*`
      },
      {
        // Images
        // Only used for local development
        // On deployed environments, the images are served from S3
        // and image requests will never reach this rewrite
        source: `${BASE_VERSION_ONLY}/images/:query*`,
        destination: `/images/:query*`
      },
      {
        // Favicon
        // Only used for local development
        source: `${BASE_VERSION_ONLY}/favicon.ico`,
        destination: `/favicon.ico`
      },
      /** Api Calls */
      {
        source: `${BASE_VERSION_ONLY}/api/:path*`,
        destination: `/api/:path*`
      }
    ]
  },

  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: BASE_PREFIX_APP_WITH_VERSION,
  },
};
