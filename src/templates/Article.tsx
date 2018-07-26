import * as React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

interface ArticleProps {
  data: any;
}

interface ArticleState {
  scripts: HTMLScriptElement[];
}

class ArticleTemplate extends React.Component<ArticleProps, ArticleState> {
  private contentRef: HTMLDivElement;

  public constructor(props: ArticleProps) {
    super(props);
    this.contentRef = null;

    this.state = {scripts: []};
  }

  public componentDidMount() {
    const scripts = this.contentRef.querySelectorAll('script');

    this.setState({scripts: [].slice.call(scripts, 0)});
  }

  private setContentRef = (el: HTMLDivElement) => {
    this.contentRef = el;
  };

  public render() {
    const {scripts} = this.state;
    const {data} = this.props;
    const post = data.contentfulArticle;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <div>
        <Helmet>
          <title>{`${post.title} | ${siteTitle}`}</title>

          {scripts.map((script: HTMLScriptElement, i: number) => (
            <script key={i} src={script.src} type="text/javascript" async defer>
              {eval(script.textContent)}
            </script>
          ))}
        </Helmet>

        <div>
          <Link to="/">home</Link>
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
