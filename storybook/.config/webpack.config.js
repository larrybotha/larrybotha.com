const path = require('path');
const autoprefixer = require('autoprefixer');
const glob = require('glob').sync;

module.exports = (baseConfig, env, config) => {
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

  return config;
};
