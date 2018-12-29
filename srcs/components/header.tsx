import * as React from 'react';
import {Link} from 'gatsby';

class Header extends React.Component {
  public render() {
    return (
      <div>
        <Link to="/">Gatsby</Link>
        <Link to="/about">About</Link>
        <Link to="/articles">Articles</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/404">404</Link>
      </div>
    );
  }
}

export {Header};
