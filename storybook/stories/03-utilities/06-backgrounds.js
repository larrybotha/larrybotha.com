import * as React from 'react';
import {withInfo} from '@storybook/addon-info';
import {storiesOf} from '@storybook/react';
import withPropsCombinations from 'react-storybook-addon-props-combinations';

storiesOf('Utilities/Backgrounds', module).add(
  'utility classes',
  withPropsCombinations(
    props => <div {...props} />,
    {
      className: ['brand'].map(m => (m ? `u-bgc--${m}` : '')),
    },
    {
      CombinationRenderer: ({Component, props}) => (
        <div>
          <Component {...props} style={{height: '100px'}} />
          <p>.{props.className}</p>
        </div>
      ),
    },
  ),
);
