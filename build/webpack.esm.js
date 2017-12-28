let conf = require('./webpack.min')
let merge = require('webpack-merge')
let { resolve } = require('./helper')
let dist = resolve('lib')

const esm = merge(conf, {
  devtool: '#source-map',
  output: {
    path: dist,
    publicPath: '/lib/',
    libraryTarget: 'umd',
    filename: 'frame.esm.js',
    umdNamedDefine: true
  }
})

esm.plugins = esm.plugins.slice(0, -1)

module.exports = esm
