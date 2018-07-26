import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import {cleanup, render} from 'react-testing-library';

import Article from '../src/templates/Article';

jest.mock('gatsby-link', () => {
  return {
    default() {
      const React = require('react');
      return <div />;
    },
  };
});

afterEach(cleanup);

describe('Article', () => {
  test('-> renders content', () => {
    const html = `<div>foo</div>`;
    const data = {
      site: {
        siteMetadata: {
          title: 'site title',
        },
      },
      contentfulArticle: {
        body: {
          childMarkdownRemark: {
            html,
          },
        },
      },
    };
    const {container} = render(<Article data={data} />);

    expect(container.innerHTML).toContain(html);
  });

  test('-> renders title', done => {
    const siteTitle = 'site title';
    const postTitle = 'post title';
    const data = {
      site: {
        siteMetadata: {
          title: siteTitle,
        },
      },
      contentfulArticle: {
        title: postTitle,
        body: {
          childMarkdownRemark: {
            html: '',
          },
        },
      },
    };

    const root = render(<Article data={data} />);

    requestAnimationFrame(() => {
      expect(window.document.title).toContain(postTitle);
      expect(window.document.title).toContain(siteTitle);
      done();
    });
  });

  test('-> loads external scripts in content into head', done => {
    const data = {
      site: {
        siteMetadata: {
          title: 'foo',
        },
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
    const root = render(<Article data={data} />);

    requestAnimationFrame(() => {
      const scripts = window.document.head.querySelectorAll('script');

      expect(scripts.length).toEqual(1);
      done();
    });
  });

  test('-> loads inline scripts in content into head', done => {
    const data = {
      site: {
        siteMetadata: {
          title: 'foo',
        },
      },
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
    const root = render(<Article data={data} />);

    requestAnimationFrame(() => {
      const scripts = window.document.head.querySelectorAll('script');

      expect(scripts.length).toEqual(1);
      done();
    });
  });
});
