const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { clientConfiguration } = require('universal-webpack');

// const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;

const settings = require('./universal-webpack-settings');
const base_configuration = require('./webpack.config');

// With `development: false` all CSS will be extracted into a file
// named '[name]-[contenthash].css' using `mini-css-extract-plugin`.
const configuration = clientConfiguration(base_configuration, settings, { development: false, useMiniCssExtractPlugin: true });

const buildPath = path.resolve(configuration.context, './build/public/assets');

const bundleAnalyzerPath = path.resolve(configuration.context, './build/analyzers/bundleAnalyzer');
const visualizerPath = path.resolve(configuration.context, './build/analyzers/visualizer');
const assetsPath = path.resolve(configuration.context, './build/public/assets');
const serverPath = path.resolve(configuration.context, './build/server');

configuration.devtool = 'source-map';
// configuration.devtool = 'hidden-source-map';

// configuration.optimization.minimize = true;
// configuration.optimization.minimizer = [];

configuration.output.filename = '[name]-[chunkhash].js';

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// PLUGINS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

configuration.plugins.push(

  new CleanWebpackPlugin([bundleAnalyzerPath,visualizerPath,assetsPath,serverPath], { root: configuration.context }),

  new webpack.DefinePlugin({
    'process.env': {
      CLIENT: JSON.stringify(false),
      NODE_ENV  : JSON.stringify('production'),
    },
    __CLIENT__: false,
    __SERVER__: true,
    __DEVELOPMENT__: false,
    __DEVTOOLS__: false,
    __DLLS__: false,
  }),

  new UglifyJsPlugin({
    // test: ,  // {RegExp|Array<RegExp>}   /\.js$/i  Test to match files against
    // include: ,  // {RegExp|Array<RegExp>}  undefined   Files to include
    // exclude: ,  // {RegExp|Array<RegExp>}  undefined   Files to exclude
    cache: false,      // Enable file caching (default: false)
    parallel: true,   // Use multi-process parallel running to improve the build speed (default: false)
    sourceMap: true, // Use source maps to map error message locations to modules (default: false)
    extractComments: false, // Whether comments shall be extracted to a separate file (default: false)
    uglifyOptions: {
      ecma: 8, // Supported ECMAScript Version (default undefined)
      warnings: false, // Display Warnings (default false)
      mangle: true, // Enable Name Mangling (default true)
      compress: {
        passes: 2,  // The maximum number of times to run compress (default: 1)
      },
      output: {
        beautify: false, // whether to actually beautify the output (default true)
        comments: false, // true or "all" to preserve all comments, "some" to preserve some (default false)
      },
      ie8: false, // Enable IE8 Support (default false)
      safari10: false, // Enable work around Safari 10/11 bugs in loop scoping and await (default false)
    }
  }),

  new OptimizeCSSAssetsPlugin({
    cssProcessor: require('cssnano'), // cssnano >>> default optimize \ minimize css processor 
    cssProcessorOptions: { discardComments: { removeAll: true } }, // defaults to {}
    canPrint: true, // indicating if the plugin can print messages to the console (default true)
  }),

  // new ReactLoadablePlugin({
  //   filename: path.join(buildPath, 'loadable-chunks.json')
  // }),

  // https://blog.etleap.com/2017/02/02/inspecting-your-webpack-bundle/
  new Visualizer({
    // Relative to the output folder
    filename: '../../analyzers/visualizer/bundle-stats.html'
  }),

  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: '../../analyzers/bundleAnalyzer/client-development.html',
    // analyzerMode: 'server',
    // analyzerPort: 8888,
    // defaultSizes: 'parsed',
    openAnalyzer: false,
    generateStatsFile: false
  }),

);

export default configuration;
