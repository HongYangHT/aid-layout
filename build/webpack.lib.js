let webpack = require('webpack')
let merge = require('webpack-merge')
let baseConfig = require('./webpack.base')
let path = require('path')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let UglifyPlugin = require('uglifyjs-webpack-plugin')
let { resolve } = require('./helper')
let entry = [resolve('src/index.js')]
let dist = resolve('lib')
baseConfig.module.rules = baseConfig.module.rules.slice(2)
module.exports = merge(baseConfig, {
  module: {
    rules: [{
      test: /\.vue/,
      loader: 'vue-loader',
      options: {
        loaders: {
          scss: ExtractTextPlugin.extract({
            use: [
              { loader: 'css-loader' },
              { loader: 'sass-loader', options: { sourceMap: true } }
            ],
            fallback: 'vue-style-loader'
          }),
          sass: ExtractTextPlugin.extract({
            use: [
              { loader: 'css-loader' },
              { loader: 'sass-loader', options: { indentedSyntax: true } }
            ],
            fallback: 'vue-style-loader'
          })
        }
      }
    },
    {
      test: /\.(scss|sass)/,
      loader: ExtractTextPlugin.extract({
        use: [
          { loader: 'css-loader' },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ],
        fallback: 'style-loader'
      })
    },
    {
      test: /\.(css)/,
      loader: ExtractTextPlugin.extract({
        use: [{ loader: 'css-loader' }],
        fallback: 'style-loader'
      })
    }]
  },
  entry,
  devtool: false,
    // devtool: '#cheap-eval-source-map',
  output: {
    path: dist,
    publicPath: '/lib/',
    libraryTarget: 'umd',
    filename: 'frame.all.js',
    umdNamedDefine: true
  },
  performance: {
    hints: false
  },
  stats: {
    chunks: false,
    version: false,
    colors: true
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin('frame.css'),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      sourceMap: false,
      output: {
        comments: false
      }
    })
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ]
})
