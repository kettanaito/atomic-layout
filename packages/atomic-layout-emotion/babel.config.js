const path = require('path')

const babelConfigPath = path.resolve(__dirname, '../..', 'babel.config.js')

console.log(
  '@atomic-layout/emotion: loading babel config at "%s"',
  babelConfigPath,
)

module.exports = {
  // Resolve the path otherwise it gets resolved relatively
  // to Storybook main entry module during the Storybook build.
  extends: babelConfigPath,
  plugins: [
    [
      'transform-rename-import',
      {
        // Replace imports to "styled-components" with imports to emotion.
        // Applied to the modules imported from "atomic-layout" package.
        original: '^styled-components',
        replacement: '@emotion/styled',
      },
    ],
  ],
}
