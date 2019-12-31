<template>
  <div class="container">
    <div class="ooooooooo"></div>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },
  methods: {},
  created () {}
}
</script>

<style lang="scss" scoped>
// 雪碧图
@import '~_sprite-index.scss';

.ooooooooo {
   @include sprite(pay-zhifubao)
}
.counter {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
