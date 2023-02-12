// eslint-disable-next-line @typescript-eslint/no-var-requires
// const path = require('path');
// next-compose-plugins
// const withPlugins = require('next-compose-plugins');
// next-images
// const withImages = require('next-images')
const isProd = process.env.NODE_ENV === 'production';

const BASE_PREFIX_APP = '/nextjs-demo';
const BASE_VERSION_ONLY = '/0.0.0';
const BASE_PREFIX_APP_WITH_VERSION = `${BASE_PREFIX_APP}${BASE_VERSION_ONLY}`;

const _crypto = require('crypto');

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
  assetPrefix: isProd ? BASE_PREFIX_APP_WITH_VERSION : BASE_PREFIX_APP,

  transpilePackages: [
    '@aws-crypto',
    '@aws-sdk',
    '@babel',
    '@bcoe',
    '@cnakazawa',
    '@cspotcode',
    '@eslint',
    '@httptoolkit',
    '@humanwhocodes',
    '@istanbuljs',
    '@jest',
    '@jridgewell',
    '@jsii',
    '@next',
    '@nodelib',
    '@oclif',
    '@pwrdrvr',
    '@rollup',
    '@sinonjs',
    '@tootallnate',
    '@tsconfig',
    '@types',
    '@typescript-eslint',
    '@vendia',
    '@xmldom',
    'accepts',
    'async-hook-jl',
    'atomic-batcher',
    'aws-xray-sdk-core',
    'bail',
    'body-parser',
    'buffer-from',
    'call-bind',
    'caniuse-lite',
    'ccount',
    'character-entities',
    'character-entities-html4',
    'character-entities-legacy',
    'character-reference-invalid',
    'client-only',
    'cls-hooked',
    'comma-separated-tokens',
    'content-disposition',
    'content-type',
    'cookie-signature',
    'date-fns',
    'debug',
    'ee-first',
    'emitter-listener',
    'encodeurl',
    'escape-html',
    'esprima',
    'etag',
    'express',
    'extend',
    'extend-shallow',
    'forwarded',
    'fresh',
    'function-bind',
    'get-intrinsic',
    'gray-matter',
    'has',
    'has-symbols',
    'hast-util-is-element',
    'hast-util-sanitize',
    'hast-util-to-html',
    'hast-util-whitespace',
    'html-void-elements',
    'inherits',
    'ipaddr.js',
    'is-alphabetical',
    'is-alphanumerical',
    'is-decimal',
    'is-extendable',
    'is-hexadecimal',
    'is-plain-obj',
    'js-tokens',
    'js-yaml',
    'kind-of',
    'longest-streak',
    'loose-envify',
    'mdast-util-definitions',
    'mdast-util-from-markdown',
    'mdast-util-to-hast',
    'mdast-util-to-markdown',
    'mdast-util-to-string',
    'mdurl',
    'media-typer',
    'merge-descriptors',
    'methods',
    'micromark',
    'mime',
    'mime-db',
    'mime-types',
    'ms',
    'nanoid',
    'negotiator',
    // 'next',
    'object-inspect',
    'parse-entities',
    'parseurl',
    'picocolors',
    'postcss',
    'property-information',
    'proxy-addr',
    'range-parser',
    'react',
    'react-dom',
    'remark',
    'remark-html',
    'remark-parse',
    'remark-stringify',
    'repeat-string',
    'safe-buffer',
    'safer-buffer',
    'scheduler',
    'section-matter',
    'serve-static',
    'shimmer',
    'side-channel',
    'source-map',
    'source-map-js',
    'source-map-support',
    'space-separated-tokens',
    'sprintf-js',
    'stack-chain',
    'stringify-entities',
    'strip-bom-string',
    'trough',
    'tslib',
    'type-is',
    'unified',
    'unist-builder',
    'unist-util-generated',
    'unist-util-is',
    'unist-util-position',
    'unist-util-stringify-position',
    'unist-util-visit',
    'unist-util-visit-parents',
    'unpipe',
    'utils-merge',
    'vary',
    'vfile',
    'vfile-message',
    'xtend',
    'zwitch',
  ],

  webpack_skip: (config, options) => {
    const { dev, dir, isServer, nextRuntime } = options;
    const isNodeServer = isServer && nextRuntime === 'nodejs';

    // config.resolve.alias['@'] = path.join(__dirname, 'src');
    if (config.name === 'server') {
      console.log('server');

      // Get rid of the externals config
      // config.externals.pop();

      config.optimization.splitChunks = (() => {
        if (dev) {
          return false;
        }
        if (isNodeServer) {
          // Original config
          // return {
          //     filename: "[name].js",
          //     chunks: "all",
          //     minSize: 1000
          // };

          // Packages which will be split into the 'framework' chunk.
          // Only top-level packages are included, e.g. nested copies like
          // 'node_modules/meow/node_modules/object-assign' are not included.
          const topLevelFrameworkPaths = [];
          const visitedFrameworkPackages = new Set();
          // Adds package-paths of dependencies recursively
          const addPackagePath = (packageName, relativeToPath) => {
            try {
              if (visitedFrameworkPackages.has(packageName)) {
                return;
              }
              visitedFrameworkPackages.add(packageName);
              const packageJsonPath = require.resolve(`${packageName}/package.json`, {
                paths: [relativeToPath],
              });
              // Include a trailing slash so that a `.startsWith(packagePath)` check avoids false positives
              // when one package name starts with the full name of a different package.
              // For example:
              //   "node_modules/react-slider".startsWith("node_modules/react")  // true
              //   "node_modules/react-slider".startsWith("node_modules/react/") // false
              const directory = _path.default.join(packageJsonPath, '../');
              // Returning from the function in case the directory has already been added and traversed
              if (topLevelFrameworkPaths.includes(directory)) return;
              topLevelFrameworkPaths.push(directory);
              const dependencies = require(packageJsonPath).dependencies || {};
              for (const name of Object.keys(dependencies)) {
                addPackagePath(name, directory);
              }
            } catch (_) {
              // don't error on failing to resolve framework packages
            }
          };
          for (const packageName1 of ['react', 'react-dom']) {
            // TODO: this misses the framework directories because they are up at
            // the root of the monorepo.
            addPackagePath(packageName1, dir);
          }

          return {
            chunks: (chunk) => !/^(polyfills|main|pages\/_app)$/.test(chunk.name),
            cacheGroups: {
              framework: {
                chunks: 'all',
                name: 'framework',
                test(module) {
                  const resource =
                    module.nameForCondition == null ? void 0 : module.nameForCondition();
                  return resource
                    ? topLevelFrameworkPaths.some((pkgPath) => resource.startsWith(pkgPath))
                    : false;
                },
                priority: 40,
                // Don't let webpack eliminate this chunk (prevents this chunk from
                // becoming a part of the commons chunk)
                enforce: true,
              },
              lib: {
                chunks: 'all',
                test(module) {
                  /* module.size() > 160000 && */
                  console.log(module.nameForCondition() || module.request);
                  if (/node_modules\/next/.test(module.nameForCondition() || '')) {
                    return false;
                  }
                  const shouldModule = /node_modules[/\\]/.test(module.nameForCondition() || '');
                  return shouldModule;
                },
                name(module) {
                  const hash = _crypto.default.createHash('sha1');
                  if (isModuleCSS(module)) {
                    module.updateHash(hash);
                  } else {
                    if (!module.libIdent) {
                      throw new Error(
                        `Encountered unknown module type: ${module.type}. Please open an issue.`,
                      );
                    }
                    hash.update(
                      module.libIdent({
                        context: dir,
                      }),
                    );
                  }
                  return hash.digest('hex').substring(0, 8);
                },
                priority: 30,
                minChunks: 1,
                reuseExistingChunk: true,
                enforce: true,
              },
              // pages: {
              //   filename: "[name].js",
              //   chunks: "all",
              //   minSize: 1000
              // }
            },
            // maxInitialRequests: 25,
            // minSize: 20000
          };
        }
        if (isEdgeServer) {
          return {
            filename: 'edge-chunks/[name].js',
            minChunks: 2,
          };
        }
        return {
          // Keep main and _app chunks unsplitted in webpack 5
          // as we don't need a separate vendor chunk from that
          // and all other chunk depend on them so there is no
          // duplication that need to be pulled out.
          chunks: (chunk) => !/^(polyfills|main|pages\/_app)$/.test(chunk.name),
          cacheGroups: {
            framework: {
              chunks: 'all',
              name: 'framework',
              test(module) {
                const resource =
                  module.nameForCondition == null ? void 0 : module.nameForCondition();
                return resource
                  ? topLevelFrameworkPaths.some((pkgPath) => resource.startsWith(pkgPath))
                  : false;
              },
              priority: 40,
              // Don't let webpack eliminate this chunk (prevents this chunk from
              // becoming a part of the commons chunk)
              enforce: true,
            },
            lib: {
              test(module) {
                return (
                  module.size() > 160000 &&
                  /node_modules[/\\]/.test(module.nameForCondition() || '')
                );
              },
              name(module) {
                const hash = _crypto.default.createHash('sha1');
                if (isModuleCSS(module)) {
                  module.updateHash(hash);
                } else {
                  if (!module.libIdent) {
                    throw new Error(
                      `Encountered unknown module type: ${module.type}. Please open an issue.`,
                    );
                  }
                  hash.update(
                    module.libIdent({
                      context: dir,
                    }),
                  );
                }
                return hash.digest('hex').substring(0, 8);
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
          },
          maxInitialRequests: 25,
          minSize: 20000,
        };
      })();
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
    return [
      {
        /** Static Assets and getServerSideProps (_next/data/) */
        source: `${BASE_VERSION_ONLY}/_next/:path*`,
        destination: `/_next/:path*`,
      },
      {
        /** Image optimizer (not tested yet) */
        source: `${BASE_VERSION_ONLY}/_next/image/:query*`,
        destination: `/_next/image/:query*`,
      },
      {
        // Images
        // Only used for local development
        // On deployed environments, the images are served from S3
        // and image requests will never reach this rewrite
        source: `${BASE_VERSION_ONLY}/images/:query*`,
        destination: `/images/:query*`,
      },
      {
        // Favicon
        // Only used for local development
        source: `${BASE_VERSION_ONLY}/favicon.ico`,
        destination: `/favicon.ico`,
      },
      /** Api Calls */
      {
        source: `${BASE_VERSION_ONLY}/api/:path*`,
        destination: `/api/:path*`,
      },
    ];
  },

  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: BASE_PREFIX_APP_WITH_VERSION,
  },
};
