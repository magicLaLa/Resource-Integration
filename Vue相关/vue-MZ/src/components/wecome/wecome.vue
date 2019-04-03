<template>
  <div class="wecome">
        <div class="loader-inner pacman">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
  </div>
</template>

<script>
import { saveToLocal } from '@/common/js/store'
export default {
  data () {
    return {}
  },
  mounted () {
    setTimeout(() => {
      this.$router.push({
        name: 'welfare'
      })
      saveToLocal('gank', 'wecome', true)
    }, 2000)
  }
}
</script>

<style lang="stylus">
@import 'wecome.styl'
</style>

