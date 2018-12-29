import * as React from 'react';

export interface GridWrapProps extends React.HTMLAttributes<HTMLElement> {
  modifierBaseClassName?: string;
  modifiers?: string[];
  tagName?: string;
  [key: string]: any;
}

class GridWrap extends React.Component<GridWrapProps> {
  public static displayName = 'GridWrap';

  public static defaultProps: Partial<GridWrapProps> = {
    className: '',
    modifierBaseClassName: 'gw',
    modifiers: [],
    tagName: 'div',
  };

  public render() {
    const {
      children,
      className,
      modifierBaseClassName,
      modifiers,
      tagName,
      ...restProps
    } = this.props;
    const gwClassName = [modifierBaseClassName]
      .concat((modifiers as string[]).map(m => `${modifierBaseClassName}--${m}`))
      .concat(className)
      .filter(Boolean)
      .join(' ');

    return React.createElement(tagName, {
      children,
      className: `gw ${gwClassName}`,
      ...restProps,
    });
  }
}

export default GridWrap;
