const path = require('path')
const webpack = require('webpack')
const webpackPreprocessor = require('@cypress/webpack-preprocessor')

const webpackOptions = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'flow'],
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'raw-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  resolve: {
    alias: {
      '@stories': path.resolve(__dirname, '../../stories'),
    },
    extensions: ['.spec.jsx', '.spec.js', '.jsx', '.js'],
  },
}

module.exports = (on, config) => {
  on(
    'file:preprocessor',
    webpackPreprocessor({
      webpackOptions,
    }),
  )
}
