import * as React from 'react';
import Link from 'gatsby-link';

class AboutPage extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <h1>About me</h1>

        <Link to="/">Go back to the homepage</Link>
      </div>
    );
  }
}

export default AboutPage;
