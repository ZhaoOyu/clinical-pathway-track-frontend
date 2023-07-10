<template>
  <div class="block rangle">
    <div class="title">2021就医人数</div>
    <v-chart :options="options"></v-chart>
  </div>
</template>

<script>

export default{

    data(){
        return {
            options:{}
        }
    },
    methods: {
    renderOptions (data, axis) {
      return {
        xAxis: {
          type: 'category',
          data: axis,
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: 'white',
            fontSize: 11
          }
        },
        title: {

          textStyle: {
            fontSize: 12,
            color: '#666'
          },
          left: 25,
          top: 20
        },

        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#333'
            },
            show: true
          },
          axisLabel: {
            color: 'white',
            fontSize: 11,
            show: true


          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {

            return params.name + '就医人数为:' + params.data + '人次'
          }
        },
        series: [{
          type: 'line',
          animation: true,
          animationDuration: 2000,
          data,
          barWidth: "30%",
          label: {
            show: true,
            position: 'top',
            distance: 5,
            fontSize: 11,

            color: "#D7A717"
          }
        }, {
          type: 'bar',
          data,
          barWidth: "50%",
          animation: true,
          animationDuration: 2000,

          itemStyle: {
            barBorderRadius: [50, 50, 10, 10],

          }


        }],
        color: ['#B23231', '#009ECA', '#74fbf5', '#A3D2F6', '#B2EAC0',],
        grid: {
          top: 20,
          left: 40,
          right: 40,
          bottom: 30
        }
      }
    }
  },
  mounted () {
    this.groupData = [2867, 3219, 1901, 3566, 4355, 5420, 2907, 3278, 2200, 3350, 2140, 3540]
    this.xAxis = [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ]
    this.options = this.renderOptions(this.groupData, this.xAxis)
  }
}
</script>

<style lang='scss' scoped>
.block {
//   margin-top: 10px;
  height: 100%;
  background-color: #091629;
  padding: 10px;
  box-sizing: border-box;
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
