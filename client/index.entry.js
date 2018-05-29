require('babel-polyfill')

require('./index');

/**
 * Suppress warnings from React Router caused by `react-hot-loader`.
 * The warning can be safely ignored, so filter it from the console.
 * Otherwise you'll see it every time something changes.
 * See https://github.com/gaearon/react-hot-loader/issues/298
 */

 if (module.hot) {
  console.log('>>>>>>>>>>>>>>>> CLIENT >>>>> index.entry.js > MODULE.HOT! <<<<<<<<<<<<<<<<<');
} else {
  console.log('>>>>>>>>>>>>>>>> CLIENT >>>>> index.entry.js > NO MODULE.HOT! <<<<<<<<<<<<<<');
}

if (module.hot) {
  const consoleError = console.error
  console.error = (...args) => {
    if (args.length === 1 && typeof args[0] === 'string' && args[0].indexOf('You cannot change <Router routes>;') >= 0) {
      // React route changed
    } else {
      // Log the error as normally
      consoleError.apply(console, args)
    }
  }
}
