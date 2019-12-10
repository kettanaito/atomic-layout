const path = require('path')

module.exports = {
  // Resolve the path otherwise it gets resolved relatively
  // to Storybook main entry module during the Storybook build.
  extends: path.resolve(__dirname, '..', 'atomic-layout/babel.config.js'),
}
