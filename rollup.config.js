import path from 'path'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import babel from 'rollup-plugin-babel'
import ttypescript from 'ttypescript'
import tsPlugin from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import packageJson from './package.json'

// Import as CJS since writing Babel config in ES
// makes it unreadable by other tools (i.e. storybook).
const babelConfig = require('./babel.config')
const BUILD_DIR = '.'
const getPath = (filepath) => {
  return path.resolve(BUILD_DIR, filepath)
}

const nodeEnv = process.env.NODE_ENV
const target = process.env.TARGET
const PRODUCTION = nodeEnv === 'production'
const __PROD__ = PRODUCTION ? 'true' : ''
const input = packageJson.esnext

const external = (moduleName) => {
  return !moduleName.startsWith('.') && !path.isAbsolute(moduleName)
}

const typescript = () => {
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

const resolve = () => {
  return nodeResolve({
    mainFields: ['esnext'],
    extensions: ['.ts', '.tsx'],
  })
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
      __PROD__,
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
    babel(babelConfig),
    replace({
      __PROD__,
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    }),
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
    resolve(),
    typescript(),
    babel(babelConfig),
    PRODUCTION && sourceMaps(),
  ],
})

const buildTargets = {
  cjs: buildCjs(),
  umd: buildUmd(),
  esm: buildEsm(),
}

export default (target ? buildTargets[target] : Object.values(buildTargets))
