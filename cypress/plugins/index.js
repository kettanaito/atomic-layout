const fs = require('fs')
const path = require('path')
const webpackPreprocessor = require('@cypress/webpack-preprocessor')
const babelConfig = require('../../babel.config')

const webpackOptions = {
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
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
    extensions: ['.ts', '.tsx', '.spec.jsx', '.spec.js', '.jsx', '.js'],
  },
}

const getCypressConfig = (envName = '') => {
  const configFilename = ['cypress', envName, 'json'].filter(Boolean).join('.')

  const baseConfig = require('../../cypress.json')
  const envConfig = envName ? require(`../../cypress.${envName}.json`) : {}

  console.log(`Loading base Cypress config...`)

  if (envName) {
    console.log(`Loading environmental Cypress config: ${configFilename}...`)
  }

  return Object.assign({}, baseConfig, envConfig)
}

module.exports = (on, config) => {
  on(
    'file:preprocessor',
    webpackPreprocessor({
      webpackOptions,
      watchOptions: {},
    }),
  )

  return getCypressConfig(config.env.envName)
}
