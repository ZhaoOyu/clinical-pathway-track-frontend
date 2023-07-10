<template>
  <div class="file-share2" id="file-share"></div>
</template>
 
<script>
import * as echarts from 'echarts';
export default {
  data () {
    return {
    }
  },
  mounted () {

    var chartDom = document.getElementById('file-share');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      xAxis: {
        type: 'category',
        boundaryGap: false
      },
      title: {
        text: "文件共享"
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '30%']
      },
      // tooltip: {
      //   show: true,
      //   formatter (data) {
      //     console.log('data', data);
      //     return `共享${data.value}个文件`
      //   }
      // },
      visualMap: {
        type: 'piecewise',
        show: false,
        dimension: 0,
        seriesIndex: 0,
        pieces: [
          {
            gt: 1,
            lt: 3,
            color: 'rgba(0, 0, 180, 0.4)'
          },
          {
            gt: 5,
            lt: 7,
            color: 'rgba(0, 0, 180, 0.4)'
          },
          {
            gt: 8,
            lt: 10,
            color: 'rgba(0, 0, 180, 0.4)'
          }
        ]
      },
      series: [
        {
          type: 'line',
          smooth: 0.6,
          symbol: 'none',
          lineStyle: {
            color: '#5470C6',
            width: 5
          },
          markLine: {
            symbol: ['none', 'none'],
            label: { show: false },
            data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
          },
          areaStyle: {},
          data: [
            ['2022-06-17', 20],
            ['2022-06-18', 56],
            ['2022-06-19', 75],
            ['2022-06-20', 58],
            ['2022-06-21', 25],
            ['2022-06-22', 30],
            ['2022-06-23', 45],
            ['2022-06-24', 30],
            ['2022-06-25', 10],
            ['2022-06-26', 42],
            ['2022-06-27', 25],
            ['2022-06-28', 16],
            ['2022-06-29', 34],
          ]
        }
      ]
    };

    option && myChart.setOption(option);
  }
}
</script>
 
<style lang="scss" scoped>
.file-share2 {
  width: 100%;
  height: 100%;
}
</style>