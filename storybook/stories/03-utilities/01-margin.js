import * as React from 'react';
import {withInfo} from '@storybook/addon-info';
import {storiesOf} from '@storybook/react';
import withPropsCombinations from 'react-storybook-addon-props-combinations';
import {ShowMargin} from 'react-show-styles';

storiesOf('Utilities/Margin', module).add(
  'utility classes',
  withPropsCombinations(
    props => <div {...props} />,
    {
      className: ['largest', 'larger', 'large', '', 'small', 'smaller', 'smallest', 'none'].map(
        m => (m ? `u-margin--${m}` : `u-margin`),
      ),
    },
    {
      CombinationRenderer: ({Component, props}) => (
        <div>
          <ShowMargin>
            <Component {...props}>
              <div style={{backgroundColor: 'white', textAlign: 'center'}}>.{props.className}</div>
            </Component>
          </ShowMargin>
          <br />
        </div>
      ),
    },
  ),
);
