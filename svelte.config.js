import autoprefixer from 'autoprefixer';
import preprocess from 'svelte-preprocess';
import {mdsvex} from 'mdsvex';
import markdownItPrism from 'markdown-it-prism';
import autoLinkHeadings from 'rehype-autolink-headings';
import slug from 'rehype-slug';

// this is magically inserted into the Prism instance
import 'prism-svelte';
import path from 'path';

const production = !process.env.ROLLUP_WATCH;
const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const svx = mdsvex({
  layout: {
    blog: path.join(__dirname, 'src/routes/blog/_blog-layout.svelte'),
  },

  //extension: '.svx',
  //parser: md => md.use(markdownItPrism),
  rehypePlugins: [
    slug,
    [
      autoLinkHeadings,
      {
        content: {
          type: 'element',
          tagName: 'i',
          properties: {},
          children: [
            {
              type: 'text',
              value: '🔗',
            },
          ],
        },
      },
    ],
  ],
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
