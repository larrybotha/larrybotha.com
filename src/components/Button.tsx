import * as React from 'react';
import {Link} from 'react-router-dom';

export interface IButtonProps {
  className?: string;
  onClick?: React.MouseEventHandler<any>;
  modifierBaseClassName?: string;
  modifiers?: string[];
  to?: string;
  [key: string]: any;
}

const Button: React.SFC<IButtonProps> = ({
  modifierBaseClassName,
  children,
  className,
  onClick,
  modifiers,
  to,
  ...restProps
}) => {
  const modClassName = [modifierBaseClassName, className]
    .concat((modifiers as string[]).map(m => `${modifierBaseClassName}--${m}`))
    .join(' ');

  return to ? (
    <Link className={modClassName} to={to} onClick={onClick} {...restProps}>
      {children}
    </Link>
  ) : (
    <button className={modClassName} onClick={onClick} {...restProps}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  children: '',
  className: '',
  modifierBaseClassName: 'btn',
  modifiers: [],
};

export default Button;
