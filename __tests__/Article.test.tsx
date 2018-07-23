import * as React from 'react';
import {cleanup, fireEvent, render} from 'react-testing-library';

import Article from '../src/templates/Article';

describe('Article', () => {
  test('-> dynamically loads rendered scripts', () => {
    const data = {
      site: {
        siteMetadata: {
          title: 'hey',
        },
      },
      contentfulArticle: {
        body: {
          childMarkdownRemark: {
            html: `<script src="./foo.js"></script> `,
          },
        },
      },
    };
    const {container, getByTestId} = render(<Article data={data} />);
    const headScripts = window.document.head.querySelector('script');
    const scripts = headScripts ? [].slice.call(headScripts, 0) : 0;

    expect(scripts.length).toEqual(1);
  });
});
