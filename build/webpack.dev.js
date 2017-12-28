let webpack = require('webpack')
let path = require('path')
let merge = require('webpack-merge')
let baseConfig = require('./webpack.base')
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
let InjectHtmlPlugin = require('inject-html-webpack-plugin')
let { resolve } = require('./helper')
let chalk = require('chalk')
let ProgressBarPlugin = require('progress-bar-webpack-plugin')
module.exports = merge(baseConfig, {
  module: {
    rules: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  },
  entry: {
    main: ['./example/main.js'],
    vendor: ['vue', 'vue-router']
  },
  output: {
    path: resolve('example/dist')
  },
  devtool: '#source-map',
  devServer: {
    contentBase: [resolve('example'), resolve('node_modules')],
    compress: true,
    historyApiFallback: true,
    noInfo: true
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
    new InjectHtmlPlugin({
      chunks: ['vendor', 'main'],
      more: {
        css: ['./aid-elements/dist/css/aid.min.css'] // contentBase:node_modules
      },
      filename: resolve('example/index.html'),
      template: resolve('example/index.html'),
      inject: true
    }),
    new ProgressBarPlugin({
      format: 'Building bundle [:bar] ' + chalk.green.bold(':percent'),
      clear: false,
      summary: false
    }),
    new FriendlyErrorsPlugin({ clearConsole: true })
  ]
})
