const path = require('path')

module.exports = async ({ config }) => {
  config.resolve.alias = {
    'atomic-layout': path.resolve(__dirname, '../lib/atomic-layout.cjs.js'),
    '@stories': path.resolve(__dirname, '../examples'),
  }
  return config
}
