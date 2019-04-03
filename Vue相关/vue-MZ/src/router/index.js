import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // require.ensure 是 Webpack 的特殊语法，用来设置 组件根路径 按需加载
  routes: [
    {
      path: '/',
      name: 'index',
      component (reslove) {
        require.ensure(['../App.vue'], () => {
          reslove(require('../App.vue'))// 完成调用
        })
      },
      children: [
        {
          path: '/welfare',
          name: 'welfare',
          component (reslove) {
            require.ensure(['../components/welfare/welfare.vue'], () => {
              reslove(require('../components/welfare/welfare.vue'))
            })
          }
        },
        {
          path: '/day',
          name: 'day',
          component (reslove) {
            require.ensure(['../components/recommend/recommend.vue'], () => {
              reslove(require('../components/recommend/recommend.vue'))
            })
          }
        },
        {
          path: '/android',
          name: 'android',
          component (reslove) {
            require.ensure(['../components/lists/android.vue'], () => {
              reslove(require('../components/lists/android.vue'))
            })
          }
        },
        {
          path: '/ios',
          name: 'ios',
          component (reslove) {
            require.ensure(['../components/lists/ios.vue'], () => {
              reslove(require('../components/lists/ios.vue'))
            })
          }
        },
        {
          path: '/web',
          name: 'web',
          component (reslove) {
            require.ensure(['../components/lists/web.vue'], () => {
              reslove(require('../components/lists/web.vue'))
            })
          }
        },
        {
          path: '/wecome',
          name: 'wecome',
          component (reslove) {
            require.ensure(['../components/wecome/wecome.vue'], () => {
              reslove(require('../components/wecome/wecome.vue'))
            })
          }
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})
