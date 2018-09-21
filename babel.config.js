module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        modules: false
      }
    ],
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
  plugins: [
    // '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-object-rest-spread',
  ],
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react']
    }
  }
}
