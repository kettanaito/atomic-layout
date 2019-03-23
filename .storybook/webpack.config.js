const path = require('path')

module.exports = async ({ config }) => {
  config.resolve.alias = {
    'atomic-layout': path.resolve(__dirname, '../lib'),
    '@stories': path.resolve(__dirname, '../stories'),
  }
  return config
}
