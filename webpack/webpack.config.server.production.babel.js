const { serverConfiguration } = require('universal-webpack');
const settings = require('./universal-webpack-settings');
const configuration = require('./webpack.config');
const path = require('path');

// base_configuration.entry.main.push(
//   './client/index.entry.js',
// );

configuration.output.filename = '[name].js';
configuration.output.chunkFilename = '[name].js';

configuration.module.rules.push(
  {
    test: /\.(scss)$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          sourceMap: true,
          //localIdentName: '[name]__[local]__[hash:base64:5]',
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          // config: {
          //   path: 'postcss.config.js',
          // },
        }
      },
      {
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          sourceMap: true,
          // sourceMapContents: true
        }
      },
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            path.resolve(configuration.context, 'client/assets/scss/mixins/mixins.scss')
          ],
        },
      },
    ]
  },
  {
    test: /\.(css)$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader : 'css-loader',
        options: {
          modules: true,
          //localIdentName: '[name]__[local]__[hash:base64:5]',
          importLoaders: 1,
          sourceMap: true
        }
      },
      {
        loader : 'postcss-loader'
      },
    ]
  },

);

const configurationServer = serverConfiguration(configuration, settings);

export default configurationServer;
