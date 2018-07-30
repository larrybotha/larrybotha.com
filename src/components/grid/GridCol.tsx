import * as React from 'react';

export enum ColModifiers {
  auto = 'auto',
  shrinkWrap = 'shrink-wrap',
  tall = 'tall',
}

export interface IGridColViewports {
  desk: string;
  lap: string;
  palm: string;
  portable: string;
  [key: string]: any;
}

export interface IGridColProps {
  className?: string;
  modifiers?: ColModifiers[];
  tagName?: string;
  viewports?: IGridColViewports;
  [key: string]: any;
}

const getVpClasses = (vps: IGridColProps['viewports']) =>
  vps ? Object.keys(vps).map(key => `g-${key}-${vps[key]}`) : [];

class GridCol extends React.Component<IGridColProps> {
  public static defaultProps: Partial<IGridColProps> = {
    baseWidth: '',
    className: '',
    modifiers: [],
    tagName: 'div',
    viewPorts: {},
  };

  public render() {
    const {baseWidth, children, className, modifiers, tagName, viewports} = this.props;
    const modClasses = (modifiers as ColModifiers[]).map(m => `g--${m}`);
    const viewportClasses = getVpClasses(viewports);
    const baseWidthClassName = baseWidth ? `g-${baseWidth}` : '';
    const classes = [className]
      .concat(modClasses)
      .concat(viewportClasses)
      .concat(baseWidthClassName)
      .join(' ');
    const CustomTagName: React.ReactChild = tagName as string;

    return <CustomTagName className={`g ${classes}`}>{children}</CustomTagName>;
  }
}

export default GridCol;
