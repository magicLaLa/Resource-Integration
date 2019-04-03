// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import InfiniteScroll from 'vue-infinite-scroll'  // 引入滑动模块
import VueLazyload from 'vue-lazyload'
import MintUI from 'mint-ui'
import store from '@/vuex/store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { loadFromlLocal } from '@/common/js/store'
import 'mint-ui/lib/style.css'
import 'common/css/index.styl'
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper)
Vue.use(MintUI)
Vue.use(InfiniteScroll)
// error，loading是图片路径, 用require引入
/**
 * error（图片路径错误时加载图片）
 * loading（预加载图片）
 * attempt（尝试加载图片数量）
 */
Vue.use(VueLazyload, {
  error: require('./assets/404.png'),
  loading: require('./assets/loading.gif'),
  attempt: 1
})

Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  router,
  store
}).$mount('#app')

/**
 * loadFromlLocal()是读取本地缓存数据，具体common/js/store.js 查看
 */
if (!loadFromlLocal('gank', 'wecome', false)) {
  router.push('/wecome')
}

export default app
