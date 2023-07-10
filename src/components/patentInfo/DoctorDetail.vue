<template>
  <div class="doctor-detail">
    <div class="detail-wrapper">
      <div class="detail">
        <div class="title">{{doctor.name}}(就诊中)</div>
        <div class="message">
          <div class="line">
            <div class="key">基本信息:主任医师,教授,党委书记</div>
          </div>
          <div class="yiliao">
            <div class="medium white">
              今日病人数/手术台数
              <span class="bold">32/10</span>
            </div>
            <div class="medium white">
              <span class="key" :style="{marginRight:'40px'}">入径率:89%(各科室前17%)</span>
              <span class="key">变异退出率:14%(各科室前20%)</span>
            </div>
            <div class="medium white">
              <span class="key" :style="{marginRight:'40px'}">变异完成数:2</span>
              <span class="key" :style="{marginRight:'40px'}">变异完成率:66.7%(各科室前17%)</span>
              <span class="key">医嘱符合率:84%(各科室前10%)</span>
            </div>
            <div class="medium white">
              <span class="key" :style="{marginRight:'40px'}">辅助用药收入占比:30%,其中DRG预估费用89%(超过同科室医生90%)</span>
            </div>
          </div>
          <div class="line">
            <span class="key">今日资料贡献数/平安果产生数</span>
            <span class="value bold">20/65(第2名)</span>
          </div>
        </div>
      </div>
    </div>
    <div class="status-wrapper">
      <div class="status-detail">
        <div class="message">
          <div class="title1">
            <span class="key bold">听诊记录</span>
            <span class="value"></span>
          </div>
          <div class="timeline">
            <timeline4></timeline4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import timeline4 from './timeline4.vue'
export default {
  components: { timeline4 },
  props: ['doctor'],
  data () {
    return {
    }
  }
}
</script>
 
<style lang="scss" scoped>
.doctor-detail {
  width: 100%;
  height: 100%;

  .detail-wrapper,
  .status-wrapper {
    padding: 5px 10px;

    box-sizing: border-box;
    .detail,
    .status-detail {
      height: 100%;
      .yiliao {
        border-bottom: 1px solid #bcd0f9;
        div {
          height: 30px;
          line-height: 20px;
        }
      }
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

        .line {
          height: 30%;
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

  .detail-wrapper {
    height: 40%;
    padding-top: 0px;
    box-sizing: border-box;
  }
  .status-wrapper {
    height: 60%;
    box-sizing: border-box;
    margin-top: 20px;
    .status-detail {
      height: 100%;

      .message {
        height: 100%;

        .title1 {
          height: 20px;
          font-size: 14px;
          color: white;
          font-weight: bold;
        }
        .timeline {
          height: calc(100% - 20px);
        }
      }
    }
  }
}
</style>
</style>