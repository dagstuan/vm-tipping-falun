var webpack = require('webpack');

module.exports = {
  entry: './js/app',
  output: {
    path: __dirname + '/build/',
    filename: '[name].entry.js',
    publicPath: '/vm-tipping-falun/'
  },
  module: {
    loaders: require('./webpack-loaders')
  }
};
