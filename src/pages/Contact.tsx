import * as React from 'react';
import {Link} from 'gatsby';

import {Layout} from '../components/layout';

class ContactPage extends React.Component<{}, {}> {
  public render() {
    return (
      <Layout>
        <h1>Contact me</h1>

        <Link to="/">Go back to the homepage</Link>
      </Layout>
    );
  }
}

export default ContactPage;
