import { serverConfiguration } from 'universal-webpack';
import settings from './universal-webpack-settings';
import configuration2 from './webpack.config';
const path = require('path');


//configuration2.entry.main.pop();
//configuration2.module.rules.pop();
console.log('>>>>>>>>>>> WCSPB > configuration2.entry.main >>>>>>>>1: ', configuration2.entry.main);
console.log('>>>>>>>>>>> WCSPB > configuration2.module.rules >>>>>>>>1: ', configuration2.module.rules);
//configuration2.entry.main.length = 0;
//configuration2.module.rules.length = 0;

configuration2.entry.main.push(
  './client/index.entry.js',
);

configuration2.module.rules.push(
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
            path.resolve(configuration2.context, 'client/assets/scss/mixins/mixins.scss')
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

);

console.log('>>>>>>>>>>> WCSPB > configuration2.entry.main >>>>>>>>3: ', configuration2.entry.main);
console.log('>>>>>>>>>>> WCSPB > configuration2.module.rules >>>>>>>>3: ', configuration2.module.rules);

const configurationServer = serverConfiguration(configuration2, settings);

export default configurationServer;
