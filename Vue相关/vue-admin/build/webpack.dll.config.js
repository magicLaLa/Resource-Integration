const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    vendor: [
      'element-ui',
      'vue',
      'axios',
      'js-cookie',
      'nprogress',
      'vuex',
      'vue-router',
      'qs',
      'echarts'
    ]
  },
  output: {
    path: path.join(__dirname, '../static/js'),
    filename: '[name].dll.js', // vendor.dll.js中暴露出的全局变量名。
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.vendor_library`
    */
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      /**
       * path
       * 定义 manifest 文件生成的位置
       * [name]的部分由entry的名字替换
       */
      path: path.join(__dirname, '..', '[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    }),
    // 压缩打包的文件
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
