import path from 'path'
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import babel from 'rollup-plugin-babel'
import ttypescript from 'ttypescript'
import compileTypescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import packageJson from './package.json'

// Import as CJS since writing Babel config in ES
// makes it unreadable by other tools (i.e. storybook).
const babelConfig = require('./babel.config')

const nodeEnv = process.env.NODE_ENV
const target = process.env.TARGET
const PRODUCTION = nodeEnv === 'production'
const input = packageJson.esnext

const external = (moduleName) => {
  return !moduleName.startsWith('.') && !path.isAbsolute(moduleName)
}

const typescript = () => {
  return compileTypescript({
    clean: true,
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
    file: `./lib/cjs.js`,
    format: 'cjs',
    exports: 'named',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    typescript(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
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

// UMD module
const buildUmd = () => ({
  input,
  external: ['react', 'styled-components'],
  output: {
    name: 'AtomicLayout',
    format: 'umd',
    exports: 'named',
    file: `./lib/umd.js`,
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
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
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

// ECMAScript module
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

const buildTargets = {
  cjs: buildCjs(),
  umd: buildUmd(),
  esm: buildEsm(),
}

export default (target ? buildTargets[target] : Object.values(buildTargets))
