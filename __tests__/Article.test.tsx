import * as React from 'react';
import {cleanup, fireEvent, render} from 'react-testing-library';

import Article from '../src/templates/Article';

describe('Article', () => {
  test('-> dynamically loads rendered scripts', () => {
    debugger;
    const spy = jest.fn();
    const data = {
      site: {
        siteMetadata: {
          title: 'hey',
        },
      },
      contentfulArticle: {
        body: {
          childMarkdownRemark: {
            html: `<script>spy()</script> `,
          },
        },
      },
    };
    // const {container, getByTestId} = render(<Article data={data} />);
    const {container, getByTestId} = render(<div />);
    debugger;

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
