<template>
  <div class="welfare-wrapper top50" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="welfare-center">
      <figure v-show="leftData.length > 0" v-for="data in leftData" @click="selectDetails(data.createdAt)">
        <v-img :imgUrl="data.url"></v-img>
      </figure>
    </div>
    <div class="welfare-center">
      <figure v-show="rightData.length > 0" v-for="data in rightData" @click="selectDetails(data.createdAt)">
        <v-img :imgUrl="data.url"></v-img>
      </figure>
    </div>
    <v-details ref="details" :time="time" :detailsData="detailsData"></v-details>
  </div>
</template>

<script>
import vImg from '@/components/lazyloadimg/lazyimg'
import vDetails from '@/components/details/details'
import { objectDate } from '@/common/js/date'
import { Toast } from 'mint-ui'
import fetch from '@/untils/fetch'
export default {
  data () {
    return {
      leftData: [],
      rightData: [],
      busy: false,
      page: 1,
      detailsData: {},
      time: ''
    }
  },
  components: {
    vImg,
    vDetails
  },
  methods: {
    loadMore () {
      this.busy = true
      this.loadTop()
      this.page++
    },
    async loadTop () {
      this.$store.commit('UPDATE_LODING', true)
      let data = await fetch({
        url: `https://gank.io/api/data/福利/10/${this.page}`
      })
      let results = data.results
      if (results.length > 0) {
        let left = results.filter((data, i) => {
          return (i + 1) % 2 === 1
        })
        let right = results.filter((data, i) => {
          return (i + 1) % 2 !== 1
        })
        this.leftData = this.leftData.concat(left)
        this.rightData = this.rightData.concat(right)
        this.busy = false
        // $nextTick() 在dom 重新渲染完后执行
        this.$nextTick(() => {
          this.$store.commit('UPDATE_LODING', false)
        })
      } else {
        Toast('没有数据')
        this.$store.commit('UPDATE_LODING', false)
      }
    },
    async selectDetails (time) {
      this.time = time
      this.$store.commit('UPDATE_LODING', true)
      let object = objectDate(this.time)
      console.log(object)
      let data2 = await fetch({
        url: `http://gank.io/api/history/content/day/${object.Y}/${object.M}/${object.D}`
      })
      console.log('数据:' + data2)
      let results = data2.results
      if (results.length > 0) {
        this.detailsData = results[0]
        // 子组件中的方法
        this.$refs.details.show()
        this.$nextTick(() => {
          this.$store.commit('UPDATE_LODING', false)
        })
      } else {
        Toast('没有数据')
        this.$store.commit('UPDATE_LODING', false)
      }
    }
  }
}
</script>

<style lang="stylus">
@import './welfare.styl'
</style>

