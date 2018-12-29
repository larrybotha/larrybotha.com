import * as React from 'react';

export enum ColModifiers {
  auto = 'auto',
  shrinkWrap = 'shrink-wrap',
  tall = 'tall',
}

export interface GridColViewports {
  desk: string;
  lap: string;
  palm: string;
  portable: string;
  [key: string]: any;
}

export interface GridColProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  modifiers?: ColModifiers[];
  tagName?: string;
  viewports?: GridColViewports;
  [key: string]: any;
}

const getVpClasses = (vps: GridColProps['viewports']) =>
  vps ? Object.keys(vps).map(key => `g-${key}-${vps[key]}`) : [];

class GridCol extends React.Component<GridColProps> {
  public static defaultProps: Partial<GridColProps> = {
    baseWidth: '',
    className: '',
    modifiers: [],
    tagName: 'div',
    viewPorts: {},
  };

  public render() {
    const {
      baseWidth,
      children,
      className,
      modifiers,
      tagName,
      viewports,
      ...restProps
    } = this.props;
    const modClasses = (modifiers as ColModifiers[]).map(m => `g--${m}`);
    const viewportClasses = getVpClasses(viewports);
    const baseWidthClassName = baseWidth ? `g-${baseWidth}` : '';
    const classes = [className]
      .concat(modClasses)
      .concat(viewportClasses)
      .concat(baseWidthClassName)
      .filter(Boolean)
      .join(' ');

    return React.createElement(tagName, {
      className: `g ${classes}`,
      children,
      ...restProps,
    });
  }
}

export default GridCol;
