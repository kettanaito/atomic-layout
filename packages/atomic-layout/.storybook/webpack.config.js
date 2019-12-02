const fs = require('fs')
const path = require('path')
const packageJson = require('../package.json')

module.exports = async ({ config }) => {
  const target = process.env.TARGET || 'cjs'
  const buildDir = packageJson.main.split(path.sep)[0]
  const packageFilepath = path.resolve(buildDir, target)
  const resolvedAtomicLayout = path.resolve(__dirname, packageFilepath)
  const examplesDir = path.resolve(__dirname, '../examples')

  console.log(
    `
Building Storybook with the ${target.toUpperCase()} build of "atomic-layout" at "${packageFilepath}"
Imports of "atomic-layout" aliased to "${resolvedAtomicLayout}"
Storybook stories loaded from "${examplesDir}"
`,
  )

  if (!fs.existsSync(packageFilepath)) {
    throw new Error(
      `\n
Failed to resolve the specified Atomic Layout build at "${packageFilepath}"
Please make sure you point to the existing build module.
`,
    )
  }

  config.resolve.alias = {
    ...config.resolve.alias,
    'atomic-layout': resolvedAtomicLayout,
    '@stories': examplesDir,
  }

  return config
}
