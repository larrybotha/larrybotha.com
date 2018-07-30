import * as React from 'react';
import Link from 'gatsby-link';

import Wrap from '../components/Wrap';

class AboutPage extends React.Component<{}, {}> {
  public render() {
    return (
      <Wrap>
        <h1>About me</h1>

        <Link to="/">Go back to the homepage</Link>
      </Wrap>
    );
  }
}

export default AboutPage;
