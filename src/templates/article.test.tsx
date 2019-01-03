import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import * as React from 'react';
import {render, waitForElement} from 'react-testing-library';

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

  test('-> renders title', async () => {
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

    expect(container).toHaveTextContent(postTitle);

    await waitForElement(() => window.document.querySelector('title'));

    expect(window.document.title).toContain(postTitle);
    expect(window.document.title).toContain(siteTitle);
  });

  test('-> loads external scripts in content into head', async () => {
    const scriptSrc = './foo.src';
    const data = {
      site: {
        siteMetadata: {title: 'foo'},
      },
      contentfulArticle: {
        body: {
          childMarkdownRemark: {
            html: `
                <script src="${scriptSrc}" type="text/javascript"></script>
            `,
          },
        },
      },
    };
    render(<Article data={data} />);

    await waitForElement(() => window.document.querySelector('head'));

    const customScript = window.document.querySelector(`script[src="${scriptSrc}"]`);

    expect(customScript).toBeInTheDocument();
  });

  test('-> runs inline scripts in content', () => {
    const propName = 'foo';
    const propVal = 'bar';
    const data = {
      site: {siteMetadata: {title: 'foo'}},
      contentfulArticle: {
        body: {
          childMarkdownRemark: {
            html: `
                <script type="text/javascript">window["${propName}"] = "${propVal}"</script>
            `,
          },
        },
      },
    };
    render(<Article data={data} />);

    expect((window as any)[propName]).toBe(propVal);
  });
});
