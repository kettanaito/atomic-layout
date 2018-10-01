const path = require('path')
// const BabelMinifyPlugin = require('babel-minify-webpack-plugin')

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
    library: 'atomicLayout',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/i,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env.NODE_ENV': JSON.stringify(nodeEnv),
  //   }),
  //   PRODUCTION && new webpack.optimize.ModuleConcatenationPlugin(),
  //   PRODUCTION &&
  //     new BabelMinifyPlugin({
  //       removeConsole: true,
  //       removeDebugger: true,
  //       mangle: {
  //         topLevel: true,
  //       },
  //     }),
  // ].filter(Boolean),
  resolve: {
    extensions: ['.jsx', '.js'],
  },
}
