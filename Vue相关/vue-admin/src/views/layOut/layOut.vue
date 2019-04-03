<template>
  <div class="appWrapper" :class="classObj">
    <div v-if="device==='mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <side-bar class="sidebar-container"></side-bar>
    <div class="main-container">
      <nav-bar></nav-bar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { NavBar, AppMain, SideBar } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  computed: {
    ...mapGetters([
      'sidebar',
      'device'
    ]),
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mixins: [ResizeMixin],
  components: {
    NavBar,
    AppMain,
    SideBar
  },
  methods: {
    ...mapActions(['CloseSideBar']),
    handleClickOutside () {
      this.CloseSideBar({ withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/mixin.scss";

.appWrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
