import path from 'path';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import config from 'sapper/config/rollup.js';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import svgImport from 'rollup-plugin-svg-import';
import {terser} from 'rollup-plugin-terser';

import pkg from './package.json';

import svelteConfig from './svelte.config';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
  (warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
  (warning.code === 'CIRCULAR_DEPENDENCY' &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning);
const dedupe = (importee) =>
  importee === 'svelte' || importee.startsWith('svelte/');

const commonPlugins = [
  alias({
    entries: {
      src: path.join(__dirname, 'src'),
    },
  }),
  commonjs(),
  svgImport({stringify: true}),
];

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),

        'process.env.CONTENTFUL_SPACE_ID': JSON.stringify(
          process.env.CONTENTFUL_SPACE_ID,
        ),
        'process.env.CONTENTFUL_ACCESS_TOKEN': JSON.stringify(
          process.env.CONTENTFUL_ACCESS_TOKEN,
        ),
        'process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN': JSON.stringify(
          process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
        ),

        preventAssignment: true,
      }),

      svelte({
        compilerOptions: {hydratable: true},
        emitCss: true,
        ...svelteConfig,
      }),

      resolve({browser: true, dedupe}),

      ...commonPlugins,

      legacy &&
        babel({
          extensions: ['.js', '.mjs', '.html', '.svelte'],
          runtimeHelpers: true,
          exclude: ['node_modules/@babel/**'],
          presets: [
            [
              '@babel/preset-env',
              {
                targets: '> 0.25%, not dead',
              },
            ],
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            [
              '@babel/plugin-transform-runtime',
              {
                useESModules: true,
              },
            ],
          ],
        }),

      !dev && terser({module: true}),
    ],

    onwarn,
    preserveEntrySignatures: false,
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(mode),

        preventAssignment: true,
      }),

      svelte({compilerOptions: {generate: 'ssr'}, ...svelteConfig}),

      resolve({dedupe}),

      ...commonPlugins,
    ],
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules ||
        Object.keys(process.binding('natives')),
    ),

    onwarn,
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),

        preventAssignment: true,
      }),
      commonjs(),
      !dev && terser(),
    ],

    onwarn,
  },
};
