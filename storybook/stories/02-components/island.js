import * as React from 'react';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {storiesOf} from '@storybook/react';
import withPropsCombinations from 'react-storybook-addon-props-combinations';
import {ShowPadding} from 'react-show-styles';

import {Island} from '../../../src/components/island';

storiesOf('Components/Island', module)
  .add(
    'usage',
    withInfo({inline: true})(() => {
      return (
        <ShowPadding
          render={({style}) => (
            <Island style={style}>
              <div style={{backgroundColor: 'white'}}>
                Sit eveniet atque ipsa culpa quam. Suscipit unde veniam facilis voluptas nobis,
                quam. Cum quas consequuntur nemo saepe accusamus, rem aliquam quam! Minima maxime
                rerum numquam architecto nobis aliquid obcaecati
              </div>
            </Island>
          )}
        />
      );
    }),
  )
  .add(
    'modifiers',
    withPropsCombinations(
      Island,
      {modifiers: ['larger', 'large', '', 'small', 'smaller'].map(m => [m])},
      {
        CombinationRenderer: ({Component, props}) => (
          <div>
            <ShowPadding
              render={({style}) => (
                <Component {...props} style={style}>
                  <div style={{backgroundColor: 'white', textAlign: 'center'}}>
                    .island{props.modifiers[0] ? `--${props.modifiers[0]}` : ''}
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
