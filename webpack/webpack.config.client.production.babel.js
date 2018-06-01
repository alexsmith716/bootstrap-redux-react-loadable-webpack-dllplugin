const webpack = require('webpack');
const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { clientConfiguration } = require('universal-webpack');

const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;

const settings = require('./universal-webpack-settings');
const base_configuration = require('./webpack.config');

// With `development: false` all CSS will be extracted into a file
// named '[name]-[contenthash].css' using `mini-css-extract-plugin`.
// const configuration = clientConfiguration(base_configuration, settings, { development: false, useMiniCssExtractPlugin: true });
const configuration = clientConfiguration(base_configuration, settings);

const buildPath = path.resolve(configuration.context, './build/public/assets');

const bundleAnalyzerPath = path.resolve(configuration.context, './build/analyzers/bundleAnalyzer');
const visualizerPath = path.resolve(configuration.context, './build/analyzers/visualizer');
const assetsPath = path.resolve(configuration.context, './build/public/assets');
const serverPath = path.resolve(configuration.context, './build/server');

const devMode = process.env.NODE_ENV !== 'production';

configuration.devtool = 'source-map';
// configuration.devtool = 'hidden-source-map';

// configuration.optimization.minimize = true;
// configuration.optimization.minimizer = [];

configuration.output.filename = '[name]-[chunkhash].js';

configuration.entry.main.push(
  'bootstrap-loader',
  './client/index.entry.js',
);

configuration.module.rules.push(
  {
    test: /\.(scss)$/,
    use: [
      MiniCssExtractPlugin.loader,
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
      MiniCssExtractPlugin.loader,
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

  new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
    chunkFilename: '[id].[hash].css',
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

  new ReactLoadablePlugin({
    filename: path.join(configuration.output.path, 'loadable-chunks.json')
  }),

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

  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    jquery: 'jquery',
    Popper: ['popper.js', 'default'],
    Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
    Button: "exports-loader?Button!bootstrap/js/dist/button",
    Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
    Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
    Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
    Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
    Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
    Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
    Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
    Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
    Util: "exports-loader?Util!bootstrap/js/dist/util",
  }),

);

export default configuration;
