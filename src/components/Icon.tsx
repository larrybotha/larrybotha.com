import * as React from 'react';

export interface IIconProps {
  className?: string;
  classNameInner?: string;
  id: string;
  [key: string]: any;
}

const Icon: React.SFC<IIconProps> = props => {
  const {className, classNameInner, id, ...restProps} = props;

  return (
    <i className={className} {...restProps}>
      <i className={classNameInner}>
        <svg>
          <title>{id.replace(/-/g, ' ')} icon</title>

          <use xlinkHref={`#${id}`} />
        </svg>
      </i>
    </i>
  );
};

Icon.defaultProps = {
  className: 'icon',
  classNameInner: 'icon__inner',
};

export default Icon;
