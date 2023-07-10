<template>
  <div class="inner-wrapper">
    <div class="error-status">
      <div class="content-wrapper">
        <div class="selects">
          <div class="input-wrapper">
            <el-input v-model="dataId" size="small" placeholder="患者标识" clearable></el-input>
            <el-select
              v-model="errorType"
              placeholder="错误类型"
              :style="{marginLeft:'10px'}"
              size="small"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="small"
              @click="search"
              :style="{marginLeft:'10px'}"
            >搜索</el-button>
          </div>
          <el-button type="danger" size="small" @click="showChart = true" icon="el-icon-s-data">统计</el-button>
        </div>
        <div class="list">
          <div class="list-item gray" v-if="!showI">
            <div class="txId">项目号</div>
            <!-- <div class="pa">患者</div>
            <div class="date">DRG分组</div>-->

            <div class="op">医生</div>

            <div class="jindou">平安果</div>
            <div class="user">时间</div>
            <!-- <div class="user">出院时间</div> -->
            <div class="status">异常类型</div>
          </div>
          <div class="list-item gray" v-if="showI">
            <div class="txId" style="width:200px">项目号</div>
            <!-- <div class="pa">患者</div>
            <div class="date">DRG分组</div>-->

            <div class="op" style="width:60px">患者</div>

            <div class="jindou" style="width:260px">DRG分组</div>
            <div class="user" style="width:100px">操作者</div>
            <!-- <div class="user">出院时间</div> -->
            <div class="status" style="width:150px">入院时间</div>
            <div class="status" style="width:150px">出院时间</div>
            <div class="status">异常类型</div>
          </div>
          <div class="wrapper" v-if="!showI">
            <div
              class="list-item"
              v-for="(item,index) in list"
              :key="index"
              @click="handleClick(item.id)"
            >
              <div class="txId overflow">{{item.txId}}</div>
              <!-- <div class="pa overflow">张三</div>
              <div class="date overflow">腰间盘突出[M0034]</div>-->

              <div class="op overflow">{{item.doctor}}</div>
              <div class="jindou">
                <span class="appleColor" :style="{marginRight:'6px',fontSize:'14px'}">
                  <i class="iconfont icon-pingguo" style="color:#E64C65;fontSize:14px"></i>

                  <span class="appleColor" :style="{fontSize:'14px'}">-{{item.count}}</span>
                </span>
              </div>
              <div class="user overflow">{{formateDate(item.now_time)}}</div>
              <!-- <div class="user overflow">{{item.now_time2}}</div> -->
              <div class="status overflow">
                <el-tag
                  size="mini"
                  :type="item.status === '顺序不当'?'danger': item.status === '数据不一致'?'warning':item.status==='时间异常'?'info':item.status==='费用异常'?'success':'primary'"
                  effect="dark"
                >{{item.status}}</el-tag>
              </div>
            </div>
          </div>
          <div class="wrapper" v-if="showI">
            <div
              class="list-item"
              v-for="(item,index) in list"
              :key="index"
              @click="handleClick(item.id)"
            >
              <div class="txId overflow" style="width:200px">{{item.txId}}</div>
              <!-- <div class="pa overflow">张三</div>
              <div class="date overflow">腰间盘突出[M0034]</div>-->

              <div class="op overflow" style="width:60px">{{item.patient}}</div>
              <div class="op overflow" style="width:260px">{{item.group}}</div>
              <div class="op overflow" style="width:100px">{{item.operator}}</div>

              <div class="user overflow" style="width:150px">{{item.enterTime}}</div>
              <div class="user overflow" style="width:150px">{{item.leaveTime}}</div>
              <!-- <div class="user overflow">{{item.now_time2}}</div> -->
              <div class="status overflow">
                <el-tag
                  size="mini"
                  :type="item.status === '二次入院'?'danger': item.status === '数据不一致'?'warning':item.status==='时间异常'?'info':item.status==='费用异常'?'success':'primary'"
                  effect="dark"
                >{{item.status}}</el-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="paper-detail">
      <error-detail :paperId="paperId" :department="department"></error-detail>
    </div>
    <el-dialog title="异常统计" :visible.sync="showChart" width="30%">
      <v-chart :options="chartOptions"></v-chart>
    </el-dialog>
  </div>
</template>
 
<script>
import ErrorDetail from './ErrorDetail.vue'

