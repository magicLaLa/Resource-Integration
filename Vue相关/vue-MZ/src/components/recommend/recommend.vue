<template>
  <swiper :options="swiperOption" class="top50">
    <swiper-slide v-for="(slide, index) in swiperSliders" :key="index">
      <v-day :data="slide"></v-day>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import vDay from '@/components/day/day'
import fetch from '@/untils/fetch.js'

const TAB_NAME = ['今天', '昨天', '前天', '三天前', '四天前']

export default {
  name: 'v-recommend',
  data () {
    return {
      swiperSliders: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet (index, className) {
            return `<div class="${className}">${TAB_NAME[index]}</div>`
          }
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide,
    vDay
  },
  methods: {
    async getSlideData () {
      let data = await fetch({
        url: 'http://gank.io/api/history/content/5/1'
      })
      if (data) {
        this.swiperSliders = data.results
        this.$nextTick(() => {
          this.$store.commit('UPDATE_LODING', false)
        })
      }
    }
  },
  created () {
    this.$store.commit('UPDATE_LODING', true)
    this.getSlideData()
  }
}
</script>

<style lang="stylus">
  .swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .swiper-item {
    height: 100%;
  }
  .swiper-pagination-bullet-custom {
    width: 100% !important;
    height: 100% !important;
    margin:0 !important;
    text-align: center;
    line-height: 50px;
    color: #999999;
    border-radius: 0 !important;
    background: #fff !important;
    opacity: 1 !important;
  }
  .swiper-pagination-bullet-custom,.swiper-pagination-bullet-active {
    color: #03a9f4;
    background: #fff;
    font-size: 20px
  }
  .swiper-pagination{
    top:50px;
    height:50px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width:100%;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0;
    flex: 1;
    display flex;
    align-items center;
    justify-content center;
    height: 100%;
    background: #fff;
  }
</style>

