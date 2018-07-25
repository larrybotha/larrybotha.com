import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {cleanup, fireEvent, render} from 'react-testing-library';

import Article from '../src/templates/Article';

const container = document.createElement('div');

jest.mock('gatsby-link', () => {
  return {
    default() {
      const React = require('react');
      return <div />;
    },
  };
});

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

    ReactDOM.render(<Article data={data} />, container);

    requestAnimationFrame(() => {
      expect(window.document.title).toContain(postTitle);
      expect(window.document.title).toContain(siteTitle);
      done();
    });
  });

  test('-> dynamically loads rendered scripts', done => {
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
              <div>
                <script src="./foo.js"></script>
              </div>
            `,
          },
        },
      },
    };
    const ArticleTemplate = ReactDOM.render(<Article data={data} />, container);
    const root = render(<Article data={data} />);

    requestAnimationFrame(() => {
      const {container} = root;
      const headScripts = window.document.querySelector('script');
      const scripts = headScripts ? [].slice.call(headScripts, 0) : 0;

      expect(scripts.length).toEqual(1);
      done();
    });
  });
});
