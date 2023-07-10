<template>
  <div class="style1 rangle">
    <div class="title">总收入项目分布（元）</div>
    <v-chart :options="options"></v-chart>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: {}
    }
  },
  mounted () {
    this.options = {
      grid: {
        top: '3%'
      },
      textStyle: {
        color: "#fff"
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      yAxis: {
        type: 'category',
        data: ['床位', '西药', '化验', '检查', '治疗', '材料'],
        inverse: true,
      },
      xAxis: {
        type: 'value',
      },

      series: [
        {
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
            }
          },
          label: {
            show: true,
            position: 'right'
          },
          data: [{
            value: 252294,
            itemStyle: {
              color: '#3a8ee6'
            }
          }, {
            value: 252294,
            itemStyle: {
              color: '#3a8ee6'
            }
          }, {
            value: 242310,
            itemStyle: {
              color: '#3a8ee6'
            }
          }, {
            value: 206128,
            itemStyle: {
              color: '#3a8ee6'
            }
          }, {
            value: 199655,
            itemStyle: {
              color: '#3a8ee6'
            }
          }, {
            value: 183620,
            itemStyle: {
              color: '#3a8ee6'
            }
          }],
          type: 'bar'
        }
      ],
      legend: {
        show: true
      },
    }
  }
}
</script>

<style lang="scss" scoped>
.style1 {
  height: 100%;

  box-sizing: border-box;
  padding-top: 10px;
  padding-left: 10px;
  background-color: #091629;
  .title {
    color: #117fbe;
    font-size: 16px;
    font-weight: bold;
  }
  .echarts {
    width: 100%;
    height: 100%;
  }
}
</style>
