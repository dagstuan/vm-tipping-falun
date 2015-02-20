var webpack = require('webpack');

module.exports = {
  devtool: '#inline-source-map',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './js/app'
  ],
  output: {
    path: __dirname + '/build/',
    filename: '[name].entry.js',
    publicPath: '/build'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          '6to5-loader'
          //'6to5-loader?experimental&optional=selfContained' // http://6to5.org/docs/usage/experimental/
        ]
      },
      {
        test: /\.woff(2)?(.*)?$/,
        loader: "url-loader?prefix=/&limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(.*)?$/,
        loader: "file-loader?prefix=/"
      },
      {
        test: /\.less$/,
        loaders: [
          "style-loader",
          "css-loader",
          "autoprefixer-loader?browsers=last 2 version",
          "less-loader?strictMath&cleancss"
        ]
      },
    ]
  }
};
