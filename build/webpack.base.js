let webpack = require('webpack')
let path = require('path')
let scssLoaders = [
    { loader: 'vue-style-loader' },
    { loader: 'css-loader' },
    { loader: 'sass-loader', options: { sourceMap: true } }
]
let sassLoaders = [
    { loader: 'vue-style-loader' },
    { loader: 'css-loader' },
    { loader: 'sass-loader', options: { indentedSyntax: true } }
]

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  module: {
    rules: [ {
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('src'), resolve('example')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
    {
      test: /\.vue/,
      loader: 'vue-loader',
      options: {
        loaders: {
          scss: scssLoaders,
          sass: sassLoaders
        }
      }
    },
    {
      test: /\.(scss|sass)/,
      loader: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader', options: { sourceMap: true } }
      ]
    },
    {
      test: /\.(js|es6)/,
      loader: 'babel-loader',
      exclude: resolve('node_modules'),
      options: {
        cacheDirectory: true
      }
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.(html|tpl)$/,
      loader: 'html-loader'
    }]
  },
  resolve: {
    @: resolve('/src'),
    extensions: ['.js', '.vue', '.json', '.scss'],
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    }
  }
}
