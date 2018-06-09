const path = require('path')
const webpackConfig = require('../webpack.config')

const config = {
  entry: path.resolve(__dirname, 'index'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
  },
  module: webpackConfig.module,
  resolve: webpackConfig.resolve,
  devServer: {
    port: 9987,
    contentBase: path.resolve(__dirname),
    historyApiFallback: true,
  },
}

module.exports = config
