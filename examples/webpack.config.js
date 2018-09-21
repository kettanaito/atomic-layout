const path = require('path')
const webpackConfig = require('../webpack.config')

const nodeEnv = process.env.NODE_ENV

module.exports = {
  mode: nodeEnv,
  entry: path.resolve(__dirname, 'index'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/i,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      'atomic-layout': path.resolve(__dirname, '../index.js'),
    },
    extensions: ['.jsx', '.js'],
  },
  devServer: {
    port: 9987,
    contentBase: path.resolve(__dirname),
    historyApiFallback: true,
  },
}
