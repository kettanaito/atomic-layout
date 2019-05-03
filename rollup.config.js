import path from 'path'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import packageJson from './package.json'

const babelConfig = require('./babel.config')

const env = process.env.NODE_ENV
const PRODUCTION = env === 'production'
const input = packageJson.esnext

const external = (moduleName) => {
  return !moduleName.startsWith('.') && !path.isAbsolute(moduleName)
}

const resolve = () => {
  return [
    nodeResolve({
      mainFields: ['esnext'],
      extensions: ['.ts', '.tsx'],
    }),
  ]
}

/**
 * UMD module
 */
const buildUmd = () => ({
  input,
  external: ['react', 'styled-components'],
  output: {
    name: 'AtomicLayout',
    format: 'umd',
    exports: 'named',
    file: `./lib/${packageJson.name}.umd.js`,
    globals: {
      react: 'React',
      'styled-components': 'styled',
    },
  },
  plugins: [
    ...resolve(),
    typescript(),
    babel(babelConfig),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    commonjs(),
    sourceMaps(),
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

/**
 * CommonJS module
 */
const buildCjs = () => ({
  input,
  external,
  output: {
    file: `./lib/${packageJson.name}.cjs.js`,
    format: 'cjs',
    exports: 'named',
    sourcemap: true,
  },
  plugins: [
    ...resolve(),
    typescript(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    sourceMaps(),
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

/**
 * ECMAScript module
 */
const buildEsm = () => ({
  input,
  external,
  output: {
    file: packageJson.module,
    format: 'esm',
    sourcemap: true,
  },
  plugins: [resolve(), typescript(), babel(babelConfig), sourceMaps()],
})

export default [buildUmd(), buildCjs(), buildEsm()]
