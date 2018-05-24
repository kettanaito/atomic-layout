const path = require('path')
const nodeEnv = process.env.NODE_ENV || 'production'

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  externals: {
    react: 'umd react',
    styled: 'umd styled-components',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname),
    library: 'atomicLayout',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/i,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
}
