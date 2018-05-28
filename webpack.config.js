const path = require('path')
const webpack = require('webpack')
const BabelMinifyPlugin = require('babel-minify-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const nodeEnv = process.env.NODE_ENV || 'production'
const PRODUCTION = nodeEnv === 'production'

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  externals: {
    react: 'umd react',
    'styled-components': 'umd styled-components',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname),
    library: 'atomicLayout',
    libraryTarget: 'umd',
    umdNamedDefine: true,
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    }),
    new BabelMinifyPlugin({
      removeConsole: true,
      removeDebugger: false,
      mangle: {
        topLevel: true,
      },
    }),
    new BundleAnalyzer(),
  ],
  resolve: {
    extensions: ['.jsx', '.js'],
  },
}
