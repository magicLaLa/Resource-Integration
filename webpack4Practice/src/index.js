import './css/style.css'
// import './less/style.less'

import $ from 'jquery'
import { add } from './public/js/utils' 

let a = '这是一个练习';
document.body.innerHTML = a;
console.log('这是webpack打包的入口文件');
let b = add()

// 还需要在主要的js文件里写入下面这段代码
if (module.hot) {
  // 实现热更新
  module.hot.accept();
}
