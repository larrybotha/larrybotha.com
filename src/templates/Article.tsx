import * as React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

interface ArticleProps {
  data: any;
}

class ArticleTemplate extends React.Component<ArticleProps, {}> {
  render() {
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
            dangerouslySetInnerHTML={{
              __html: post.body.body,
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
        body
      }
    }
  }
`;
