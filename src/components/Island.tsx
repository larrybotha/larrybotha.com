import * as React from 'react';

export interface IIslandProps {
  baseClassName?: string;
  className?: string;
  modifiers?: string[];
  [key: string]: any;
}

class Island extends React.Component<IIslandProps, {}> {
  public static defaultProps: Partial<IIslandProps> = {
    baseClassName: 'island',
    className: '',
    modifiers: [],
  };

  public render() {
    const {children, baseClassName, className, modifiers, ...restProps} = this.props;
    const islandClassName = (modifiers as string[])
      .filter(Boolean)
      .map(m => `${baseClassName}--${m}`)
      .join(' ');

    return (
      <div className={`${islandClassName || baseClassName} ${className}`} {...restProps}>
        {children}
      </div>
    );
  }
}

export default Island;
