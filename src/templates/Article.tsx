import * as React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import loadScript from 'load-script';

interface ArticleProps {
  data: any;
}

class ArticleTemplate extends React.Component<ArticleProps, {}> {
  private contentRef: HTMLDivElement;

  public constructor(props: ArticleProps) {
    super(props);
    this.contentRef = null;
  }

  public componentDidMount() {
    const scripts = this.contentRef.querySelectorAll('script');
    [].slice.call(scripts, 0).map(async (s: any) => {
      const res = await loadScript(s.getAttribute('src'), (err: any, script: any) => {
        if (err) return console.log(err);

        console.log(script);
      });
      debugger;
    });
  }

  private setContentRef = (el: HTMLDivElement) => {
    this.contentRef = el;
  };

  public render() {
    const {data} = this.props;
    const post = data.contentfulArticle;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <div>
        <Helmet title={`${post.title} | ${siteTitle}`} />

        <div>
          <h1>{post.title}</h1>

          <p>{post.pubDate}</p>

          <div
            ref={this.setContentRef}
            dangerouslySetInnerHTML={{
              __html: post.body.childMarkdownRemark.html,
            }}
          />
        </div>
      </div>
    );
  }
}

export default ArticleTemplate;

export const pageQuery = graphql`
  query ArticleBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }

    contentfulArticle(slug: {eq: $slug}) {
      title
      pubDate(formatString: "MMMM Do, YYYY")
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
