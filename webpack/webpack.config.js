const webpack = require('webpack');
const path = require('path');

const rootPath = path.resolve(__dirname, '..');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {

  context: rootPath,

  entry: {
    main: [],
  },

  output: {
    path: path.resolve(rootPath, 'build/public/assets'),
    publicPath: '/assets/',
  },

  module: {

    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { 
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ]
      },
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx',],
  },

  plugins: [

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

  ],
};
