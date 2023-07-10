<template>
  <div class="trans-list rangle">
    <div class="title">各科室门诊预约 vs 到诊人数</div>
    <div class="wrapper">
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
        trigger: 'axis',
        color: '#fff',

        textStyle: {
          color: '#fff'
        },
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
      },
      legend: {

        textStyle: {
          color: '#fff'
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: ['口腔科', '五官科', '外科', '内科', '妇科', '皮肤科'],
        axisLabel: {
          color: '#fff'
        }
      },
      label: {
        color: '#fff'
      },
      series: [
        {
          name: '到诊人数',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [1320, 1302, 1301, 1334, 1390, 1330, 1320],
          color: '#5087EC'
        },
        {
          name: '预约人数',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          color: '#68BBC4',

          data: [1340, 1322, 1321, 1444, 1410, 1360, 1380],

        }
      ]
    };
  }
}
</script>
<style lang="scss" scoped>
.trans-list {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: bold;
  .title {
    width: 100%;
    height: 10%;
    color: #117fbe;
  }
  .wrapper {
    width: 100%;
    height: 90%;
    .echarts {
      width: 100%;
      height: 100%;
    }
  }
}
</style>