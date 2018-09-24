const path = require('path')
const webpack = require('webpack')

const nodeEnv = process.env.NODE_ENV || 'production'

module.exports = {
  mode: nodeEnv,
  entry: path.resolve(__dirname, 'src/index.js'),
  externals: {
    react: 'umd react',
    'styled-components': 'umd styled-components',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname),
    library: 'AtomicLayout',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
}
