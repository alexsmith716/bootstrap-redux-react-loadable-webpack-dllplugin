# bootstrap-redux-react-loadable-webpack-dllplugin


### Overview:

App is a continuation of repo 'react-redux-webpack-bootstrap-mongo-universal-webpack'.


### DllPlugin:

The DllPlugin and DllReferencePlugin provide means to split bundles in a way that can drastically improve build time performance.


#### DllPlugin (./webpack/vendor.config.js):

This plugin is used in a separate webpack config exclusively to create a dll-only-bundle (./build/public/assets/dlls/dll__vendor.js). It creates a manifest.json (./webpack/dlls/vendor.json) file, which is used by the DllReferencePlugin (./webpack/helpers.js) >>> (./webpack/dev.config.js) to map dependencies.

Creates a manifest.json (./webpack/dlls/vendor.json) which is written to the given path. It contains mappings from require and import requests, to module ids. It is used by the DllReferencePlugin (./webpack/helpers.js).

Combine this plugin with output.library option to expose (aka, put into the global scope) the dll function.


#### DllReferencePlugin (./webpack/helpers.js):

This plugin is used in the primary webpack config, it references the dll-only-bundle(s) to require pre-built dependencies.

References a dll manifest file to map dependency names to module ids, then requires them as needed using the internal __webpack_require__ function.


#### Points of Interest:

[SourceMapDevToolPlugin:](https://webpack.js.org/plugins/source-map-dev-tool-plugin/)

This plugin enables more fine grained control of source map generation. It is an alternative to the devtool configuration option.