import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'

export default {
  input: 'src/index.js',
  external: ['react', 'styled-components'],
  output: {
    name: 'ReactGrid',
    file: 'index.js',
    format: 'umd',
    globals: {
      react: 'react',
      styled: 'styled-components',
    },
  },
  plugins: [
    resolve({
      extensions: ['.jsx', '.js'],
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
    minify({
      comments: false,
    }),
  ],
  treeshake: true,
}
