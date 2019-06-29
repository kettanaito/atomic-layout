const path = require('path')

module.exports = async ({ config }) => {
  const target = process.env.TARGET

  config.resolve.alias = {
    'atomic-layout': path.resolve(__dirname, `../lib/${target}.js`),
    '@stories': path.resolve(__dirname, '../examples'),
  }
  return config
}
