var webpack = require("webpack");

var DIST_FOLDER = __dirname + "/../dist";

module.exports = {
  context: __dirname + "/..",
  debug: true,
  devtool: 'source-map',
  entry: "./examples/basic/index.js",
  output: {
    path: "/dist/",
    filename: "bundle.js",
  },

  module: {
    preLoaders: [
      // {
      //   test: /\.js?$/,
      //   loaders: ['eslint'],
      //   // include: path.resolve(ROOT_PATH, 'app')
      // }
    ],


    loaders: [
      // BABEL / REACT / JSX
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel'],
      },

      // JSON
      { test: /\.json$/, loader: "json" },
    ]
  },

  plugins: [],

  resolve: {
    root: __dirname,
    alias: {}
  },
  // eslint: {
  //   configFile: __dirname + '/../config/.eslintrc'
  // }
}