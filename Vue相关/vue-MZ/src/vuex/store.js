import Vue from 'vue'
import Vuex from 'vuex'
// 导入整个模块 调用 actions.xxx
import * as actions from './actions'
import * as getters from './getters'
import * as uz from '@/common/js/uz'

Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
const state = {
  'headerTtitle': '首页',
  'menus': uz.NAME_TITLE,
  'menuShow': false,
  'loadingShow': false,
  'news': 5
}

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  // 放置我们的状态变更
  UPDATE_TITLE (state, title) {
    state.headerTtitle = title
  },
  UPDATE_MENUSHOW (state) {
    state.menuShow = !state.menuShow
  },
  UPDATE_LODING (state, boolean) {
    state.loadingShow = boolean
  },
  UPDATE_NEWS (state) {
    state.news = 0
  }
}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
