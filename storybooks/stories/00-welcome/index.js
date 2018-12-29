import * as React from 'react';

import {storiesOf} from '@storybook/react';
import {withDocs} from 'storybook-readme';

import README from './README.md';
import colorStory from './colors';

storiesOf('Welcome', module)
  .addDecorator(withDocs([README]))
  .add('index', colorStory);
