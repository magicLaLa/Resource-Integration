# webpack4Practice

webpack4-practice

* npm i -D 是 npm install --save-dev 的简写，是指安装模块并保存到 package.json 的 devDependencies中，主要在开发环境中的依赖包

* webpack4中除了正常安装webpack之外，需要再单独安一个webpack-cli `npm i webpack webpack-cli -D`

* 启动devServer需要安装一下webpack-dev-server `npm i webpack-dev-server -D`

* 配置html模板，我们需要实现html打包功能，可以通过一个模板实现打包出引用好路径的html来,这就需要用到一个常用的插件了，html-webpack-plugin，用之前我们来安一下它

* 需要下载一些解析css样式的loader

        npm i style-loader css-loader -D
        // 引入less文件的话，也需要安装对应的loader
        npm i less less-loader -D

* 此时打包后的css文件是以行内样式style的标签写进打包后的html页面中，如果样式很多的话，我们更希望直接用link的方式引入进去，这时候需要把css拆分出来`extract-text-webpack-plugin`插件相信用过的人都知道它是干什么的，它的功效就在于会将打包到js里的css文件进行一个拆分，打包的html页面就以link的方式去引入css了

        // @next表示可以支持webpack4版本的插件
        npm i extract-text-webpack-plugin@next -D

* 引用图片处理图片方面，也需要loader`npm i file-loader url-loader -D` 如果是在css文件里引入的如背景图之类的图片，就需要指定一下相对路径

* 页面img引用图片页面中经常会用到img标签，img引用的图片地址也需要一个loader来帮我们处理好

        npm i html-withimg-loader -D

* 引用字体图片和svg图片，字体图标和svg图片都可以通过file-loader来解析

        file-loader

* 添加CSS3前缀通过postcss中的autoprefixer可以实现将CSS3中的一些需要兼容写法的属性添加响应的前缀，这样省去我们不少的时间，由于也是一个loader加载器，我们也需要先安装一下

        npm i postcss-loader autoprefixer -D

  安装后，我们还需要像webpack一样写一个config的配置文件，在项目根目录下创建一个postcss.config.js文件

* 转义ES6，在实际开发中，我们在大量的使用着ES6及之后的api去写代码，这样会提高我们写代码的速度，不过由于低版本浏览器的存在，不得不需要转换成兼容的代码，于是就有了常用的Babel了

        npm i babel-core babel-loader babel-preset-env babel-preset-stage-0 -D

  当把这些都安好后，我们就开始配置，由于要兼容的代码不仅仅包含ES6还有之后的版本和那些仅仅是草案的内容，所以我们可以通过一个.babelrc文件来配置一下，对这些版本的支持

* 在webpack4之前，提取公共代码都是通过一个叫CommonsChunkPlugin的插件来办到的。到了4以后，内置了一个一模一样的功能，而且起了一个好听的名字叫“优化”

* 在我们每次npm run build的时候都会在dist目录下创建很多打好的包，如果积累过多可能也会混乱，所以应该在每次打包之前将dist目录下的文件都清空，然后再把打好包的文件放进去，这里提供一个clean-webpack-plugin插件

        npm i clean-webpack-plugin -D

* 启动静态服务器
启动一个静态服务器，默认会自动刷新，就是说你对html,css,js文件做了修改并保存后，浏览器会默认刷新一次展现修改后的效果，正常情况下我们都是在开发环境中开发项目，所以之前配置的脚本"dev"可以派上用场了，在执行npm run dev命令后，会启动静态服务器，我们访问localhost:3000端口就可以看到开发的页面内容了，如果devServer里open设为true后，会自动打开浏览器，还需要在你想要实现热更新的js中添加代码

        // 还需要在主要的js文件里写入下面这段代码
        if (module.hot) {
        // 实现热更新
        module.hot.accept();
        }

* resolve解析，在webpack的配置中，resolve我们常用来配置别名和省略后缀名