
   
<template>
  <div class="block rangle">
    <div class="title">{{ department }}DRG情况</div>
    <v-chart :options="options" @click="handleClick"></v-chart>
  </div>
</template>

<script>
import { getPresidentTotal, getPresidentGuokao, getPresidentDrgWarning, getPresidentDrgInfo, getPresidentDepartmentWarnings, getPresidentAppleRankDoctor, getPresidentAppleRankDepartment, getPresidentAppleNumber } from "./../../../api/yuanZhang.js"
export default {
  data() {
    return {
      options: {},
      presidentDrgInfo: {},
      month: [],
      drg: [],
      input: [],
      output: [],
    }
  },
  computed: {
    department() {
      return this.$store.state.yuanZhang.department
    },
    yuanZhang() {
      return this.$store.state.yuanZhang.drg
    }
  },
  watch: {
    department() {
      getPresidentDrgInfo(this.department).then(res => {
        this.presidentDrgInfo = res
      })


    },
    presidentDrgInfo: {
      handler() {
        this.putPresidentDrgInfo()
        this.options = this.renderOptions()
        this.month = []
        this.drg = []
        this.input = []
        this.output = []
      }

    }
  },
  created() {
    getPresidentDrgInfo(this.department).then(res => {
      this.presidentDrgInfo = res
    })
  },
  methods: {
    handleClick() {
      this.$router.push({
        path: "/patentInfo",
        query: {
          department: this.department
        }
      })
    },
    renderOptions(data) {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['DRG', '实际支出', '盈亏'],
          textStyle: {
            color: "white"
          }
        },
        grid: {
          left: '4%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        textStyle: {
          color: "#fff"
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            data: this.month
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'DRG费用（万）'
          },

        ],
        series: [
          {
            name: 'DRG',
            type: 'bar',
            stack: 'Total',
            color: '#4992ff',
            label: {
              show: true
            },
            tooltip: {
              valueFormatter: function (value) {
                return value + '万';
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: this.drg
          },
          {
            name: '实际支出',
            type: 'bar',
            stack: 'Total',
            color: '#ec3333',
            label: {
              show: true
            },
            tooltip: {
              valueFormatter: function (value) {
                return value + '万';
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: this.output
          },
          {
            name: '盈亏',
            type: 'line',
            color: "#74fbf5",
            yAxisIndex: 0,
            tooltip: {
              valueFormatter: function (value) {
                return value + '万';
              }
            },
            data: this.input
          },

        ]
      }
    },
    putPresidentDrgInfo() {
      for (let i = 0; i < this.presidentDrgInfo.length; i++) {
        this.month.push(this.presidentDrgInfo[i].month)
        this.drg.push(this.presidentDrgInfo[i].drg)
        this.input.push(this.presidentDrgInfo[i].phase)
        this.output.push(this.presidentDrgInfo[i].output)
      }
    },
  },
  mounted() {
    this.options = this.renderOptions()
  }
}
</script>

<style lang="scss" scoped>
.block {
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

  .echarts {
    width: 100%;
    height: 100%;
  }
}
</style>
