import * as React from 'react';

import {storiesOf} from '@storybook/react';

storiesOf('Typography/Links', module).add('usage', () => {
  return (
    <div>
      <h1>Links</h1>

      <a href="#" onClick={() => {}}>
        default link
      </a>
    </div>
  );
});
