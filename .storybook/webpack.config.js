const path = require('path')

module.exports = async ({ config }) => {
  const target = process.env.TARGET || 'cjs'

  config.resolve.alias = {
    'atomic-layout': path.resolve(__dirname, `../${target}`),
    '@stories': path.resolve(__dirname, '../examples'),
  }
  return config
}
