<template>
  <div class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
    <a v-for="(data, index) in datas" :href="data.url" :key="index" target="view_window">
      <v-card :data="data"></v-card>
    </a>
  </div>
</template>

<script>
import vCard from '@/components/card/card'
import fetch from '@/untils/fetch'

export default {
  name: 'v-list',
  props: {
    type: {
      type: String
    }
  },
  data () {
    return {
      datas: [],
      page: 1,
      busy: false
    }
  },
  methods: {
    async loadTop () {
      this.$store.commit('UPDATE_LODING', true)
      let dataList = await fetch({
        url: `http://gank.io/api/data/${this.type}/10/${this.page}`
      })
      console.log(dataList.error)
      // this.datas = dataList.results
      if (!dataList.error) {
        this.datas = this.datas.concat(dataList.results)
        this.busy = false
        this.$nextTick(() => {
          this.$store.commit('UPDATE_LODING', false)
        })
      }
    },
    loadMore () {
      this.busy = true
      this.loadTop()
      this.page++
    }
  },
  components: {
    vCard
  }
}
</script>

<style lang="stylus">
.list {
  padding-top: 50px;
}
</style>

