<template>
  <div class="men-zheng rangle">
    <div class="title">近期热点疾病</div>
    <div class="chart">
      <v-chart :options="options"></v-chart>
    </div>
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

      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['发热', '慢性病'],
        formatter: function (name) {
          return name
        },
        textStyle: {
          color: 'white'
        },
        top: 3,
        show: true
      },

      calculable: true,


      xAxis:
      {
        // axisLabel: {
        //   rotate: 30,
        //   interval: 0
        // },
        axisLine: {
          lineStyle: {
            color: '#CECECE'
          }
        },
        axisLabel: {
          fontSize: 12
        },
        type: 'category',
        boundaryGap: false,
        data: ['6月', '7月', '8月', '9月', '10月', '11月']
      },
      yAxis: [
        {

          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#CECECE'
            },
            show: false
          },
          axisLabel: {
            fontSize: 12
          }

        }
      ],
      grid: {
        top: 30,
        left: 40,
        right: 20,
        bottom: 30,
      },
      series: [
        {
          name: '发热',
          type: 'line',
          symbol: 'circle',

          color: ['#02CDE6'],
          data: [240, 280, 130, 250, 120, 300]
        },
        {
          name: '慢性病',
          type: 'line',
          symbol: 'circle',

          color: ['#2480B4'],
          data: [190, 440, 60, 200, 480, 350]
        }
      ]
    };

  }
}
</script>
 
<style lang="scss" scoped>
.men-zheng {
  width: 100%;
  height: 100%;
  background-color: #091629;
  padding: 10px;
  box-sizing: border-box;

  .title {
    color: #117fbe;
    font-size: 16px;
    font-weight: bold;
  }
  .chart {
    width: 100%;
    height: 90%;

    .echarts {
      width: 100%;
      height: 100%;
    }
  }
}
</style>