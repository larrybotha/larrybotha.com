import * as React from 'react';
import {withInfo} from '@storybook/addon-info';
import {storiesOf} from '@storybook/react';
import withPropsCombinations from 'react-storybook-addon-props-combinations';
import {ShowComputedStyle} from 'react-show-styles';

storiesOf('Utilities/Font Sizes', module).add(
  'utility classes',
  withPropsCombinations(
    props => <div {...props} />,
    {
      className: [
        'giga',
        'mega',
        'kilo',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        '',
        'milli',
        'micro',
      ].map(m => (m ? `u-fs--${m}` : '')),
    },
    {
      CombinationRenderer: ({Component, props}) => (
        <div>
          <ShowComputedStyle styleToCompute="font-size">
            <Component {...props}>
              <span>.{props.className}</span>
            </Component>
          </ShowComputedStyle>
          <br />
        </div>
      ),
    },
  ),
);
