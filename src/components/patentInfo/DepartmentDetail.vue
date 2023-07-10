<template>
  <div class="err-detail">
    <div class="detail-wrapper">
      <div class="detail">
        <div class="title">{{name}}</div>
        <div class="message">
          <div class="line">
            <span class="key">医生数/护士数</span>
            <span class="value bold">54(主治医生21)/63(护士长13)</span>
          </div>

          <div class="line">
            <span class="key">昨日/今日手术台数</span>
            <span class="value bold">
              192/205
              <i class="el-icon-top red"></i>
              <span class="red">13</span>
            </span>
          </div>
          <div class="line">
            <span class="key">昨日/今日看病人数</span>
            <span class="value bold">
              356/499
              <i class="el-icon-top red"></i>
              <span class="red">143</span>
            </span>
          </div>
          <div class="yiliao">
            <div class="medium white">今日门诊收入53.0万,医保基金比例为60%,占医疗收入75%</div>
            <div class="medium white">今日住院收入17.6万,医保基金比例为52%,占医疗收入25%</div>
            <div class="medium white">次均费用增幅9%,次均药品费用增幅6%</div>
            <div class="line">
              <span class="key" :style="{fontSize:'14px'}">收支结余/DRG占比</span>
              <span class="value bold">+30万(收70万,支40万)/70%</span>
            </div>
          </div>

          <div class="yiliao">
            <div class="medium white">临床路径模板数:16</div>
            <div class="medium white">
              <span class="key" :style="{marginRight:'40px'}">入径率:89%(各科室前17%)</span>
              <span class="key">变异退出率:14%(各科室前20%)</span>
            </div>
            <div class="medium white">
              <span class="key" :style="{marginRight:'40px'}">变异完成数:2</span>
              <span class="key" :style="{marginRight:'40px'}">变异完成率:66.7%(各科室前17%)</span>
              <span class="key">医嘱符合率:84%(各科室前10%)</span>
            </div>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="title">科室产生平安果前三医生排行</div>
        <el-table size="mini" border :data="tableData">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="fileNumber" label="上传文件总数"></el-table-column>
          <el-table-column prop="operationNumber" label="今日手术数"></el-table-column>
          <el-table-column prop="jingdouCount" label="获得平安果数">
            <template slot-scope="scope">
              <i
                class="el-icon-orange orange"
                :style="{marginRight:'2px',fontSize:'12px',marginLeft:'4px'}"
              ></i>
              <span
                class="orange"
                :style="{marginRight:'6px',fontSize:'12px'}"
              >{{scope.row.jingdouCount}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
 
<script>
// import { getErrorDetailData } from '@/service/api'
/* import { errorDetailData } from './mock'; */
export default {
  data () {
    return {
      type: "danger",
      tx: '',
      errorDetailData: [],
      deparment: {

      },
      tableData: [
        { name: "王医生", operationNumber: "8", fileNumber: 10, jingdouCount: 40 },
        { name: "李医生", operationNumber: "4", fileNumber: 8, jingdouCount: 20 },
        { name: "张医生", operationNumber: "2", fileNumber: 6, jingdouCount: 10 },
      ],
      name: ""
    }
  },
  async mounted () {

  },
  methods: {
    formateDate (date) {
      return date.toLocaleString('en-GB', { timeZone: 'UTC' })
    },
    async getData () {
      this.errorDetailData = errorDetailData

    }
  },
  mounted () {
    this.name = this.$route.query.name || '脊柱一科'
  }

}
</script>
 
<style lang="scss" scoped>
.err-detail {
  width: 100%;
  height: 100%;

  .detail-wrapper {
    padding: 5px 10px;

    box-sizing: border-box;
    .detail {
      height: 100%;

      .title {
        font-weight: bold;
        width: 70%;
        height: 40px;
        word-wrap: break-word;
        word-break: break-all;
        color: white;
        font-size: 18px;
      }
      .message {
        width: 100%;
        height: calc(100% - 70px);
        .yiliao {
          border-bottom: 1px solid #bcd0f9;
          div {
            height: 30px;
            line-height: 20px;
          }
        }
        .line {
          height: 15%;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #bcd0f9;
          justify-content: space-between;
          .key,
          .value {
            font-size: 14px;
            color: white;

            &.bold {
              font-weight: bold;
              font-size: 14px;
              color: white;
            }
          }
          .key {
            color: white;
          }
        }
        .list {
          color: gray;
          margin-top: 10px;
          .list-item {
            display: flex;
            border-bottom: 1px solid #bbbbbb;
            /* border-bottom: 1px solid gray; */
            height: 20px;
            padding: 6px 20px 6px 0;
            align-items: center;
            .updater,
            .txId,
            .updateDate {
              height: 20px;
              /* padding: 5px 0; */
              text-align: center;
              font-size: 14px;
            }
            .updater {
              width: 80px;
            }
            .updateDate {
              width: 80px;
            }
            .txId {
              flex: 1;
            }

            /* &:nth-child(odd) {
        background: #f2f2f2;
      }
      &:nth-child(even) {
        background: white;
      } */
            &.gray {
              color: white;
            }
          }
        }
      }
    }
    .main {
      .title {
        color: white;
        font-weight: bold;
      }
      .el-table {
        margin-top: 6px;
      }
    }
    .operation {
      font-size: 12px;
      .op {
        .bold {
          font-weight: bold;
        }
      }
      .op-detail {
        display: flex;
        justify-content: space-around;

        .con {
          width: 40px;
          position: relative;
          margin-left: 40px;
          .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
            position: absolute;

            background: #1b60ec;
          }
          .bar {
            height: 60px;
            width: 1px;
            left: 4px;
            background: #87abf5;
            position: absolute;
          }
        }
        .time {
          position: relative;
          width: 150px;
          margin-left: 40px;
          .time-item {
            position: absolute;
            align-items: center;
          }
        }
        .tags {
          position: relative;
          width: 400px;
          margin-top: 22px;
          .tag-item {
            position: absolute;
            width: 70px;
            text-align: center;
          }
          .tag-item2 {
            position: absolute;
            width: 70px;
            left: 70px;
            text-align: center;
          }
        }
      }
    }
  }
}
.detail-wrapper {
  height: 70%;
  padding-top: 0px;
  box-sizing: border-box;
}
</style>