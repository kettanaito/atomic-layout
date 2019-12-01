import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import packageJson from './package.json'

export default {
  input: packageJson.esnext,
  output: {
    file: path.resolve(__dirname, packageJson.main),
    format: 'esm',
  },
  plugins: [
    resolve({
      mainFields: ['esnext'],
      extensions: ['.ts'],
    }),
    typescript(),
  ],
}
