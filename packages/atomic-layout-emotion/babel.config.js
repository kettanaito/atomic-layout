const path = require('path')

const rootConfigPath = path.resolve(__dirname, '../..', 'babel.config.js')

console.log(
  '@atomic-layout/emotion: loading babel config at "%s"',
  rootConfigPath,
)

module.exports = {
  // Resolve the path otherwise it gets resolved relatively
  // to Storybook main entry module during the Storybook build.
  extends: rootConfigPath,
}
