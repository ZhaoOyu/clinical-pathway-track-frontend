<template>
  <div style="height: 100%">
    <!-- <div class="title">异常分布</div> -->
    <div class="wrapper">
      <ve-amap
        :settings="chartSettings"
        :tooltip="tooltip"
        :series="series"
        width="100%"
        :style="{height:'100%'}"
        :after-set-option-once="afterSet"
      ></ve-amap>
    </div>
  </div>
</template>

<script>
let littleDotData = [
  {
    name: '外科',
    value: [114.25936, 30.579741, 200],
  },
  {
    name: '妇科',
    value: [114.259908, 30.580061, 180]
  },
  {
    name: '口腔科',
    value: [114.259645, 30.579078, 230]
  },
  {
    name: '内科',
    value: [114.258804, 30.580097, 330]
  },
  {
    name: '五官科',
    value: [114.260158, 30.580152, 210]
  },
  {
    name: '脊柱科',
    value: [114.260476, 30.578979, 180]
  },
  {
    name: '内分泌科',
    value: [114.259897, 30.580346, 130]
  },
]
const loopName = ['本院', '外科', '妇科', '口腔科', '内科', '五官科', '脊柱科', '内分泌科']
export default {
  computed: {
    department () {
      return this.$store.state.yuanZhang.department
    }
  },
  data () {
    return {
      loopIndex: 0,
      chartSettings: {
        key: "723508a3369754233a578f36a4d3cf24",
        amap: {
          zoom: 18,
          center: [114.259913, 30.579561],
          mapStyle: 'amap://styles/70cca3ae74038446da3e27b05ed7435a',
          animateEnable: true,
        },
      },

      series: [],
      series2: [],
      tooltip: {
        show: true
      }
    }
  },
  watch: {
    department () {
      const that = this
      this.series[0].itemStyle = {
        normal: {
          color: function (data) {
            console.log('data', data);
            if (that.department === data.name) return '#ec3333'
            else return '#74fbf5'
          },/* colors[0][0], */
          shodowColor: function (data) {
            console.log('data', data);
            if (that.department === data.name) return '#ec3333'
            else return '#74fbf5'
          }, /* colors[0][0] */
          // color: '#ec3333',/* colors[0][0], */
          // shodowColor: '#ec3333' /* colors[0][0] */
        }
      }
    }
  },
  mounted () {
    const that = this
    this.series = [{
      type: 'effectScatter',
      data: littleDotData,
      coordinateSystem: 'amap',
      symbolSize: function (val) {
        return val[2] / 10
      },
      rippleEffect: {
        brushType: "stroke", //涟漪
      },
      hoverAnimation: true,//移上去有动画
      label: {
        show: true,
        position: 'right',
        formatter (params) {
          return `${params.data.name}`
        }
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     position: 'right',
      //     formatter (params) {
      //       console.log('params', params);
      //       return `${params.data.name}:${params.value[2]}`
      //     }
      //   },
      // },
      itemStyle: {
        normal: {
          color: function (data) {
            console.log('data', data);
            if (that.department === data.name) return '#ec3333'
            else return '#74fbf5'
          },/* colors[0][0], */
          shodowColor: function (data) {
            console.log('data', data);
            if (that.department === data.name) return '#ec3333'
            else return '#74fbf5'
          }, /* colors[0][0] */
          // color: '#ec3333',/* colors[0][0], */
          // shodowColor: '#ec3333' /* colors[0][0] */
        }
      },

    }]
    setInterval(() => {
      this.$emit("clickDepartment", loopName[this.loopIndex])
      this.loopIndex = (this.loopIndex + 1) % 8
    }, 5000)
    /* let map = echarts.init(document.getElementById('map'))
    map.on('click', (params) => {
      console.log('params', params);
    }) */
  },
  methods: {
    judgeNear (point, littleDotData1) {
      let minIndex = -1
      let minDis = Number.MAX_SAFE_INTEGER
      littleDotData1.forEach((dot, index) => {
        let dis = Math.pow((dot.value[0] - point[0]), 2) + Math.pow((dot.value[0] - point[0]), 2)
        if (minDis > dis) {
          minDis = dis
          minIndex = index
          console.log('minIndex', minIndex);
        }
      })
      return minIndex
    },
    afterSet: function (echarts) {
      var amap = echarts.getModel().getComponent('amap').getAMap()
      console.log('amap', amap);
      amap.on('click', e => {
        console.log('e', e);
        //  this.chartSettings.amap.center = [e.lnglat.Q, e.lnglat.R]
        // this.chartSettings.amap = {
        //   zoom: 16,
        //   center: [e.lnglat.Q, e.lnglat.R],
        //   mapStyle: 'amap://styles/70cca3ae74038446da3e27b05ed7435a',
        // }
        // console.log('a', amap.getZoom());
        // amap.setZoomAndCenter(14, [e.lnglat.R, e.lnglat.Q])
        let minIndex = this.judgeNear([e.lnglat.R, e.lnglat.Q], littleDotData)
        // amap.setZoomAndCenter(20, [(littleDotData[minIndex].value)[0], (littleDotData[minIndex].value)[1]])
        // this.$router.push({
        //   path: "/dataerror",
        //   query: {
        //     department: littleDotData[minIndex].name
        //   }
        // })
        this.$emit("clickDepartment", littleDotData[minIndex].name)
      })
    },

  }

}
</script>

<style lang="scss" scoped>
.title {
  padding-left: 10px;
  box-sizing: border-box;
  font-weight: 500;
  height: 20px;
  color: #117fbe;
  font-size: 16px;
  font-weight: bold;
}
.inner {
  border-color: #9a6e3a;
}
.wrapper {
  width: 100%;
  height: 98%;

  /*设置大小*/

  background-size: 0.15rem 0.9rem, 0.9rem 0.15rem, 0.15rem 0.9rem,
    0.9rem 0.15rem;
  background-color: #60626621;
  box-sizing: border-box;

  padding: 0.15rem;
  margin-top: 10px;
}
.ve-amap {
  div[_echarts_instance_] {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
<style lang="scss">
.ve-amap {
  div[_echarts_instance_] {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
