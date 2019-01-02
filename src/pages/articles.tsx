import * as React from 'react';
import {graphql, Link} from 'gatsby';

import {Wrap} from '../components/wrap';
import {Layout} from '../components/layout';

interface ArticlesProps {
  data: any;
}

class ArticleList extends React.Component<ArticlesProps> {
  public render() {
    const {data} = this.props;
    const articles = data.allContentfulArticle.edges.map(({node}: any) => node);

    return (
      <Layout>
        <Wrap>
          <h1>Article list</h1>

          {articles.map((article: any) => (
            <div key={article.id}>
              <Link to={`/articles/${article.slug}`}>{article.title}</Link>
            </div>
          ))}

          <Link to="/">Go back to the homepage</Link>
        </Wrap>
      </Layout>
    );
  }
}

export default ArticleList;

export const pageQuery = graphql`
  query {
    allContentfulArticle {
      edges {
        node {
          id
          slug
          title
        }
      }
    }
  }
`;
