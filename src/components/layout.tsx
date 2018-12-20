import * as React from 'react';
import {Link} from 'gatsby';
import Helmet from 'react-helmet';

import '../assets/scss/style.scss';

const Header = () => (
  <div>
    <Link to="/">Gatsby</Link>
    <Link to="/about">About</Link>
    <Link to="/articles">Articles</Link>
    <Link to="/contact">Contact</Link>
    <Link to="/404">404</Link>
  </div>
);

interface LayoutProps extends React.Props<any> {
  children: any;
}

class Layout extends React.PureComponent<LayoutProps> {
  public render() {
    const {children} = this.props;

    return (
      <div>
        <Helmet
          title="Gatsby Default Starter"
          meta={[
            {name: 'description', content: 'Sample'},
            {name: 'keywords', content: 'sample, something'},
          ]}
        />

        <Header />

        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export {Layout};
