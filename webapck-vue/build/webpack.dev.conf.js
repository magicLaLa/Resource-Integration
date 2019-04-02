const webpack = require('webpack')
const merge = require("webpack-merge")
// const path = require("path")
const baseConfig = require('./webpack.base.conf')
const config = require('../config')
const myLocalIp = require('my-local-ip')()

let {
  port,
  errorOverlay,
  assetsPublicPath,
  poll,
  devtool
} = config.dev

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool,
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    open: true,
    port,
    host: myLocalIp,
    compress: true, // 一切服务都启用 gzip 压缩
    overlay: errorOverlay ? {
      warnings: false,
      errors: true
    } : false,
    publicPath: assetsPublicPath,
    watchOptions: {
      poll
    }
  }
})