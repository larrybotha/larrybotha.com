import * as React from 'react';
import {graphql, Link} from 'gatsby';

import {Layout} from '../components/layout';

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {title: string};
    };
  };
}

class IndexPage extends React.Component<IndexPageProps, {}> {
  constructor(props: IndexPageProps, context: any) {
    super(props, context);
  }

  public render() {
    return (
      <Layout>
        <h1>Hi people</h1>

        <p>
          Welcome to your new <strong>{this.props.data.site.siteMetadata.title}</strong> site.
        </p>

        <p>Now go build something great.</p>

        <Link to="/page-2/">Go to page 2</Link>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default IndexPage;
