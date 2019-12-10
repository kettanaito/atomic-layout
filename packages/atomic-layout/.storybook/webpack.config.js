const fs = require('fs')
const path = require('path')

const entryPropertyName = {
  cjs: 'main',
  umd: 'umd:main',
  esm: 'module',
}

const resolveBuildPath = (relativeProjectPath, moduleType) => {
  const projectPath = path.resolve(__dirname, '../../../', relativeProjectPath)
  const packageJson = require(`${projectPath}/package.json`)
  return path.resolve(projectPath, packageJson[entryPropertyName[moduleType]])
}

module.exports = async ({ config }) => {
  const { PACKAGE, MODULE_TYPE } = process.env
  const moduleFilePath = resolveBuildPath(PACKAGE, MODULE_TYPE)
  const examplesDir = path.resolve(__dirname, '../examples')

  console.log(
    `
Building Storybook with the ${MODULE_TYPE.toUpperCase()} build of "atomic-layout"
Imports of "atomic-layout" aliased to "${moduleFilePath}"
Storybook stories loaded from "${examplesDir}"
`,
  )

  if (!fs.existsSync(moduleFilePath)) {
    throw new Error(
      `\n
Failed to resolve the specified Atomic Layout build at "${moduleFilePath}"
Please make sure you point to the existing build module.
`,
    )
  }

  /**
   * @todo Replace this workaround with something native to Storybook
   * or find a better solution how to compile external "examples" directory.
   *
   * Patches a "babel-loader" rule in Storybook config
   * to include the examples directory. Otherwise "babel-loader"
   * is not applied to the modules in examples.
   *
   * This is related to "examples" directory being reused for
   * different packages. Spawning a Storybook build in a package directory
   * that does not contain the "examples" directory, would ignore
   * an external "example" directory during the compilation.
   */
  const patchBabelLoader = (rule) => {
    if (rule.include) {
      rule.include = rule.include.concat(examplesDir)
    }
  }

  config.module.rules.forEach((rule) => {
    if (rule.loader && rule.loader.includes('babel-loader')) {
      patchBabelLoader(rule)
    }

    if (rule.use) {
      rule.use.forEach((use) => {
        if (use.loader === 'babel-loader') {
          patchBabelLoader(rule, use)
        }
      })
    }
  })

  config.resolve.alias = {
    ...config.resolve.alias,
    'atomic-layout': moduleFilePath,
    '@stories': examplesDir,
  }

  return config
}
