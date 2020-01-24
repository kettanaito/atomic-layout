import path from 'path'
import sourceMaps from 'rollup-plugin-sourcemaps'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'
import {
  getEnv,
  babel,
  resolve,
  external,
  typescript,
  warnOnMissingDependency,
} from '../atomic-layout/rollup.config'
import packageJson from './package.json'

// Require `@atomic-layout/emotion` speciric Babel config
// to explicitly pass it to "babel" Rollup plugin in order
// for import replacement of "styled-components" to be applied.
const babelConfig = require('./babel.config')

const { nodeEnv, TARGET, PRODUCTION } = getEnv(process.env)

const BUILD_DIR = '.'
const getPath = (filepath) => {
  return path.resolve(BUILD_DIR, filepath)
}

const input = packageJson.esnext

const buildCjs = {
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
    babel(babelConfig),
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
}

const buildUmd = {
  input,
  external: Object.keys(packageJson.peerDependencies),
  output: {
    file: getPath(packageJson['umd:main']),
    name: 'AtomicLayout',
    format: 'umd',
    exports: 'named',
    sourcemap: PRODUCTION,
    globals: {
      react: 'React',
      '@emotion/core': 'emotionCore',
      '@emotion/styled': 'emotionStyled',
    },
  },
  plugins: [
    resolve(),
    typescript(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    }),
    babel(babelConfig),
    commonjs({
      namedExports: {
        tslib: ['__makeTemplateObject', '__rest'],
      },
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
  onwarn: warnOnMissingDependency,
}

const buildEsm = {
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
    babel(babelConfig),
    PRODUCTION && sourceMaps(),
  ],
}

const buildTargets = {
  cjs: buildCjs,
  umd: buildUmd,
  esm: buildEsm,
}

export default TARGET ? buildTargets[TARGET] : Object.values(buildTargets)
