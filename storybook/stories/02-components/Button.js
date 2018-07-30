import * as React from 'react';

import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {storiesOf} from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import withPropsCombinations from 'react-storybook-addon-props-combinations';

import Button from '../../../src/components/Button';

storiesOf('Components/Button', module)
  .addDecorator(StoryRouter())
  .add(
    'usage: as button',
    withInfo({inline: true})(() => <Button onClick={action('clicked')}>button</Button>),
  )

  .add(
    'usage: as anchor',
    withInfo({inline: true})(() => (
      <Button onClick={action('clicked')} to="/">
        anchor as button
      </Button>
    )),
  )

  .add(
    'modifiers',
    withPropsCombinations(
      Button,
      {
        modifiers: ['small', 'outline', 'full', 'sharp'].map(m => [m]),
        disabled: [true, false],
      },
      {
        CombinationRenderer: ({Component, props}) => (
          <div>
            .btn--{props.modifiers[0]}
            {[undefined, '/'].map((to, i) => (
              <div>
                <Component {...props} to={to} key={i}>
                  {to ? 'a' : 'button'}
                  .btn--{props.modifiers[0]}
                  {props.disabled ? '[disabled]' : ''}
                </Component>
                <br />
                <br />
              </div>
            ))}
          </div>
        ),
      },
    ),
  );
