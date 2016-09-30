var webpack = require("webpack");

var BUILD_FOLDER = __dirname + "/../dist";

module.exports = {
  PUBLIC_FOLDER: '../examples/basic/',
  context: __dirname,
  entry: "../examples/basic/index",
  output: {
    path: BUILD_FOLDER,
    publicPath: BUILD_FOLDER,
    filename: "bundle.js",
    libraryTarget: "commonjs"
  },

  module: {
    loaders: [
      // BABEL
      {
        test: /\.js?$/,
          exclude: /node_modules/,
            loader: 'babel?presets[]=es2015'
      }
    ]
  }
}