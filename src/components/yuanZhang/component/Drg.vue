
   
<template>
  <div class="block rangle">
    <div class="title">{{department}}DRG情况</div>
    <v-chart :options="options" @click="handleClick"></v-chart>
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: {}
    }
  },
  computed: {
    department () {
      return this.$store.state.yuanZhang.department
    },
    yuanZhang () {
      return this.$store.state.yuanZhang.drg
    }
  },
  watch: {
    department () {
      this.options = this.renderOptions(this.yuanZhang)
    }
  },
  methods: {
    handleClick () {
      this.$router.push({
        path: "/patentInfo",
        query: {
          department: this.department
        }
      })
    },
    renderOptions (data) {
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
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
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
            data: data.input
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
            data: data.output
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
            data: data.drg
          },

        ]
      }
    }
  },
  mounted () {
    this.options = this.renderOptions(this.yuanZhang)
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
