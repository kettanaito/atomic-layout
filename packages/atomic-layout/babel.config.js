const path = require('path')

const babelConfigPath = path.resolve(__dirname, '../..', 'babel.config.js')

console.log(
  '@atomic-layout/styled: loading babel config at "%s"',
  babelConfigPath,
)

module.exports = {
  // Resolve the path otherwise it gets resolved relatively
  // to Storybook main entry module during the Storybook build.
  extends: babelConfigPath,
}
