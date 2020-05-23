import autoprefixer from 'autoprefixer';
import preprocess from 'svelte-preprocess';
import {mdsvex} from 'mdsvex';
import markdownItPrism from 'markdown-it-prism';

// this is magically inserted into the Prism instance
import 'prism-svelte';

const production = !process.env.ROLLUP_WATCH;
const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const svx = mdsvex({
  // layout: './src/routes/_layout.svelte',
  extension: '.svx',
  parser: md => md.use(markdownItPrism),
});

const config = {
  extensions: ['.svelte', '.md', '.svx'],
  dev,

  preprocess: [
    preprocess({
      scss: {
        includePaths: ['src', 'node_modules/normalize.css'],
        renderSync: !production,
      },

      postcss: {
        plugins: [autoprefixer],
        minimize: production,
      },
    }),
    svx,
  ],
};

export default config;
