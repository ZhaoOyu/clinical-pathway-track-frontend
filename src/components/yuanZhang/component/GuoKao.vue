<template>
  <div class="guokao1">
    <div class="title">{{ department }}国考指标分数</div>
    <div class="chart" @click="handleClick">
      <v-chart :options="options"></v-chart>
    </div>
  </div>
</template>
 
<script>
import { getPresidentTotal, getPresidentGuokao, getPresidentDrgWarning, getPresidentDrgInfo, getPresidentDepartmentWarnings, getPresidentAppleRankDoctor, getPresidentAppleRankDepartment, getPresidentAppleNumber } from "./../../../api/yuanZhang.js"

export default {
  data() {
    return {
      options: {},
      presidentGuokao: [],
      quality: [],
      satisfaction: [],
      development: [],
      efficiency: [],
      year: [],
    }
  },
  computed: {
    department() {
      return this.$store.state.yuanZhang.department
    },
    yuanZhang() {
      return this.$store.state.yuanZhang.guokao
    }
  },
  watch: {
    department(department) {
      getPresidentGuokao(department).then(res => {
        this.presidentGuokao = res
      })


    },
    presidentGuokao: {
      handler() {
        this.getData()
        this.renderOptions()
        this.quality = []
        this.satisfaction = []
        this.development = []
        this.efficiency = []
        this.year = []
      }
    }
  },
  created() {
    getPresidentGuokao(this.department).then(res => {
      this.presidentGuokao = res
    })
  },
  mounted() {
    this.renderOptions()

  },
  methods: {
    handleClick() {
      window.location.href = 'http://82.157.160.85:84/#/dashboard?hospital=医院A'
    },
    renderOptions() {
      this.options = {
        color: ['#4992ff', '#7cffb2', '#fddd60', '#ff6e76', '#58d9f9', '#05c091', '#ff8a45', '#8d48e3', '#dd79ff'],


        angleAxis: {
          type: 'category',
          data: this.year
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
            data: this.quality,
            coordinateSystem: 'polar',

            name: '医疗质量',
            stack: 'a',
            emphasis: {
              focus: 'series'
            }
          },
          {
            type: 'bar',
            data: this.satisfaction,
            coordinateSystem: 'polar',
            name: '满意度',
            stack: 'a',
            emphasis: {
              focus: 'series'
            }
          },
          {
            type: 'bar',
            data: this.development,
            coordinateSystem: 'polar',
            name: '持续发展',
            stack: 'a',
            emphasis: {
              focus: 'series'
            }
          },
          {
            type: 'bar',
            data: this.efficiency,
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

    },
    getData() {
      for (let i = 0; i < this.presidentGuokao.length; i++) {
        this.quality.push(this.presidentGuokao[i].quality)
        this.satisfaction.push(this.presidentGuokao[i].satisfaction)
        this.development.push(this.presidentGuokao[i].development)
        this.efficiency.push(this.presidentGuokao[i].efficiency)
        this.year.push(this.presidentGuokao[i].year)
      }
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