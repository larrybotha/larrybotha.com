import * as React from 'react';

import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {storiesOf} from '@storybook/react';
import withPropsCombinations from 'react-storybook-addon-props-combinations';
import {ShowMargin, ShowPadding} from 'react-show-styles';

import Wrap from '../../../src/components/Wrap';

storiesOf('Components/Wrap', module)
  .add(
    'usage',
    withInfo({inline: true})(() => (
      <Wrap modifiers={['small']}>
        <div style={{backgroundColor: '#f1f1f1'}}>
          Sit eveniet atque ipsa culpa quam. Suscipit unde veniam facilis voluptas nobis, quam. Cum
          quas consequuntur nemo saepe accusamus, rem aliquam quam! Minima maxime rerum numquam
          architecto nobis aliquid obcaecati
        </div>
      </Wrap>
    )),
  )

  .add(
    'modifiers',
    withPropsCombinations(
      Wrap,
      {modifiers: ['', 'small'].map(m => [m])},
      {
        CombinationRenderer: ({Component, props}) => (
          <div>
            <ShowMargin>
              <ShowPadding
                render={({style}) => (
                  <Component {...props} style={style}>
                    <div style={{backgroundColor: '#f1f1f1'}}>
                      .wrap{props.modifiers[0] ? `--${props.modifiers[0]}` : ''}
                    </div>
                  </Component>
                )}
              />
            </ShowMargin>
            <br />
          </div>
        ),
      },
    ),
  );