// import { getErrorDetailData } from '@/service/api'
import { errorDetailData } from '../mock.js'
// const errorDetailData = [
//   { "user": "user11", "txId": "68024af08b674e78c2ecbca72f885cef19d546e5c0099299c9a4e001f0285547", "dataid": "data1", "optype": "write", "src_channel": "channel1", "des_channel": "channel2", "hashdata": "f533cb11ea39d7e6c2ff9074ec53d3053e8a3f7cdf10e5f626fb0b408d3bdd8c", "status": "二次入院", "id": 0, doctor: "李医生", last_content: "4-开药", content: "6-取药", old_time: new Date(2021, 9, 30, 18, 8, 46), now_time: '2021-11-05 09:35:56', now_time2: '2021-11-05 09:36:14', count: 2, },
//   { "user": "user11", "txId": "68024af08b674e78c2ecbca72f885cef19d546e5c0099299c9a4e001f0285547", "dataid": "data1", "optype": "write", "src_channel": "channel1", "des_channel": "channel2", "hashdata": "f533cb11ea39d7e6c2ff9074ec53d3053e8a3f7cdf10e5f626fb0b408d3bdd8c", "status": "二次入院", "id": 0, doctor: "李医生", last_content: "4-开药", content: "6-取药", old_time: new Date(2021, 9, 30, 18, 8, 46), now_time: '2021-11-05 09:37:21', now_time2: '2021-11-05 09:37:51', count: 2, },
//   { "user": "user11", "txId": "68024af08b674e78c2ecbca72f885cef19d546e5c0099299c9a4e001f0285547", "dataid": "data1", "optype": "write", "src_channel": "channel1", "des_channel": "channel2", "hashdata": "f533cb11ea39d7e6c2ff9074ec53d3053e8a3f7cdf10e5f626fb0b408d3bdd8c", "status": "二次入院", "id": 0, doctor: "李医生", last_content: "4-开药", content: "6-取药", old_time: new Date(2021, 9, 30, 18, 8, 46), now_time: '2021-11-05 09:39:26', now_time2: '2021-11-05 09:39:52', count: 2, },
// ]
export default {
  components: {
    ErrorDetail
  },
  data () {
    return {
      options: [{
        value: '选项1',
        label: '顺序不当'
      }, {
        value: '选项2',
        label: '数据不一致'
      }, {
        value: '选项3',
        label: '数据异常'
      }, {
        value: '选项4',
        label: '时间异常'
      }, {
        value: '选项5',
        label: '费用异常'
      }],
      chartOptions: {},
      paperId: 0,
      value: '',
      list: [],
      dataId: '',
      canInterval: true,
      department: '',
      errorType: "",
      showChart: false,
      showI: false,
    }
  },
  methods: {

    handleClick (id) {
      this.paperId = id
    },
    formateDate (date) {
      console.log('date', date);
      return date.toLocaleString('en-GB', { timeZone: 'UTC' })
    },
    search () {
      // if (this.dataId === '' && this.errorType === '') {
      //   this.getData()
      //   return
      // } else if (this.dataId !== '') {
      //   this.list = errorDetailData.filter(item => {
      //     return item.txId === this.dataId
      //   })
      // } else if (this.errorType !== '') {

      //   this.list = errorDetailData.filter(item => {
      //     return item.status === this.errorType
      //   })
      // }

      if (this.dataId === '1067') {
        this.showI = true
        this.list = [
          {
            id: 1,
            txId: "68024af08b674e78c2ecbca72f885cef19d546e5c0099299c9a4e001f0285547",
            patient: "张三",
            group: "腰间盘突出[M0034]",
            operator: "李医生",
            enterTime: "2021-11-04 09:35:56",
            leaveTime: "2021-11-05 09:36:14",
            status: "二次入院"
          },
          {
            id: 1,

            txId: "a633e54eb73d493dfa605b6571a3badd0ab62235e58f6be0c1f3031a2ad2eab7",
            patient: "张三",
            group: "腰间盘突出[M0034]",
            operator: "王医生",
            enterTime: "2021-11-06 09:37:56",
            leaveTime: "2021-11-07 09:36:14",
            status: "二次入院"


          },

        ]
      }
      this.paperId = this.list[0].id
    },
    async getData () {
      this.list = errorDetailData.slice(0, 10)
    }
  },

  async mounted () {
    const department = this.$route.query.department || '外科'
    this.department = department

    this.list = errorDetailData.slice(0, 10)



    let NotSatifyRootData = []
    let NotFindPolicyData = []
    let dataError = []
    let timeError = []
    let freeError = []
    let len = errorDetailData.length
    errorDetailData.forEach(item => {
      if (item.status === '顺序不当') {
        NotSatifyRootData.push(item)
      } else if (item.status === '数据不一致') {
        NotFindPolicyData.push(item)
      } else if (item.status === '数据异常') {
        dataError.push(item)
      } else if (item.status === '时间异常') {
        timeError.push(item)
      } else {
        freeError.push(item)
      }
    });
    this.chartOptions = {

      series: [{
        name: "category",
        type: 'pie',
        data: [
          {
            legondname: '顺序不当',
            value: NotSatifyRootData.length,
            percent: `${(NotSatifyRootData.length / len).toFixed(2) * 100}%`,
            itemStyle: {
              color: '#8FC31F'
            },
            name: `pathError | ${(NotSatifyRootData.length / len).toFixed(2) * 100}%`
          },
          {
            legondname: '数据不一致',
            value: NotFindPolicyData.length,
            percent: `${(NotFindPolicyData.length / len).toFixed(2) * 100}%`,
            itemStyle: {
              color: '#F35833'
            },
            name: `dataSeq | ${(NotFindPolicyData.length / len).toFixed(2) * 100}%`
          },
          {
            legondname: '数据异常',
            value: dataError.length,
            percent: `${(dataError.length / len).toFixed(2) * 100}%`,
            itemStyle: {
              color: '#409EFF'
            },
            name: `dataError | ${(dataError.length / len).toFixed(2) * 100}%`
          },
          {
            legondname: '时间异常',
            value: timeError.length,
            percent: `${(timeError.length / len).toFixed(2) * 100}%`,
            itemStyle: {
              color: '#909399'
            },
            name: `timeError | ${(timeError.length / len).toFixed(2) * 100}%`
          },
          {
            legondname: '费用异常',
            value: freeError.length,
            percent: `${(freeError.length / len).toFixed(2) * 100}%`,
            itemStyle: {
              color: '#67C23A'
            },
            name: `freeError | ${(freeError.length / len).toFixed(2) * 100}%`
          }
        ],

        animation: true,
        animationDuration: 1000,
        label: {
          normal: {
            show: true,
            position: 'inner',
            formatter: function (params) {
              return params.data.name
            }
          }
        },

        labelLine: {
          normal: {
            length: 5,
            length2: 3,
            smooth: true
          }
        },
        /* itemStyle: {
          borderWidth:4px
        }, */
        clockwise: true
      }],
      /* legend: {
        type: 'scroll',
        orient: "vertical",
        height: 250,
        left: '60%',
        top: 'middle',
        textStyle: {
          color: "white"
        }
      }, */
      /* tooltip: {
        trigger: 'item',
        formatter: function (params) {
          const str = params.seriesName + '</br>' + params.marker + params.data.legondname + '</br>' + "数量: " + params.data.value + "</br>" + "占比:" + params.data.percent
          return str
        }
      } */
    }
  },



}
</script>
 
