import React from 'react';

import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {storiesOf} from '@storybook/react';

storiesOf('Button', module)
  .add(
    'with text',
    withInfo({inline: true})(() => <button onClick={action('clicked')}>Hello button</button>),
  )
  .add(
    'with some emoji',
    withInfo({inline: true})(() => (
      <button onClick={action('clicked')}>
        <span role="img" aria-label="so cool">
          😀 😎 👍 💯
        </span>
      </button>
    )),
  );
