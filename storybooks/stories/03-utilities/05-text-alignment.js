import * as React from 'react';
import {withInfo} from '@storybook/addon-info';
import {storiesOf} from '@storybook/react';
import withPropsCombinations from 'react-storybook-addon-props-combinations';

storiesOf('Utilities/Text Alignment', module).add(
  'utility classes',
  withPropsCombinations(
    props => <div {...props} />,
    {
      className: ['center'].map(m => (m ? `u-text--${m}` : '')),
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
