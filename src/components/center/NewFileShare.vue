<template>
  <div class="jingdou" id="main"></div>
</template>
 
<script>
import echarts from 'echarts'
import { getDoctorFileShare } from "./../../api/center.js"
export default {
  data() {
    return {
      option: {},
      doctorFileShare: [],
      month: [],
      upload: [],
      download: [],
      download_number: [],
      monthTime: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
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
      this.renderOptions()
    },
    doctorFileShare: {
      handler() {
        this.monthData()
        this.uploadData()
        this.downloadData()
        this.downloadNumData()
        this.renderOptions()
      }
    }
  },
  created() {
    getDoctorFileShare("王医生").then(res => {
      this.doctorFileShare = res
    })

  },
  mounted() {

    this.renderOptions(this.yuanZhang)
  },
  methods: {
    //医生文件情况

    monthData() {
      for (let i = 0; i < this.doctorFileShare.length; i++) {
        this.month.push(this.monthTime[this.doctorFileShare[i].time - 1])
      }
    },
    uploadData() {
      for (let i = 0; i < this.doctorFileShare.length; i++) {
        this.upload.push(this.doctorFileShare[i].upload)
      }
    },
    downloadData() {
      for (let i = 0; i < this.doctorFileShare.length; i++) {
        this.download.push(this.doctorFileShare[i].download)
      }
    },
    downloadNumData() {
      for (let i = 0; i < this.doctorFileShare.length; i++) {
        this.download_number.push(this.doctorFileShare[i].downloadNumber)
      }
    },
    renderOptions() {
      console.log('data.denglu', this.doctorFileShare);
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
            data: this.month
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
            data: this.upload
          },

          {
            name: '个人下载量',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: this.download
          },
          {
            name: '被下载量',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: this.download_number
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