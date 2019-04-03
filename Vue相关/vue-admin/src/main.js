// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css' // 引入全局默认按需重置css样式

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss'

import echarts from 'echarts'

// import locale from 'element-ui/lib/locale/lang/en' // 进行多语言处理
import '@/icons'
import '@/permission'

Vue.prototype.$echarts = echarts // 将echarts注册成Vue的全局属性
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
