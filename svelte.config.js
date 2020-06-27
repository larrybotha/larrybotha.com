import autoprefixer from 'autoprefixer';
import preprocess from 'svelte-preprocess';
import {mdsvex} from 'mdsvex';
import markdownItPrism from 'markdown-it-prism';
import autoLinkHeadings from 'rehype-autolink-headings';
import slug from 'rehype-slug';
import svelteImage from 'svelte-image';
import visit from 'unist-util-visit';
import find from 'unist-util-find';
import postcssCustomProperties from 'postcss-custom-properties';
import rehypeParse from 'rehype-parse';
import unified from 'unified';

// this is magically inserted into the Prism instance
import 'prism-svelte';
import path from 'path';

const production = !process.env.ROLLUP_WATCH;
const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const linkIcon = `
  <i class="icon">
    <i class="icon__inner">
      <svg role="img">
        <title>link icon</title>
        <use href="#icon-link" />
      </svg>
    </i>
  </i>
`;
let linkIconAst = find(
  unified()
    .use(rehypeParse)
    .parse(linkIcon),
  {type: 'element', tagName: 'i'},
);

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
        properties: {class: 'heading-anchor'},
        content: linkIconAst,
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
