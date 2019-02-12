const path = require('path')
const webpack = require('webpack')
const myLocalIp = require('my-local-ip')()
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 拆分css样式的插件
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
// 每次打包之前将dist目录下的文件都清空
const CleanWebpackPlugin = require('clean-webpack-plugin')

// 多入口
module.exports = {
  // 1.写成数组的方式就可以打出多入口文件，不过这里打包后的文件都合成了一个
  // entry: ['./src/index.js', './src/login.js'],
  // 2.真正实现多入口和多出口需要写成对象的方式
  entry: { // 入口文件
    index: './src/index.js',
    login: './src/login.js'
  },
  output: { // 出口文件
    // filename: 'bundle.js', // 打包后的文件目录
    // [name]就可以将出口文件名和入口文件名一一对应
    filename: 'js/[name].js',
    path: path.resolve('dist') // 打包后的目录，必须是绝对路径
  },
  resolve: {
    // 别名
    alias: {
      $: './src/jquery.js'
    },
    // 省略后缀
    extensions: ['.js', '.json', '.css']
  },
  module: { // 处理对应模块
    rules: [
      {
        test: /\.(css|less)$/, // 解析css
        // use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'] // 从左向右解析
        use: ExtractTextWebpackPlugin.extract({
          // 将css用link的方式引入就不再需要style-loader了
          use: ['css-loader', 'postcss-loader'],
          publicPath: '../'
        })
        /**
         *  也可以这样写，这种方式方便写一些配置参数
            use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'}
            ]
         */
      },
      { // 背景图
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 80, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
              outputPath: 'images/' // 图片打包后存放的目录
            }
          }
        ]
      },
      { // 页面img中引用图片
        test: /\.(htm|html)$/,
        use: 'html-withimg-loader'
      },
      { // 引用字体图片和svg图片
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: /src/,// 只转化src目录下的js
        exclude: /node_modules/ // 排除掉node_modules，优化打包速度
      }
    ]
  },
  optimization: { // 提取公共代码
    splitChunks: {
      cacheGroups: {
        vendor: {
          //  抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor', // 打包后的文件名，任意命名
          priority: 10 // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
        },
        utils: {
          // 抽离自己写的公共代码，utils这个名字可以随意起
          chunks: 'initial',
          name: 'utils', // 任意命名
          minSize: 0 // 只要超出0字节就生成一个新包
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index', 'vendor', 'utils'] // 对应关系,index.js对应的是index.html
    }),
    new HtmlWebpackPlugin({
      template: './src/login.html',
      filename: 'login.html',
      chunks: ['login', 'vendor', 'utils'] // 对应关系,login.js对应的是login.html
    }),
    // 打包前先将dist目录下的文件都清空
    new CleanWebpackPlugin('dist'),
    // 热替换，热替换不是刷新
    new webpack.HotModuleReplacementPlugin(),
    // 拆分后会把css文件放到dist目录下的css/style.css
    new ExtractTextWebpackPlugin('css/style.css')
  ], // 对应的插件
  devServer: {
    contentBase: './dist',
    host: myLocalIp,      // 默认是localhost
    port: 3000,             // 端口
    open: true,             // 自动打开浏览器
    hot: true               // 开启热更新
  }, // 开发服务器配置
  mode: 'development' // 模式配置
}
