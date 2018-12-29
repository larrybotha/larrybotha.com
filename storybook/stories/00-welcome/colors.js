import * as React from 'react';

import withPropsCombinations from 'react-storybook-addon-props-combinations';
import colorMap from '!!sass-variable-loader!../../../src/assets/scss/custom/config/_colors.scss';

import {splitCamelCaseString} from '../../utils';

const colorGroupNames = ['base', 'alpha', 'beta', 'gamma', 'delta', 'epsilon'];
const colorGroups = Object.keys(colorMap)
  .map(key => ({
    varName: `$${splitCamelCaseString(key).join('-')}`,
    value: colorMap[key],
  }))
  .map(color => ({
    ...color,
    group: colorGroupNames.find(group => color.varName.indexOf(group) > -1),
  }))
  .filter(({group}) => Boolean(group))
  .reduce((acc, color) => {
    return acc.map(group => {
      return group.id === color.group ? {...group, items: group.items.concat(color)} : group;
    });
  }, colorGroupNames.map(group => ({id: group, items: []})));

const colorStory = withPropsCombinations(
  ({style, ...restProps}) => {
    return (
      <div style={{height: '100px', ...style}} {...restProps}>
        <div className="child" />
      </div>
    );
  },
  {group: colorGroups},
  {
    CombinationRenderer: ({Component, props}) => {
      const {group} = props;

      return (
        <div>
          <h1>{group.id} colors</h1>

          {group.items.map(clr => (
            <div key={clr.varName}>
              <Component style={{backgroundColor: clr.value}} />
              <p>
                {clr.varName} - {clr.value}
              </p>
            </div>
          ))}
          <br />
        </div>
      );
    },
  },
);

export default colorStory;
