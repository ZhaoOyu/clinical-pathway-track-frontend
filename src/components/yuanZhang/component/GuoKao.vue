<template>
  <div class="guokao1">
    <div class="title">{{department}}国考指标分数</div>
    <div class="chart" @click="handleClick">
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
  computed: {
    department () {
      return this.$store.state.yuanZhang.department
    },
    yuanZhang () {
      return this.$store.state.yuanZhang.guokao
    }
  },
  watch: {
    department (department) {
      this.renderOptions(this.yuanZhang)
    }
  },
  mounted () {
    this.renderOptions(this.yuanZhang)

  },
  methods: {
    handleClick () {
      window.location.href = 'http://82.157.160.85:84/#/dashboard?hospital=医院A'
    },
    renderOptions (data) {
      this.options = {
        color: ['#4992ff', '#7cffb2', '#fddd60', '#ff6e76', '#58d9f9', '#05c091', '#ff8a45', '#8d48e3', '#dd79ff'],


        angleAxis: {
          type: 'category',
          data: ['2022', '2021', '2020', '2019', '2018', '2017', '2016']
        },
        textStyle: {
          color: 'white'
        },

        radiusAxis: {},
        polar: {},
        tooltip: {
          show: true
        },
        series: [
          {
            type: 'bar',
            data: data.zhiliang,
            coordinateSystem: 'polar',

            name: '医疗质量',
            stack: 'a',
            emphasis: {
              focus: 'series'
            }
          },
          {
            type: 'bar',
            data: data.manyidu,
            coordinateSystem: 'polar',
            name: '满意度',
            stack: 'a',
            emphasis: {
              focus: 'series'
            }
          },
          {
            type: 'bar',
            data: data.fazhan,
            coordinateSystem: 'polar',
            name: '持续发展',
            stack: 'a',
            emphasis: {
              focus: 'series'
            }
          },
          {
            type: 'bar',
            data: data.xiaolv,
            coordinateSystem: 'polar',
            name: '运营效率',
            stack: 'a',
            emphasis: {
              focus: 'series'
            }
          }
        ],
        legend: {
          show: true,
          data: ['医疗质量', '满意度', '持续发展', '运营效率'],
          textStyle: {
            color: 'white'
          },
          orient: "vertical",
          right: '0%',
          top: "18%",
          itemGap: 18
        },
      };

    }
  }
}
</script>
 
<style lang="scss" scoped>
.guokao1 {
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