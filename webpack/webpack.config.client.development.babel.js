const webpack = require('webpack');
const helpers = require('./helpers');
const path = require('path');

const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;

const base_configuration = require('./webpack.config');
const application_configuration = require('../configuration');
const settings = require('./universal-webpack-settings');
const { clientConfiguration } = require('universal-webpack');
const configuration = clientConfiguration(base_configuration, settings);

// https://github.com/webpack-contrib/webpack-serve/issues/81#issuecomment-378469110
module.exports = configuration;

var validDLLs = helpers.isValidDLLs('vendor', configuration.output.path);

if (process.env.WEBPACK_DLLS === '1' && !validDLLs) {
  process.env.WEBPACK_DLLS = '0';
  console.warn('>>>>>>>>>>>>>>>>>>>>>>>> webpack dlls disabled!! <<<<<<<<<<<<<<<<<<<<<<<<<<<');
};

// `webpack-serve` can't set the correct `mode` by itself.
// https://github.com/webpack-contrib/webpack-serve/issues/94
configuration.mode = 'development';

// https://webpack.js.org/guides/development/#source-maps
// configuration.devtool = 'cheap-eval-source-map'
// configuration.devtool = 'source-map';
configuration.devtool = 'inline-source-map';

configuration.output.filename = '[name].[hash].js';
configuration.output.chunkFilename = '[name].[chunkhash].chunk.js';

configuration.entry.main.push(
  'bootstrap-loader',
  './client/index.entry.js',
);

configuration.module.rules.push(
  {
    test: /\.(scss)$/,
    use: [
      {
        loader: 'style-loader',
        options: { 
          sourceMap: true 
        }
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          sourceMap: true,
          localIdentName: '[name]__[local]__[hash:base64:5]',
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
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
        loader: 'style-loader',
        options: { 
          sourceMap: true 
        }
      },
      {
        loader : 'css-loader',
        options: {
          modules: true,
          localIdentName: '[name]__[local]__[hash:base64:5]',
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

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// PLUGINS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

configuration.plugins.push(

  new webpack.DefinePlugin({
    'process.env': {
      CLIENT: JSON.stringify(true),
      NODE_ENV  : JSON.stringify('development'),
    },
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: true,
    __DEVTOOLS__: false,
  }),

  // // Webpack Hot Reload
  // new webpack.HotModuleReplacementPlugin(),

  new ReactLoadablePlugin({
    filename: path.join(configuration.output.path, 'loadable-chunks.json')
  }),

  new webpack.NamedModulesPlugin(),

);

// network path for static files: fetch all statics from webpack development server
configuration.output.publicPath = `http://${application_configuration.webpack.devserver.host}:${application_configuration.webpack.devserver.port}${configuration.output.publicPath}`;

console.log('>>>>>> webpack.config.client.development.babel.js > configuration.output.publicPath: ', configuration.output.publicPath);

// `webpack-serve` Config settings.
configuration.serve = {
  port : application_configuration.webpack.devserver.port,
  dev  : {
    // https://github.com/webpack-contrib/webpack-serve/issues/95
    publicPath : configuration.output.publicPath,
    headers : { 'Access-Control-Allow-Origin': '*' }
  }
}

if (process.env.WEBPACK_DLLS === '1' && validDLLs) {
  helpers.installVendorDLL(configuration, 'vendor');
};
