const path = require('path');
const autoprefixer = require('autoprefixer');
const SvgStore = require('webpack-svgstore-plugin');
const glob = require('glob').sync;
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');

const resolve = dir => {
  return path.join(__dirname, '../../..', dir);
};

module.exports = (baseConfig, env, config) => {
  config.plugins.push(
    new SvgStore({
      svgoOptions: {
        plugins: [{removeTitle: true}],
      },
      prefix: '',
    }),
  );

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader'),
  });

  config.plugins.push(new TSDocgenPlugin());
  config.resolve.extensions = config.resolve.extensions.concat(['.ts', '.tsx']);

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
              flexbox: 'no-2009',
            }),
          ],
        },
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: ['node_modules/normalize.css'],
        },
      },
    ],
  });

  config.resolve.alias['@'] = resolve('src');

  return config;
};
