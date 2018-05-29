const webpack = require('webpack');
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';
const rootPath = path.resolve(__dirname, '..');

module.exports = {

  context: rootPath,
  entry: {
    main: [
      './client/assets/scss/theme/theme.scss',
      './client/index.entry.js',
    ],
    vendor: [
      'jquery',
      'popper.js',
      'bootstrap',
    ],
  },

  output: {
    path: path.resolve(rootPath, 'build/public/assets'),
    publicPath: '/assets/',
    // chunkFilename: '[name].[hash].js'
    // chunkFilename: '[name].[chunkhash].js',
    filename: '[name]-[hash].js',
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

    strictThisContextOnImports: true,

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
        include: [ path.resolve(rootPath, 'client/assets/scss') ],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
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
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true
            }
          },
        ]
      },
      {
        test: /\.(scss)$/,
        exclude: [ path.resolve(rootPath, 'client/assets/scss') ],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
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
              sourceMap: true,
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
      {
        test: '/popper.js/',
        use: [
          {
            loader: 'expose-loader',
            options: 'Popper',
          },
        ]
      },
      {
        test: '/jquery/',
        use: [
          {
            loader: 'expose-loader',
            options: '$',
          },
          {
            loader: 'expose-loader',
            options: 'jQuery',
          },
          {
            loader: 'expose-loader',
            options: 'jquery',
          },
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json',],
  },
  plugins: []
}
