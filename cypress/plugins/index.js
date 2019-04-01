const fs = require('fs')
const path = require('path')
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

const getCypressConfig = (envName = '') => {
  const configFilename = ['cypress', envName, 'json'].filter(Boolean).join('.')
  console.log(`Loading Cypress config: ${configFilename}...`)
  return JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../', configFilename)),
  )
}

module.exports = (on, config) => {
  on(
    'file:preprocessor',
    webpackPreprocessor({
      webpackOptions,
      watchOptions: {},
    }),
  )

  const { envName } = config.env
  const env = getCypressConfig(envName)
  console.log({ env })
  return env
}
