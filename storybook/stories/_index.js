// injects into all stories - quite likely a bug in Storybook
import '../styles/style.scss';

const svgXhr =
  typeof window !== 'undefined' ? require('webpack-svgstore-plugin/src/helpers/svgxhr') : () => {};

const __svg__ = {
  path: '../../../src/assets/img/svg-sprite/*.svg',
  name: 'assets/svg/[hash].icons.svg',
};

svgXhr(__svg__);
