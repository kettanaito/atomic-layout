const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const entryPropertyName = {
  cjs: 'main',
  umd: 'umd:main',
  esm: 'module',
}

const resolveBuildPath = (relativeProjectPath, moduleType) => {
  const projectPath = path.resolve(__dirname, '../', relativeProjectPath)
  const packageJson = require(`${projectPath}/package.json`)
  const buildPath = path.resolve(
    projectPath,
    packageJson[entryPropertyName[moduleType]],
  )

  return buildPath
}

module.exports = async ({ config }) => {
  const { PACKAGE, MODULE_TYPE } = process.env
  const moduleFilePath = resolveBuildPath(PACKAGE, MODULE_TYPE)
  const examplesDir = path.resolve(__dirname, '../examples')
  const stylingModule = PACKAGE.includes('emotion')
    ? '@emotion/styled'
    : 'styled-components'

  console.log(
    `Build: ${chalk.cyan(PACKAGE)} (${chalk.gray(MODULE_TYPE.toUpperCase())})`,
  )
  console.log(`Module: ${chalk.magenta(moduleFilePath)}`)
  console.log(`Examples: ${chalk.magenta(examplesDir)}`)

  if (!fs.existsSync(moduleFilePath)) {
    throw new Error(
      `\n
Failed to resolve the specified Atomic Layout build at "${moduleFilePath}"
Please make sure you point to the existing build module.
`,
    )
  }

  /**
   * @see https://github.com/storybookjs/storybook/issues/3346
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

      console.log(
        chalk.green(
          `Patched babel-loader successfully to include "${examplesDir}"`,
        ),
      )
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
    'supported-styling-library': stylingModule,
    '@stories': examplesDir,
  }

  return config
}
