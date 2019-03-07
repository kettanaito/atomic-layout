import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import packageJson from './package.json'

const babelOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
  ],
}

const input = './src/index.ts'
const external = (id) => !id.startsWith('.') && !path.isAbsolute(id)
const resolveOptions = {
  extensions: ['.ts', '.tsx'],
}
const env = process.env.NODE_ENV
const PRODUCTION = env === 'production'

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
    resolve(resolveOptions),
    typescript(),
    babel(babelOptions),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    commonjs({
      include: /node_modules/,
      namedExports: {
        'node_modules/react-responsive/dist/react-responsive.js': [
          'MediaQuery',
        ],
      },
    }),
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
    resolve(resolveOptions),
    typescript(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    sourceMaps(),
    PRODUCTION &&
      terser({
        sourcemap: true,
        output: {
          comments: false,
        },
        warnings: true,
        ecma: 5,
        toplevel: true,
      }),
  ],
})

const buildEsm = () => ({
  input,
  external,
  output: {
    file: packageJson.module,
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    resolve(resolveOptions),
    typescript(),
    babel(babelOptions),
    sourceMaps(),
  ],
})

export default [buildUmd(), buildCjs(), buildEsm()]
