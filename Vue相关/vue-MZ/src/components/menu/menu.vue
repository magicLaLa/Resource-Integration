<template>
  <div class="menu">
    <div class="menu-list" :class="{'show': show}">
      <div class="menu-header" @click="back">
        <img class="menu-avatar" :src="imgUrl" alt="">
        <div class="menu-title">小贱贱</div>
      </div>
      <div class="menu-ul">
        <div v-for="(menu, index) in menus" @click="upadataHeader(MENU_CONVERT[menu], menu)" :key="index">
          <router-link class="iocn-quanbu iconfont item border-1px" :to="menu">
            <div class="menu-icon">
              <i class="iconfont" :class="'icon-' + menu"></i>
            </div>
            <span class="menu-text">{{MENU_CONVERT[menu]}}</span>
            <div class="menu-new" v-show="menu === 'day' && news > 0">
              <span>5</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="menu-other"></div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
const MENU_CONVERT = { 'welfare': '福利', 'day': '每日推荐', 'ios': 'IOS', android: 'Android', web: '前端' }
export default {
  name: 'Menu',
  props: {
    show: {
      type: Boolean
    }
  },
  data () {
    return {
      MENU_CONVERT: MENU_CONVERT,
      imgUrl: 'https://avatars1.githubusercontent.com/u/23513387?s=400&u=c120890f81f387807628d96d1b6511aafd1450fc&v=4'
    }
  },
  computed: {
    ...mapState([
      'menus',
      'news'
    ])
  },
  methods: {
    upadataHeader (title, menu) {
      this.$store.commit('UPDATE_TITLE', title)
      this.$store.commit('UPDATE_MENUSHOW')
      if (menu === 'day') {
        this.$store.commit('UPDATE_NEWS')
      }
    },
    back () {
      this.$router.push('/')
      this.$store.commit('UPDATE_MENUSHOW')
      this.$store.commit('UPDATE_TITLE', '首页')
    }
  }
}
</script>


<style lang="stylus">
@import './menu.styl'
</style>

