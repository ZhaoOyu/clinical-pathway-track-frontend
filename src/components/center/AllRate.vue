<template>
  <div class="all-rate" id="all-rate"></div>
</template>
 
<script>
import * as echarts from 'echarts';
import { getDoctorIndex } from "./../../api/center.js"
export default {
  data() {
    return {
      doctorIndex: [],
      tempBJ: [],
      tempSH: [],
      dataBJ: [],
      dataSH: [],
    }
  },
  methods: {
    dataBJGet() {
      for (let i = 0; i < this.doctorIndex.length; i++) {

        if (this.doctorIndex[i].time === 1) {
          this.tempBJ.push(this.doctorIndex[i].warningIndex)
          this.tempBJ.push(this.doctorIndex[i].appleIndex)
          this.tempBJ.push(this.doctorIndex[i].shareIndex)
          this.tempBJ.push(this.doctorIndex[i].drgIndex)
          this.tempBJ.push(this.doctorIndex[i].honorIndex)
          this.tempBJ.push(this.doctorIndex[i].patientIndex)
          this.tempBJ.push(i + 1)

          this.dataBJ.push(this.tempBJ)
          this.tempBJ = []
        }
      }
    },
    dataSHGet() {
      for (let i = 0; i < this.doctorIndex.length; i++) {
        if (this.doctorIndex[i].time === 0) {
          this.tempSH.push(this.doctorIndex[i].warningIndex)
          this.tempSH.push(this.doctorIndex[i].appleIndex)
          this.tempSH.push(this.doctorIndex[i].shareIndex)
          this.tempSH.push(this.doctorIndex[i].drgIndex)
          this.tempSH.push(this.doctorIndex[i].honorIndex)
          this.tempSH.push(this.doctorIndex[i].patientIndex)
          this.tempSH.push(i + 1)

          this.dataSH.push(this.tempSH)
          this.tempSH = []
        }

      }
    },
    draw() {
      var chartDom = document.getElementById('all-rate');
      var myChart = echarts.init(chartDom);
      var option;
      console.log(this.dataBJ)
      // Schema:
      //let dataBJ = []
      // let tempBJ = []

      //let dataSH = []
      // let tempSH = []


      const dataGZ = [
        [26, 37, 27, 1.163, 27, 13, 1],
        [85, 62, 71, 1.195, 60, 8, 2],
        [78, 38, 74, 1.363, 37, 7, 3],
        [21, 21, 36, 0.634, 40, 9, 4],
        [41, 42, 46, 0.915, 81, 13, 5],
        [56, 52, 69, 1.067, 92, 16, 6],
        [64, 30, 28, 0.924, 51, 2, 7],
        [55, 48, 74, 1.236, 75, 26, 8],
        [76, 85, 113, 1.237, 114, 27, 9],
        [91, 81, 104, 1.041, 56, 40, 10],
        [84, 39, 60, 0.964, 25, 11, 11],
        [64, 51, 101, 0.862, 58, 23, 12],
        [70, 69, 120, 1.198, 65, 36, 13],
        [77, 105, 178, 2.549, 64, 16, 14],
        [109, 68, 87, 0.996, 74, 29, 15],
        [73, 68, 97, 0.905, 51, 34, 16],
        [54, 27, 47, 0.592, 53, 12, 17],
        [51, 61, 97, 0.811, 65, 19, 18],
        [91, 71, 121, 1.374, 43, 18, 19],
        [73, 102, 182, 2.787, 44, 19, 20],
        [73, 50, 76, 0.717, 31, 20, 21],
        [84, 94, 140, 2.238, 68, 18, 22],
        [93, 77, 104, 1.165, 53, 7, 23],
        [99, 130, 227, 3.97, 55, 15, 24],
        [146, 84, 139, 1.094, 40, 17, 25],
        [113, 108, 137, 1.481, 48, 15, 26],
        [81, 48, 62, 1.619, 26, 3, 27],
        [56, 48, 68, 1.336, 37, 9, 28],
        [82, 92, 174, 3.29, 0, 13, 29],
        [106, 116, 188, 3.628, 101, 16, 30],
        [118, 50, 0, 1.383, 76, 11, 31]
      ];
      const lineStyle = {
        width: 1,
        opacity: 0.5
      };
      option = {
        backgroundColor: '#FFFFFF',

        legend: {
          data: ['本季度情况', '上季度情况', '指标标准'],
          itemGap: 20,
          textStyle: {
            color: '#000000',
            fontSize: 12
          },
          selectedMode: 'single',
          top: "93%"
        },
        title: {
          text: "全面指标概览"
        },
        tooltip: {
          show: true
        },

        radar: {
          indicator: [
            { name: '预警数量指标', max: 300 },
            { name: '患者评价指标', max: 250 },
            { name: '荣誉奖励指标', max: 300 },
            { name: 'DRG指标', max: 5 },
            { name: '共享文件指标', max: 200 },
            { name: '平安果指标', max: 100 }
          ],
          shape: 'circle',
          splitNumber: 5,
          axisName: {
            color: '#000000'
          },
          splitLine: {
            lineStyle: {
              color: [
                'rgba(238, 197, 102, 0.1)',
                'rgba(238, 197, 102, 0.2)',
                'rgba(238, 197, 102, 0.4)',
                'rgba(238, 197, 102, 0.6)',
                'rgba(238, 197, 102, 0.8)',
                'rgba(238, 197, 102, 1)'
              ].reverse()
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#000000'
            }
          }
        },
        series: [
          {
            name: '本季度情况',
            type: 'radar',
            lineStyle: lineStyle,
            data: this.dataBJ,
            symbol: 'none',
            itemStyle: {
              color: '#409EFF'
            },
            areaStyle: {
              opacity: 0.1
            }
          },
          {
            name: '上季度情况',
            type: 'radar',
            lineStyle: lineStyle,
            data: this.dataSH,
            symbol: 'none',
            itemStyle: {
              color: '#E6A23C'
            },
            areaStyle: {
              opacity: 0.05
            }
          },
          {
            name: '指标标准',
            type: 'radar',
            lineStyle: lineStyle,
            data: dataGZ,
            symbol: 'none',
            itemStyle: {
              color: '#608E31'
            },
            areaStyle: {
              opacity: 0.05
            }
          }
        ]
      };

      option && myChart.setOption(option);
    },
  },
  watch: {
    doctorIndex: {
      handler() {
        this.dataBJGet()
        this.dataSHGet()
        this.draw()
      }
    },
  },
  created() {
    getDoctorIndex("王医生").then(res => {
      this.doctorIndex = res
    }
    )
  },
  mounted() {
    this.draw()
  }
}
</script>
 
<style lang="scss" scoped>
.all-rate {
  width: 100%;
  height: 100%;
}
</style>