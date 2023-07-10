<template>
  <div class="inner-wrapper">
    <div class="error-status">
      <div class="content-wrapper">
        <div class="selects">
          <div class="input-wrapper">
            <el-input v-model="dataId" size="small" placeholder="项目号" clearable></el-input>
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
          <div class="list-item gray">
            <div class="txId">项目号</div>
            <div class="date">操作者</div>
            <div class="jindou">平安果</div>
            <div class="user">时间</div>
            <div class="status">错误类型</div>
          </div>
          <div
            class="list-item"
            v-for="(item,index) in list"
            :key="index"
            @click="handleClick(item.id)"
          >
            <div class="txId overflow">{{item.txId}}</div>
            <div class="date overflow">{{item.doctor}}</div>
            <div class="jindou">
              <span class="appleColor" :style="{marginRight:'6px',fontSize:'14px'}">
                <i class="iconfont icon-pingguo" style="color:#E64C65;fontSize:14px"></i>

                <span class="appleColor" :style="{fontSize:'14px'}">-{{item.count}}</span>
              </span>
            </div>
            <div class="user overflow">{{formateDate(item.now_time)}}</div>
            <div class="status overflow">
              <el-tag
                size="mini"
                :type="item.status === '顺序不当'?'danger': item.status === '数据不一致'?'warning':item.status==='时间异常'?'info':item.status==='费用异常'?'success':'primary'"
                effect="dark"
              >{{item.status}}</el-tag>
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
import { myErrorDetailData } from '../mock.js'

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
      showChart: false
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
      if (this.dataId === '' && this.errorType === '') {
        this.getData()
        return
      } else if (this.dataId !== '') {
        this.list = myErrorDetailData.filter(item => {
          return item.txId === this.dataId
        })
      } else if (this.errorType !== '') {

        this.list = myErrorDetailData.filter(item => {
          return item.status === this.errorType
        })
      }

      this.paperId = this.list[0].id
    },
    async getData () {
      this.list = myErrorDetailData.slice(0, 10)
    }
  },

  async mounted () {
    const department = this.$route.query.department || '外科'
    this.department = department

    this.list = myErrorDetailData.slice(0, 10)



    let NotSatifyRootData = []
    let NotFindPolicyData = []
    let dataError = []
    let timeError = []
    let freeError = []
    let len = myErrorDetailData.length
    myErrorDetailData.forEach(item => {
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

  .error-status {
    width: 50%;
    margin-left: 40px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;

    background: #0f1c39;
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
        color: gray;
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
            color: white;
            //flex: 1;
            // height: 12.5%;

            text-align: center;
            font-size: 14px;
            width: 25%;
          }
          .txId {
            width: 28%;
          }
          .status {
            width: 15%;
          }
          .user {
            width: 25%;
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
::v-deep .el-range-input {
  background-color: #3e495d !important;
  border: none;
}

::v-deep .el-range-separator {
  color: #c0c4cc;
}
::v-deep .el-input__inner {
  background-color: #3e495d;
  color: white;
  border: none;
}
::v-deep .el-radio-button__inner {
  background-color: #3e495d;
  border: none;
  color: #c0c4cc;
}
::v-deep.el-radio-button__inner {
  border-left: none !important;
}
::v-deep.el-input__inner {
  color: white;
  /* width: 140px; */
}
::v-deep .el-dialog__body {
  height: 400px;
}
</style>