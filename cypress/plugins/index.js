const webpackPreprocessor = require('@cypress/webpack-preprocessor')
const webpackConfig = require('../../webpack.config')
const babelConfig = require('../../babel.config')

const webpackOptions = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig,
          },
        ],
      },
    ],
  },
  resolve: {
    plugins: webpackConfig.resolve.plugins,
    extensions: ['.ts', '.tsx', '.spec.jsx', '.spec.js', '.jsx', '.js'],
  },
}

module.exports = (on, config) => {
  on(
    'file:preprocessor',
    webpackPreprocessor({
      webpackOptions,
      watchOptions: {},
    }),
  )
}
