import * as React from 'react';
import {withInfo} from '@storybook/addon-info';
import {storiesOf} from '@storybook/react';
import withPropsCombinations from 'react-storybook-addon-props-combinations';

storiesOf('Utilities/Font Colors', module).add(
  'utility classes',
  withPropsCombinations(
    props => <div {...props} />,
    {
      className: ['base', 'success', 'warning'].map(m => (m ? `u-fs--${m}` : '')),
    },
    {
      CombinationRenderer: ({Component, props}) => (
        <div>
          <Component {...props}>
            <span>.{props.className}</span>
          </Component>
          <br />
        </div>
      ),
    },
  ),
);
