import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import * as React from 'react';
import {render, wait} from 'react-testing-library';

import Article from './article';

describe('Article', () => {
  test('-> renders content', () => {
    const content = 'foo';
    const html = `<div>${content}</div>`;
    const data = {
      site: {
        siteMetadata: {title: 'site title'},
      },
      contentfulArticle: {
        body: {
          childMarkdownRemark: {html},
        },
      },
    };
    const {container} = render(<Article data={data} />);

    expect(container).toHaveTextContent(content);
  });

  test.only('-> renders title', async () => {
    const siteTitle = 'site title';
    const postTitle = 'post title';
    const data = {
      site: {
        siteMetadata: {title: siteTitle},
      },
      contentfulArticle: {
        title: postTitle,
        body: {
          childMarkdownRemark: {html: ''},
        },
      },
    };

    const {container} = render(<Article data={data} />);

    await wait();

    expect(container).toHaveTextContent(postTitle);
    expect(window.document.title).toContain(postTitle);
    expect(window.document.title).toContain(siteTitle);
  });

  test('-> loads external scripts in content into head', async () => {
    const data = {
      site: {
        siteMetadata: {title: 'foo'},
      },
      contentfulArticle: {
        body: {
          childMarkdownRemark: {
            html: `
                <script src="./foo.js" type="text/javascript"></script>
            `,
          },
        },
      },
    };
    render(<Article data={data} />);

    await wait();

    const scripts = window.document.head.querySelectorAll('script');

    expect(scripts.length).toEqual(1);
  });

  test('-> loads inline scripts in content into head', async () => {
    const data = {
      site: {siteMetadata: {title: 'foo'}},
      contentfulArticle: {
        body: {
          childMarkdownRemark: {
            html: `
                <script type="text/javascript">{foo: 'bar'}</script>
            `,
          },
        },
      },
    };
    render(<Article data={data} />);

    await wait();

    const scripts = window.document.head.querySelectorAll('script');

    expect(scripts.length).toEqual(1);
  });
});
