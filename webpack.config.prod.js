var webpack = require('webpack');

module.exports = {
  entry: './js/app',
  output: {
    path: __dirname + '/build/',
    filename: '[name].entry.js',
    publicPath: '/vm-tipping-falun/build/'
  },
  module: {
    loaders: require('./webpack-loaders')
  }
};
