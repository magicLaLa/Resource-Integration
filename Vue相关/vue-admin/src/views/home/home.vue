<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>
    <!-- echarts -->
    <chart id="chart" :option="option"></chart>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Chart from '@/components/Echarts/Chart'

export default {
  name: 'home',
  data () {
    return {
      // 模拟接口请求的数据
      chartData: {
        xData: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        sData: [5, 20, 36, 10, 10, 70, 35]
      },
      // echart必选项
      option: {
        title: {
          text: 'vue-admin-Echarts'
        },
        legend: {
          data: ['访问人数']
        },
        yAxis: {},
        xAxis: {
          data: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        },
        series: [
          {
            name: '访问人数',
            type: 'line',
            data: [5, 20, 36, 10, 10, 70, 35]
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  components: {
    Chart
  },
  mounted () {
    this.refreshData()
  },
  methods: {
    refreshData () {
      let xData = this.chartData.xData
      let sData = this.chartData.sData
      for (let i = 0, b = xData.length; i < b; i++) {
        setTimeout(() => {
          this.option.xAxis.data.push(xData[i])
          this.option.series[0].data.push(sData[i])
        }, 1000 * i)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
