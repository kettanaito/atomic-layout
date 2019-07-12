const path = require('path')

module.exports = async ({ config }) => {
  const target = process.env.TARGET || 'cjs'

  console.log(`\nBundling "atomic-layout" build for "${target}" module...\n`)

  config.resolve.alias = {
    'atomic-layout': path.resolve(__dirname, `../${target}`),
    '@stories': path.resolve(__dirname, '../examples'),
  }
  return config
}
