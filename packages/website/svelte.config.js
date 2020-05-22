import autoprefixer from 'autoprefixer';
import hljs from 'highlight.js';
import preprocess from 'svelte-preprocess';
import {mdsvex} from 'mdsvex';

const production = !process.env.ROLLUP_WATCH;
const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const svx = mdsvex({
  // layout: './src/routes/_layout.svelte',
  extension: '.svx',
  markdownOptions: {
    typographer: true,
    linkify: true,
    highlight: function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (__) {}
      }

      return '';
    },
  },
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
