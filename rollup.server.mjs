import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

import externals from 'rollup-plugin-node-externals';
// import typescript from 'rollup-plugin-typescript2';

// const production = !process.env.ROLLUP_WATCH
const LOCAL_EXTERNALS = [];
const NPM_EXTERNALS = ['fsevents'];

const generateConfig = (input) => ({
  input: `./packages/app/.next/standalone/server.js`,
  output: {
    file: `./packages/cdk-construct/lib/microapps-app-nextjs-demo/${input.filename}${
      input.minify ? '' : '.max'
    }.js`,
    format: 'commonjs',
    sourcemap: `./packages/cdk-construct/lib/microapps-app-nextjs-demo/${input.filename}${
      input.minify ? '' : '.max'
    }.js.map`,
  },
  plugins: [
    json(),
    commonjs(),
    externals({
      // exclude: 'some-module',
    }),
    // Export Condition Node is not a default and is necessary to get
    // uuid to select `rng.js` instead of `rng-browser.js`
    nodeResolve({ exportConditions: ['node'] }),
    // typescript({
    //   tsconfig: 'tsconfig.entry.json',
    //   sourceMap: !production,
    // }),
    input.minify
      ? terser({
          compress: true,
          mangle: true,
          output: { comments: false }, // Remove all comments, which is fine as the handler code is not distributed.
        })
      : undefined,
  ],
  external: [...NPM_EXTERNALS, ...LOCAL_EXTERNALS],
  inlineDynamicImports: true,
});

export default [{ minify: false }, { minify: true }].map(generateConfig);
