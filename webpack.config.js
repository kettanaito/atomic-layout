const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const nodeEnv = process.env.NODE_ENV || 'production'
const PRODUCTION = nodeEnv === 'production'

module.exports = {
  mode: nodeEnv,
  entry: path.resolve(__dirname, 'src/index'),
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
    /**
     * @quickfix UMD modules refer to "window", which breaks SSR.
     * @see https://github.com/webpack/webpack/issues/6522
     */
    globalObject: `typeof self !== 'undefined' ? self : this`,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(j|t)sx?/i,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'tslint-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __PROD__: JSON.stringify(PRODUCTION ? 'true' : ''),
    }),
  ],
  optimization: {
    minimize: false,
  },
  resolve: {
    alias: {
      'react-responsive': 'react-responsive/dist/react-responsive.min',
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
}
