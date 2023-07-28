<template>
  <div class="jingdou" id="main"></div>
</template>
 
<script>
import echarts from 'echarts'
import { getPresidentTotal, getPresidentGuokao, getPresidentDrgWarning, getPresidentDrgInfo, getPresidentDepartmentWarnings, getPresidentAppleRankDoctor, getPresidentAppleRankDepartment, getPresidentAppleNumber } from "./../../../api/yuanZhang.js"
import { getAdviceById } from '@/api/my-template'

export default {
  data() {
    return {
      option: {},
      presidentAppleNumber: [],
      login: [],
      drg: [],
      share: [],
      deduct: [],
      other: []
    }
  },
  computed: {
    department() {
      return this.$store.state.yuanZhang.department
    },
    yuanZhang() {
      return this.$store.state.yuanZhang.jingdou
    }
  },
  watch: {
    department() {
      getPresidentAppleNumber(this.department).then(res => {
        this.presidentAppleNumber = res
      })


    },
    presidentAppleNumber: {
      handler() {
        this.getData()
        this.renderOptions()
        this.login = []
        this.share = []
        this.drg = []
        this.deduct = []
        this.other = []
      }
    }
  },
  created() {
    getPresidentAppleNumber(this.department).then(res => {
      this.presidentAppleNumber = res
    })
    this.getData()
  },
  mounted() {

    this.renderOptions()
  },
  methods: {
    renderOptions() {
      // console.log('data.denglu', data.denglu);
      this.option = {
        darkMode: true,
        color: ['#4992ff', '#fddd60', '#ff6e76', '#7cffb2', '#58d9f9', '#05c091', '#ff8a45', '#8d48e3', '#dd79ff'],
        backgroundColor: '#091629',
        title: {
          text: this.department + '近半年平安果产生数',
          textStyle: {
            fontSize: 18,
            color: '#117fbe'
          }
        },
        textStyle: {
          color: 'white',
          fontFamily: 'Microsoft YaHei',
          fontSize: 12,

        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['每日签到', 'DRG控费', '文件共享', '异常扣除', '其他'],
          top: 30,
          textStyle: {
            color: "white"
          }
        },

        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '每日签到',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: this.login
          },

          {
            name: 'DRG控费',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: this.drg
          },
          {
            name: '异常扣除',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: this.deduct
          },
          {
            name: '其他',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: this.other
          },
          {
            name: '文件共享',
            type: 'line',
            stack: 'Total',
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: this.share
          },

        ]
      };
      this.myChart = echarts.init(document.getElementById('main'), null);
      this.myChart.setOption(this.option)
    },

    getData() {
      for (let i = 0; i < this.presidentAppleNumber.length; i++) {
        this.login.push(this.presidentAppleNumber[i].login)
        this.share.push(this.presidentAppleNumber[i].share)
        this.deduct.push(this.presidentAppleNumber[i].deduct)
        this.drg.push(this.presidentAppleNumber[i].drg)
        this.other.push(this.presidentAppleNumber[i].other)

      }
    }
  }
}
</script>
 
<style lang="scss" scoped>
#main {
  width: 100%;
  height: 100%;
}
</style>