import * as React from 'react';
import {withInfo} from '@storybook/addon-info';
import {storiesOf} from '@storybook/react';
import withPropsCombinations from 'react-storybook-addon-props-combinations';
import {ShowPadding} from 'react-show-styles';

storiesOf('Utilities/Padding', module).add(
  'utility classes',
  withPropsCombinations(
    props => <div {...props} />,
    {
      className: ['largest', 'larger', 'large', '', 'small', 'smaller', 'smallest', 'none'].map(
        m => (m ? `u-padding--${m}` : `u-padding`),
      ),
    },
    {
      CombinationRenderer: ({Component, props}) => (
        <div>
          <ShowPadding
            render={({style}) => (
              <Component {...props} style={style}>
                <div style={{backgroundColor: 'white', textAlign: 'center'}}>
                  .{props.className}
                </div>
              </Component>
            )}
          />
          <br />
        </div>
      ),
    },
  ),
);
