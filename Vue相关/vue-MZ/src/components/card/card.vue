<template>
  <div class="card">
    <img v-lazy="data.images?data.images[0]+'?imageView2/0/w/200':null" class="img">
    <div class="card-content">
      <div class="desc">{{data.desc}}</div>
      <div class="card-content-bottom">
        <div class="who">{{data.who}}</div>
        <div class="time">{{getTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-card',
  props: {
    data: {
      type: Object
    }
  },
  data () {
    return {
      time: this.data.publishedAt
    }
  },
  computed: {
    getTime: function () {
      return this.time.substring(0, 10)
    }
  }
}
</script>

<style lang="stylus">
@import 'card.styl'
</style>


