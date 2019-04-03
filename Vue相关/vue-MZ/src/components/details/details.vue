<template>
  <transition name="fade">
    <div class="details" v-show="showFlag">
      <div>
        <header class="header">
          <header class="bar bar-nav" @click="hide">
            <div class="pull-left">
              <span class="iconfont icon-left"></span>
            </div>
            <div class="title">{{detailsData.publicshedAt || time | formatDate}}</div>
          </header>
        </header>
        <Day :data="detailsData" ref="day"></Day>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import { formatDate } from '@/common/js/date'
import Day from '@/components/day/day'
export default {
  name: 'Details',
  data () {
    return {
      showFlag: false
    }
  },
  props: {
    time: {
      type: String
    },
    detailsData: {
      type: Object
    }
  },
  components: {
    Day
  },
  methods: {
    show () {
      this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$el, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
        this.$refs.day.clearStyle()
      })
    },
    hide () {
      this.showFlag = false
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>


<style lang="stylus">
@import './details.styl'
</style>

