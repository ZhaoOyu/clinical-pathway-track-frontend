<template>
  <div class="jingdou" id="main"></div>
</template>
 
<script>
import echarts from 'echarts'

export default {
  data () {
    return {
      option: {}
    }
  },
  computed: {
    department () {
      return this.$store.state.yuanZhang.department
    },
    yuanZhang () {
      return this.$store.state.yuanZhang.jingdou
    }
  },
  watch: {
    department () {
      this.renderOptions(this.yuanZhang)
    }
  },
  mounted () {

    this.renderOptions(this.yuanZhang)
  },
  methods: {
    renderOptions (data) {
      console.log('data.denglu', data.denglu);
      this.option = {
        // darkMode: true,
        color: ['#4992ff', '#fddd60', '#ff6e76', '#7cffb2', '#58d9f9', '#05c091', '#ff8a45', '#8d48e3', '#dd79ff'],
        // backgroundColor: '#091629',
        title: {
          text: '文件共享',

        },
        textStyle: {
          // color: 'white',
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
          data: ['个人上传量', '个人下载量', '被下载量',],
          top: 30,
          textStyle: {
            // color: "white"
          }
        },

        grid: {
          left: '1%',
          right: '6%',
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
            name: '个人上传量',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: data.denglu
          },

          {
            name: '个人下载量',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: data.drg
          },
          {
            name: '被下载量',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: data.qita
          },


        ]
      };
      this.myChart = echarts.init(document.getElementById('main'), null);
      this.myChart.setOption(this.option)
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