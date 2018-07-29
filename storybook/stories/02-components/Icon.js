import * as React from 'react';

import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {storiesOf} from '@storybook/react';
import withPropsCombinations from 'react-storybook-addon-props-combinations';

import Icon from '../../../src/components/Icon';

const req = require.context('../../../src/assets/img/svg-sprite', false, /^\.\/.*\.svg/);
const iconNames = req
  .keys()
  .map(filename => filename.match(/[\w-]+[^.]/))
  .map(xs => xs.find(Boolean));

storiesOf('Components/Icon', module)
  .add('usage', withInfo({inline: true})(() => <Icon id="burger" />))

  .add(
    'ids',
    withPropsCombinations(
      Icon,
      {id: iconNames},
      {
        CombinationRenderer: ({Component, props}) => (
          <div>
            <Component {...props} /> - {props.id}
          </div>
        ),
      },
    ),
  );
