const path = require('path')
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
    /**
     * UMD modules refer to "window", which breaks SSR.
     * @see https://github.com/webpack/webpack/issues/6522
     */
    globalObject: `typeof self !== 'undefined' ? self : this`,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?/i,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    alias: {
      'react-responsive': 'react-responsive/dist/react-responsive.min',
    },
    extensions: ['.jsx', '.js'],
  },
}
