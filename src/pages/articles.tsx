import * as React from 'react';
import {Link} from 'gatsby';

import {Wrap} from '../components/wrap';
import {Layout} from '../components/layout';

class ArticleList extends React.Component {
  public render() {
    return (
      <Layout>
        <Wrap>
          <h1>Article list</h1>

          <Link to="/">Go back to the homepage</Link>
        </Wrap>
      </Layout>
    );
  }
}

export default ArticleList;
