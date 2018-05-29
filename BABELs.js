main ==============================
{
  "presets":
    ["env"],
  "plugins": [
    "transform-object-rest-spread",
    "transform-class-properties",
    "transform-promise-to-bluebird"
  ]
}
server ============================
{
  "presets": 
    ["react","env"],
  "plugins": [
    "transform-object-rest-spread",
    "transform-promise-to-bluebird",
    "transform-decorators-legacy",
    "transform-class-properties",
    "transform-react-display-name"
  ]
}
client ===========================
{
  "presets":
    ["react", ["env", { modules: false }]],
  "plugins": [
    "transform-object-rest-spread",
    "transform-promise-to-bluebird",
    "transform-decorators-legacy",
    "transform-class-properties",
    "transform-react-display-name",
    "react-hot-loader/babel"
  ]
}
MINE ==========================================
"babel-plugin-css-modules-transform"
"babel-plugin-webpack-loaders"
{
  "presets": 
    ["react",
    ["env", { "modules": false, }],"stage-0",],
  "plugins": [
    "react-hot-loader/babel",
    "transform-regenerator",
    "transform-runtime",
    "add-module-exports",
    "transform-decorators-legacy",
    "transform-es2015-modules-commonjs",
  ],
}

"stage-0"
"transform-regenerator",
"transform-runtime",
"add-module-exports",
"transform-es2015-modules-commonjs",

react-redux-universal-0.1-stable =============
{
  "presets": [
    "react",
    ["env"],
    "stage-0"
  ],
  "plugins": [
    "transform-runtime",
    "add-module-exports",
    "transform-decorators-legacy"
  ],
  "env": {
    "development": {
      "plugins": [
        "transform-react-jsx-source"
      ]
    }
  }
}

JOBERERR ===================================
{
  "passPerPreset": true,
  "presets": [
    {
      "plugins": [
        "transform-runtime",
      ]
    },
    {
      "passPerPreset": false,
      "presets": [
        "react",
        [
          "es2015",
          { modules: false
          }
        ],
        "stage-0",
        "flow"
      ]
    }
  ],
  "plugins": [
    "react-hot-loader/babel",
    "transform-decorators-legacy",
    "transform-regenerator",
    "transform-runtime",
    "transform-es2015-modules-commonjs",
  ],
}