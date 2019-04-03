<template>
  <div>
    <div class="page-cover" v-show="menuShow" @click="isShow"></div>
    <header class="header" :class="{'show': menuShow}" @click="isShow">
      <header class="bar bar-nav">
        <div class="pull-left">
          <span class="iconfont icon-fenlei"></span>
        </div>
        <div class="title">{{headerTtitle}}</div>
        <div class="pull-right">
          <span class="iconfont icon-sousuo_sousuo"></span>
        </div>
      </header>
    </header>
    <v-menu :show="menuShow"></v-menu>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import vMenu from '@/components/menu/menu'
export default {
  naem: 'Header',
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapState([
      'headerTtitle',
      'menuShow'
    ])
  },
  components: {
    vMenu
  },
  methods: {
    isShow () {
      this.$store.commit('UPDATE_MENUSHOW')
    }
  }
}
</script>


<style lang="stylus">
@import "header.styl"
</style>

