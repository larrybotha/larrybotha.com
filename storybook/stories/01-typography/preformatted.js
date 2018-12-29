import * as React from 'react';

import {storiesOf} from '@storybook/react';

storiesOf('Typography/Preformatted', module).add('usage', () => (
  <div>
    <h1>Preformatted</h1>

    <h3>Pre</h3>

    <pre>
      a pre block 2
      {'\n'}
      {'\n'}
      new lines
    </pre>

    <h3>Code</h3>
    <code>a codeblock</code>
  </div>
));
