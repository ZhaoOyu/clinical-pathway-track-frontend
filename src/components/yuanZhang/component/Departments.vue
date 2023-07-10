<template>
  <div class="style2 rangle" style="position: relative;" @click="$router.push('/patentInfo')">
    <div class="title">各科室项目占比</div>

    <!--<v-chart :options="options"></v-chart>-->
    <v-chart :options="options" style="position: absolute;top: 0;left: 0;"></v-chart>
    <v-chart :options="options2" style="position: absolute;top: 0;left: 0;"></v-chart>
  </div>
</template>

<script>
let mockData = [
  {
    legendname: "脊柱一科",
    value: 945,
    percent: "19%",
    itemStyle: {
      color: '#8FC31F'
    },
    name: "皮肤科 | 19%"
  },
  {
    legendname: "脊柱二科",
    value: 435,
    percent: "12%",
    itemStyle: {
      color: '#F35833'
    },
    name: "口腔科 | 12%",

  },
  {
    legendname: "骨科",
    value: 455,
    percent: "13%",
    itemStyle: {
      color: '#00CCFF'
    },
    name: "五官科 | 13%"
  },
  {
    legendname: "外科",
    value: 858,
    percent: "15%",
    itemStyle: {
      color: '#FFCC00'
    },
    name: "外科 | 15%"
  },
  {
    legendname: "内科",
    value: 888,
    percent: "14%",
    itemStyle: {
      color: '#A74FAF'
    },
    name: "内科 | 14%"

  },
  {
    legendname: "妇科",
    value: 1259,
    percent: "25%",
    itemStyle: {
      color: '#FF9668'
    },
    name: "妇科 | 25%"

  },
]
export default {
  data () {

    return {
      options: {},
      options2: {},
      chartEvents: null
    }
  },
  mounted () {
    this.chartEvents = {
      click (e) {
        console.log('e', e);
      }
    }
    this.options = {
      series: [{
        name: "category",
        type: 'pie',
        data: mockData,
        animation: true,
        radius: '80%',
        animationDuration: 1000,
        label: {
          normal: {
            show: true,
            //position:'inner',
            formatter: function (params) {
              const str = params.data.legendname + ':' + params.value
              return str
            },
            textStyle: {
              color: "#fff"
            },
          },
        },
        labelLine: {
          length: 2,
          normal: {
            length: 2,
            lineStyle: {
              color: '#FF9668'
            },
            smooth: 0.2,
          }
        },
        /* itemStyle: {
          borderWidth:4px
        }, */
        clockwise: true
      }],
      // legend: {
      //    type: 'scroll',
      //    orient: "vertical",
      //    height: 250,
      //    left: '60%',
      //    top: 'middle',
      //    textStyle: {
      //      color: "white"
      //    }
      //  },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          const str = params.marker + params.data.legendname + '</br>' + "数量: " + params.data.value + "</br>" + "占比:" + params.data.percent
          return str
        }
      },
      grid: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 10
      }
    }
    this.options2 = {
      series: [{
        name: "category",
        type: 'pie',
        data: mockData,
        animation: true,
        radius: '65%',
        animationDuration: 1000,
        label: {
          normal: {
            show: true,
            position: 'inner',
            formatter: function (params) {
              const str = params.percent + "%"
              return str
            },
            textStyle: {
              color: "#fff"
            },
          },
        },
        labelLine: {
          length: 2,

          normal: {
            length: 2,
            lineStyle: {
              color: '#FF9668',

            },
            smooth: 0.2,
          }
        },
        /* itemStyle: {
          borderWidth:4px
        }, */
        clockwise: true
      }],
      // legend: {
      //    type: 'scroll',
      //    orient: "vertical",
      //    height: 250,
      //    left: '60%',
      //    top: 'middle',
      //    textStyle: {
      //      color: "white"
      //    }
      //  },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          const str = params.marker + params.data.legendname + '</br>' + "数量: " + params.data.value + "</br>" + "占比:" + params.data.percent
          return str
        }
      }
    }
  },
  methods: {
    getInstance (instance) {
      console.log('instance', instance);
    }
  }
}
</script>

<style lang="scss" scoped>
.style2 {
  height: 100%;

  box-sizing: border-box;
  padding-top: 10px;
  padding-left: 10px;
  background-color: #091629;
  .title {
    color: #117fbe;
    font-size: 16px;
    font-weight: bold;
  }
  .echarts {
    width: 100%;
    height: 80%;
  }
}
</style>
