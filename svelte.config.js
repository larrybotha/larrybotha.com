import autoprefixer from 'autoprefixer';
import preprocess from 'svelte-preprocess';
import {mdsvex} from 'mdsvex';
import markdownItPrism from 'markdown-it-prism';
import autoLinkHeadings from 'rehype-autolink-headings';
import slug from 'rehype-slug';
import svelteImage from 'svelte-image';
import visit from 'unist-util-visit';
import postcssCustomProperties from 'postcss-custom-properties';

// this is magically inserted into the Prism instance
import 'prism-svelte';
import path from 'path';

const production = !process.env.ROLLUP_WATCH;
const mode = process.env.NODE_ENV;
const dev = mode === 'development';

function wrapCodeBlocks() {
  return ast => {
    visit(ast, 'raw', (node, _, parent) => {
      if (!parent || node.value.indexOf('<pre class="language-') === -1) {
        return;
      }

      node.value = `<div class="code-wrap">${node.value}</div>`;
    });
  };
}

const svx = mdsvex({
  layout: {
    '*': path.join(__dirname, 'src/components/layout/article.svelte'),
  },

  rehypePlugins: [
    slug,
    [
      autoLinkHeadings,
      {
        properties: {},
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
    wrapCodeBlocks,
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
        plugins: [autoprefixer, postcssCustomProperties],
        minimize: production,
      },
    }),
    svx,
    svelteImage(),
  ],
};

export default config;
