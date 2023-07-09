<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { getToken } from '@/utils/auth'
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.$http.get(process.env.TEST_LOCAL + '/extension', { headers: { 'Authorization': getToken() }})
        .then(function(response) {
          this.chart = echarts.init(this.$el, 'macarons')

          this.chart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              left: 'center',
              bottom: '10',
              data: ['Expert', 'Forget', 'Vague']
            },
            calculable: true,
            series: [
              {
                name: 'Progress',
                type: 'pie',
                roseType: 'radius',
                radius: [15, 95],
                center: ['50%', '38%'],
                data: [
                  { value: response.data.expert, name: 'Expert' },
                  { value: response.data.forget, name: 'Forget' },
                  { value: response.data.vague, name: 'Vague' }
                ],
                animationEasing: 'cubicInOut',
                animationDuration: 2600
              }
            ]
          })
        })
      // var k = this.accounts.total
    }
  }
}
</script>
