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
      /**
       * @TODO add "@emotion/core" and "@emotion/styled" as globals.
       */
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

const buildTargets = {
  cjs: buildCjs,
  umd: buildUmd,
}

console.log('@atomic-layout/emotion: building "%s" module type', TARGET)

export default TARGET ? buildTargets[TARGET] : Object.values(buildTargets)
