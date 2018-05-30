const webpack = require('webpack');
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';
const rootPath = path.resolve(__dirname, '..');

module.exports = {

  context: rootPath,

  entry: {
    main: [
      'bootstrap-loader',
      './client/index.entry.js',
    ],
  },

  output: {
    path: path.resolve(rootPath, 'build/public/assets'),
    publicPath: '/assets/',
    // chunkFilename: '[name].[hash].js'
    // chunkFilename: '[name].[chunkhash].js',
    // filename: '[name]-[hash].js',
    // filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].chunk.js',
  },

  // optimization: {
  //   splitChunks: {
  //     automaticNameDelimiter: "-",
  //     chunks: 'all',
  //     minSize: 0,
  //   },
  //   // runtimeChunk: 'single', // (true | 'single' | 'multiple') // create chunk which contains only the webpack runtime
  //   // occurrenceOrder: true,  // To keep filename consistent between different modes (for example building only)
  // },

  // webpack 4 removes the CommonsChunkPlugin in favor of two new options
  // (optimization.splitChunks and optimization.runtimeChunk)

  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // },

  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true
  //       },
  //       vendor: {
  //         chunks: 'initial',
  //         name: 'vendor',
  //         priority: -10,
  //         enforce: true
  //       }
  //     }
  //   }
  // },

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
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader',
            // options: {
            //   sourceMap: true,
            // }
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
                path.resolve(rootPath, 'client/assets/scss/mixins/mixins.scss')
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
    modules: [
      'client',
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.json',],
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
