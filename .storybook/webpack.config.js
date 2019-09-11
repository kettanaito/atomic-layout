const path = require('path')

module.exports = async ({ config }) => {
  const target = process.env.TARGET || 'cjs'
  const packageFilepath = `../${target}`

  console.log(`\nLoading "atomic-layout" package from: ${packageFilepath}\n`)

  config.resolve.alias = {
    ...config.resolve.alias,
    'atomic-layout': path.resolve(__dirname, packageFilepath),
    '@stories': path.resolve(__dirname, '../examples'),
  }

  return config
}
