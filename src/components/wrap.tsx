import * as React from 'react';

export interface WrapProps {
  baseClassName?: string;
  className?: string;
  modifiers?: string[];
  [key: string]: any;
}

class Wrap extends React.Component<WrapProps, {}> {
  public static defaultProps: Partial<WrapProps> = {
    baseClassName: 'wrap',
    className: '',
    modifiers: [],
  };

  public render() {
    const {children, baseClassName, className, modifiers, ...restProps} = this.props;
    const wrapClassName = (modifiers as string[])
      .filter(Boolean)
      .map(m => `${baseClassName}--${m}`)
      .join(' ');

    return (
      <div className={`${wrapClassName || baseClassName} ${className}`} {...restProps}>
        {children}
      </div>
    );
  }
}

export {Wrap};
