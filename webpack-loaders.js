module.exports = [
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
];
