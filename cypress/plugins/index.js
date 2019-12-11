const fs = require('fs')
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

const getCypressConfig = (env) => {
  const { envName = '', package } = env
  const configFilename = ['cypress', envName, 'json'].filter(Boolean).join('.')

  const baseConfig = require('../../cypress.json')
  const envConfig = envName ? require(`../../cypress.${envName}.json`) : {}

  if (envName) {
    console.log(`Extending base Cypress config with "${configFilename}"`)
  }

  const resolvedConfig = Object.assign({}, baseConfig, envConfig)

  if (
    resolvedConfig.fileServerFolder &&
    resolvedConfig.fileServerFolder.includes('{PACKAGE}')
  ) {
    if (package == null) {
      throw new Error(
        `Failed to run Cypress against a static file server with no "package" environmental variable specified (${package}).`,
      )
    }

    const nestedServerFolder = resolvedConfig.fileServerFolder.replace(
      '{PACKAGE}',
      package,
    )
    resolvedConfig.fileServerFolder = nestedServerFolder

    console.log(`Loading test suites at "${nestedServerFolder}"`)
  }

  console.log('Resolved Cypress config:')
  console.log(JSON.stringify(resolvedConfig, null, 2))

  return resolvedConfig
}

module.exports = (on, config) => {
  on(
    'file:preprocessor',
    webpackPreprocessor({
      webpackOptions,
      watchOptions: {},
    }),
  )

  return getCypressConfig(config.env)
}
