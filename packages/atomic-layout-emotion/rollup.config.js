import path from 'path'
import sourceMaps from 'rollup-plugin-sourcemaps'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'
import {
  getEnv,
  babel,
  resolve,
  typescript,
  warnOnMissingDependency,
} from '../atomic-layout/rollup.config'
import packageJson from './package.json'

const { nodeEnv, PRODUCTION } = getEnv(process.env)

const BUILD_DIR = '.'
const getPath = (filepath) => {
  return path.resolve(BUILD_DIR, filepath)
}

const input = packageJson.esnext

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
      /** @TODO add emotion */
    },
  },
  plugins: [
    resolve(),
    typescript(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    }),
    babel(),
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

module.exports = [buildUmd]
