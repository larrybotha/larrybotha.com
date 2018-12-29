import * as React from 'react';

import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {storiesOf} from '@storybook/react';
import withPropsCombinations from 'react-storybook-addon-props-combinations';

import {GridCol, GridWrap} from '../../../src/components/grid';

const Background = ({children, ...restProps}) => (
  <p style={{backgroundColor: '#f1f1f1'}}>{children}</p>
);

const ExampleGrid = props => (
  <GridWrap {...props}>
    <GridCol baseWidth="1-of-3">
      <Background>1</Background>
    </GridCol>
    <GridCol baseWidth="1-of-3">
      <Background>2</Background>
    </GridCol>
    <GridCol baseWidth="1-of-3">
      <Background>3</Background>
    </GridCol>
  </GridWrap>
);

storiesOf('Components/Grid/GridWrap', module)
  .add(
    'usage',
    withInfo({inline: true})(() => (
      <GridWrap>
        <GridCol baseWidth="1-of-3">
          <Background>1-of-3</Background>
        </GridCol>
        <GridCol baseWidth="1-of-4">
          <Background>1-of-4</Background>
        </GridCol>
        <GridCol baseWidth="1-of-5">
          <Background>1-of-5</Background>
        </GridCol>
      </GridWrap>
    )),
  )
  .add(
    'modifiers',
    withPropsCombinations(
      GridWrap,
      {modifiers: ['middle', 'center', 'rev'].map(m => [m])},
      {
        showSource: true,
        CombinationRenderer: ({Component, props, options}) => {
          const propsString = Object.keys(props)
            .map(p => `${p}={[${props[p]}]}`)
            .join(' ');
          const example = `<${Component.displayName} ${propsString}>...</${Component.displayName}>`;

          return (
            <div>
              <Component {...props}>
                <GridCol baseWidth="1-of-3">
                  <Background>1</Background>
                </GridCol>
                <GridCol baseWidth="1-of-3">
                  <Background>2</Background>
                </GridCol>
                <GridCol baseWidth="1-of-3">
                  <Background>3</Background>
                </GridCol>
              </Component>

              <p>{example}</p>

              <hr />
            </div>
          );
        },
      },
    ),
  );
