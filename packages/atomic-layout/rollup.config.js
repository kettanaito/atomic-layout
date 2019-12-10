import path from 'path'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import useBabel from 'rollup-plugin-babel'
import ttypescript from 'ttypescript'
import tsPlugin from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import packageJson from './package.json'

// Import as CJS since writing Babel config in ES
// makes it unreadable by other tools (i.e. Storybook).
const babelConfig = require('./babel.config')

const BUILD_DIR = '.'
const getPath = (filepath) => {
  return path.resolve(BUILD_DIR, filepath)
}

const { TARGET: target } = process.env
const input = packageJson.esnext

export const getEnv = (env) => {
  const { NODE_ENV: nodeEnv } = env
  return {
    nodeEnv,
    PRODUCTION: nodeEnv === 'production',
  }
}

const { nodeEnv, PRODUCTION } = getEnv(process.env)

export const external = (moduleName) => {
  return !moduleName.startsWith('.') && !path.isAbsolute(moduleName)
}

export const babel = (overrides = {}) => {
  return useBabel({
    ...babelConfig,
    ...overrides,
    extensions: ['.ts', '.tsx'],
  })
}

export const typescript = () => {
  return tsPlugin({
    clean: true,
    // Disable type checking during the build
    // to increase the build speed. Types must be
    // checked during the local development.
    // They may also be checked during type definition
    // emitting (ttsc)
    check: false,
    tsconfigOverride: {
      compilerOptions: {
        declaration: false,
        emitDeclarationOnly: false,
      },
    },
    // Provide custom TypeScript instance so it can
    // resolve path aliases (i.e. "@utils/").
    typescript: ttypescript,
  })
}

export const resolve = (override = {}) => {
  return nodeResolve({
    mainFields: ['main', 'esnext'],
    extensions: ['.ts', '.tsx'],
    ...override,
  })
}

export const warnOnMissingDependency = (message) => {
  if (
    message.code === 'UNRESOLVED_IMPORT' &&
    message.source === '@atomic-layout/core'
  ) {
    throw new Error(
      `Could not resolve "@atomic-layout/core" module. Make sure it's installed.`,
    )
  }
}

// CommonJS module
const buildCjs = () => ({
  input,
  external,
  output: {
    file: getPath(packageJson.main),
    format: 'cjs',
    exports: 'named',
    sourcemap: PRODUCTION,
  },
  plugins: [
    resolve(),
    typescript(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    }),
    PRODUCTION && sourceMaps(),
    PRODUCTION &&
      terser({
        ecma: 5,
        sourcemap: true,
        output: {
          comments: false,
        },
        warnings: true,
        toplevel: true,
      }),
  ],
})

// UMD module
const buildUmd = () => ({
  input,
  external: ['react', 'styled-components'],
  output: {
    name: 'AtomicLayout',
    format: 'umd',
    exports: 'named',
    file: getPath(packageJson['umd:main']),
    globals: {
      react: 'React',
      'styled-components': 'styled',
    },
  },
  plugins: [
    resolve(),
    typescript(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    }),
    babel(),
    commonjs(),
    PRODUCTION && sourceMaps(),
    PRODUCTION &&
      terser({
        sourcemap: true,
        output: {
          comments: false,
        },
        warnings: true,
        ecma: 5,
        toplevel: false,
      }),
  ],
  onwarn: warnOnMissingDependency,
})

// ECMAScript module
const buildEsm = () => ({
  input,
  external,
  output: {
    file: getPath(packageJson.module),
    format: 'esm',
    sourcemap: PRODUCTION,
  },
  plugins: [
    resolve({
      mainFields: ['esnext'],
    }),
    typescript(),
    babel(),
    PRODUCTION && sourceMaps(),
  ],
})

const buildTargets = {
  cjs: buildCjs(),
  umd: buildUmd(),
  esm: buildEsm(),
}

export default target ? buildTargets[target] : Object.values(buildTargets)
