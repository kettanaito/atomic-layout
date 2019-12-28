import path from 'path'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import packageJson from './package.json'

const { NODE_ENV: nodeEnv } = process.env
const PRODUCTION = nodeEnv === 'production'
const __PROD__ = PRODUCTION ? 'true' : '""'

export default {
  input: packageJson.esnext,
  output: {
    file: path.resolve(__dirname, packageJson.main),
    format: 'cjs',
  },
  plugins: [
    resolve({
      mainFields: ['esnext'],
      extensions: ['.ts'],
    }),
    typescript(),
    replace({
      __PROD__,
    }),
  ],
}
