<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>

    <div class="home" @click="backHome">去往首页</div>
  </div>
</template>

<script>
// Use Vuex
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['count'])
  },
  methods: {
    ...mapMutations(['increment', 'decrement']),
    backHome () {
      wx.navigateBack({
        // eslint-disable-next-line
          delta: getCurrentPages().length - 1
      })
    }
  }
}
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
