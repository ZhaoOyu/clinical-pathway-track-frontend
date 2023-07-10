<template>
  <div class="wrapper">
    <div class="drg-money" id="drg-money"></div>
    <el-tag effect="dark" size="mini" type="danger" @click="handleClick">详情</el-tag>
  </div>
</template>
 
<script>
import * as echarts from 'echarts';
export default {
  data () {
    return {
    }
  },
  mounted () {
    var chartDom = document.getElementById('drg-money');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: "DRG控费"
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['盈亏', 'DRG', '实际支出',]
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'value'
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: {
            show: false
          },
          data: ['六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        }
      ],
      series: [
        {
          name: '盈亏',
          type: 'bar',
          label: {
            show: true,
            position: 'inside'
          },
          emphasis: {
            focus: 'series'
          },
          data: [200, 170, 240, 244, 200, 220, 210],
          color: "#5470c6"
        },
        {
          name: 'DRG',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 302, 341, 374, 390, 450, 420],
          color: '#91cc75'
        },
        {
          name: '实际支出',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            position: 'left'
          },
          emphasis: {
            focus: 'series'
          },
          data: [-120, -132, -101, -134, -190, -230, -210],
          color: '#fac858'

        },


      ]
    };

    option && myChart.setOption(option);

  },
  methods: {
    handleClick () {
      this.$router.push({
        path: "drg",
        query: {
          name: "王医生"
        }
      })
    }
  }
}
</script>
 
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .drg-money {
    width: 100%;
    height: 100%;
  }
  .el-tag {
    position: absolute;
    right: 14px;
    cursor: pointer;
    top: 2px;
  }
}
</style>