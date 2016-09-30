var webpack = require("webpack");

var BUILD_FOLDER = __dirname + "/../dist";

module.exports = {
  PUBLIC_FOLDER: '../dist',
  context: __dirname,
  entry: "../src/index",
  output: {
    path: BUILD_FOLDER,
    publicPath: BUILD_FOLDER,
    filename: "index.js",
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