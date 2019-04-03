<template>
  <!-- el-scrollbar在elemnt官网上找不到这个组件，可以到elemnt的源码中可以看到
       element/src/index.js -> import Scrollbar from '../packages/scrollbar/index.js';
       element/packages/scrollbar/src/main.js:
       props: {
          native: Boolean,
          wrapStyle: {}, 外层盒子的样式
          wrapClass: {}, 外城盒子的class
          viewClass: {}, 内层盒子的class
          viewStyle: {}, 内层盒子的样式
          noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
          tag: {
            type: String, 所用标签，默认是 div
            default: 'div'
          }
      }
   -->
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in routes" :key="route.name" :item="route" :basePath="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    },
    routes () {
      // 可以在vue-router/flow/declarations.js这个文件下找到源码
      console.log('+++++++++', this.$router.options.routes)
      return this.$router.options.routes
    }
  }
}
</script>
