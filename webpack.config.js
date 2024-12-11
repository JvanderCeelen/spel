const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    'script': './src/js/script.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ]
  }
}