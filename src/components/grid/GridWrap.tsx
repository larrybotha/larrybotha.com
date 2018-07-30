import * as React from 'react';

export interface IGridWrapProps {
  className?: string;
  modifierBaseClassName?: string;
  modifiers?: string[];
  tagName?: string;
  [key: string]: any;
}

class GridWrap extends React.Component<IGridWrapProps> {
  public static displayName = 'GridWrap';

  public static defaultProps: Partial<IGridWrapProps> = {
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
    const CustomTagName: React.ReactChild = tagName as string;

    return (
      <CustomTagName className={`gw ${gwClassName}`} {...restProps}>
        {children}
      </CustomTagName>
    );
  }
}

export default GridWrap;
