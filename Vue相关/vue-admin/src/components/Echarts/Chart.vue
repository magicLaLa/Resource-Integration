<template>
  <div :id="id" :style="style"></div>
</template>

<script>
export default {
  name: 'Chart',
  data () {
    return {
      // echats实例
      chart: ''
    }
  },
  props: {
    id: {
      type: String
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    },
    option: {
      type: Object,
      required: true
    }
  },
  computed: {
    style () {
      return {
        width: this.width,
        height: this.height
      }
    }
  },
  watch: {
    // 数据刷新
    option: {
      handler (newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            this.chart.setOption(newVal)
          }
        } else {
          this.init()
        }
      },
      deep: true // 对象内部属性的监听，关键。
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.chart = this.$echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.option)
      // 根据窗口自适应
      window.addEventListener('resize', this.chart.resize)
    }
  }
}
</script>
