var webpack = require('webpack');

module.exports = {
  entry: './js/app',
  output: {
    path: __dirname + '/build/',
    filename: '[name].entry.js',
    publicPath: '/build/'
  },
  module: {
    loaders: require('./webpack-loaders')
  }
};