<style lang="scss" scoped>
.inner-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  background: #0f1c39;
  /* background: #0f1c39; */
  /* background: #eee; */
  color: white;

  .error-status {
    width: 50%;
    margin-left: 40px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    background: #0f1c39;
    color: white;

    height: calc(100% - 20px);
    /*  height: 100%; */
    .content-wrapper {
      padding-top: 50px;
      padding-left: 20px;
      .selects {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .input-wrapper {
          display: flex;
        }
      }
      .list {
        background-color: #0f1c39;
        padding-left: 10px;
        box-sizing: border-box;
        height: 80%;
        color: white;
        margin-top: 10px;
        .list-item {
          display: flex;
          border-bottom: 1px solid gray;
          height: 10%;
          box-sizing: border-box;
          padding: 16px 20px 16px 0;
          align-items: center;
          .txId,
          .user,
          .date,
          .status,
          .jindou {
            //flex: 1;
            // height: 12.5%;

            text-align: center;
            font-size: 14px;
            width: 25%;
          }
          .txId {
            width: 28%;
          }
          .pa {
            width: 7%;
          }
          .status {
            width: 24%;
            text-align: center;
          }
          .user {
            width: 22%;
          }
          .op {
            width: 20%;
            text-align: center;
          }
          .jindou {
            width: 8%;
          }
          .overflow {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          /* &:nth-child(odd) {
        background: #f2f2f2;
      }
      &:nth-child(even) {
        background: white;
      } */
        }
      }
    }
  }
  .paper-detail {
    width: 50%;

    margin-left: 1%;
    padding-left: 20px;
    margin-right: 20px;
    padding-right: 20px;
    box-sizing: border-box;

    background: #0f1c39;
    height: calc(100% - 20px);
    /* height: 100%; */
  }
  .echarts {
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang="scss" scoped>
.el-date-editor {
  background-color: #3e495d;
}
</style>