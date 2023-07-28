<template>
  <div class="wrapper">
    <div class="drg-money" id="drg-money"></div>
    <el-tag effect="dark" size="mini" type="danger" @click="handleClick">详情</el-tag>
  </div>
</template>
 
<script>
import * as echarts from 'echarts';
import { getDoctorDrg } from "./../../api/center.js"
export default {
  data() {
    return {
      doctorDrg: [],
      month: [],
      phase: [],
      drg: [],
      pay: [],
    }
  },
  watch: {
    doctorDrg: {
      handler() {
        this.showMonth()
        this.showPhase()
        this.showDrg()
        this.showPay()
        this.draw()
      }
    }
  },
  created() {
    getDoctorDrg("王医生").then(res => {
      this.doctorDrg = res
    })

    //console.log('drg',this.doctorDrg)
  },
  mounted() {
    this.draw()
  },
  methods: {
    handleClick() {
      this.$router.push({
        path: "drg",
        query: {
          name: "王医生"
        }
      })
    },
    showMonth() {
      for (let i = 0; i < this.doctorDrg.length; i++) {
        if (this.doctorDrg[i].doctorName === '王医生') {
          this.month.push(this.doctorDrg[i].time)
        }
      }
    },
    showPhase() {
      for (let i = 0; i < this.doctorDrg.length; i++) {
        if (this.doctorDrg[i].doctorName === '王医生') {
          this.phase.push(this.doctorDrg[i].phase)
        }
      }
    },
    showDrg() {
      for (let i = 0; i < this.doctorDrg.length; i++) {
        if (this.doctorDrg[i].doctorName === '王医生') {
          this.drg.push(this.doctorDrg[i].drg)
        }
      }
    },
    showPay() {
      for (let i = 0; i < this.doctorDrg.length; i++) {
        if (this.doctorDrg[i].doctorName === '王医生') {
          this.pay.push(this.doctorDrg[i].payNumber)
        }
      }
    },
    draw() {
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
            data: this.phase,
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
            data: this.drg,
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
            data: this.pay,
            color: '#fac858'

          },


        ]
      };

      option && myChart.setOption(option);
    },
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