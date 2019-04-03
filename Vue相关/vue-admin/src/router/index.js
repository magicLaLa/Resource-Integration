import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layOut/LayOut'

Vue.use(Router)

// 无权限的页面
const onstantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login'),
    hidden: true
  },
  {
    path: '/404',
    name: 'page404',
    component: () => import('@/views/404/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'Home',
    hidden: true,
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/home')
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'form',
        name: 'Form',
        component: () => import('@/views/form/form'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'nested',
    meta: {
      title: 'nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'menu1',
        meta: { title: 'menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'menu1-1',
            meta: { title: 'menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'menu1-2',
            meta: { title: 'menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'menu1-2-1',
                meta: { title: 'menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'menu1-2-2',
                meta: { title: 'menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'menu1-3',
            meta: { title: 'menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  }
]

export default new Router({
  // 滚动行为
  scrollBehavior: () => ({y: 0}),
  routes: onstantRouterMap
})
