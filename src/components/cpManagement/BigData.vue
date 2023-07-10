<template>
  <div class="big-data">
    <div class="header">大数据推荐模板</div>
    <div class="wrapper">
      <div class="icon-left">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="right">
        <el-card class="head">
          <div class="wrapper">
            <div class="left">
              <div class="first-line">
                <i :class="template.icon"></i>
                <span>对应病种:{{template.disease}}</span>
              </div>
              <div class="second-line">
                <span>
                  标准住院日:{{template.days}}
                  <i class="el-icon-edit"></i>
                </span>
                <span>
                  标准费用:{{template.money}}
                  <i class="el-icon-edit"></i>
                </span>
                <span>
                  变异系数:{{template.xishu}}
                  <i class="el-icon-edit"></i>
                </span>
                <span>
                  确诊天数{{template.quezhenDays}}
                  <i class="el-icon-edit"></i>
                </span>
              </div>
            </div>
            <div class="middle">
              <div class="first-need">
                <i class="green el-icon-circle-check"></i>
                <span>符合国家制定用药规范</span>
              </div>
              <div class="second-need">
                <i class="green el-icon-circle-check"></i>
                <span>符合官方说明采药标准</span>
              </div>
              <div class="third-need">
                <i class="green el-icon-circle-check"></i>
                <span>符合卫计委发布相关病种治疗手段</span>
              </div>
            </div>
            <div class="right">
              <span :style="{fontSize:'16px'}">
                推荐模板费用/DRG控费:
                <span class="red bold">{{template.averageMoney}}/{{template.drgMoney}}</span>
              </span>
              <span :style="{fontSize:'20px'}">模板推荐率:{{template.percentage}}</span>
            </div>
            <div class="newRight">
              <el-button type="primary" @click="$emit('close')">应用该模板</el-button>
            </div>
          </div>
        </el-card>
        <div class="main" :style="{marginTop:'8px'}">
          <div class="main-center">
            <cp-template></cp-template>
          </div>
        </div>
      </div>
      <div class="icon-right">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
 
<script>
import CpTemplate from './CpTemplate.vue'
export default {
  components: { CpTemplate },
  data () {
    return {
      template: {},
      orderInfos: [
        {
          type: "长期",
          label: "葡萄糖注射5% 1000ml；5g（5%）",
          allCount: '',
          singleCount: '100ml',
          fre: "每天一次",
          use: "静脉输液,25-30滴/分",
          word: '',
          department: '住院药房',
          status: "正常",
          plan: '第1-4日',
          startTime: '第1日',
          endTime: '第4日',
        },
        {
          type: "长期",
          label: "葡萄糖注射5% 1000ml；5g（5%）",
          allCount: '',
          singleCount: '100ml',
          fre: "每天一次",
          use: "静脉输液,25-30滴/分",
          word: '',
          department: '住院药房',
          status: "正常",
          plan: '第1-4日',
          startTime: '第1日',
          endTime: '第4日',
        },
      ]
    }
  },
  mounted () {
    this.template = {
      icon: 'el-icon-aim',
      disease: '[M875.006]慢性淋巴细胞白血病',
      result: '已审核通过',
      index: 3,
      createPerson: '王主任',
      shenghePerson: '李医生',
      time: new Date().format('yyyy-MM-dd'),
      averageMoney: 4400,
      drgMoney: 4700,
      days: 7,
      money: 8500,
      xishu: 8,
      quezhenDays: 12,
      percentage: "99%"
    }
  }
}
</script>
 
<style lang="scss" scoped>
.big-data {
  .header {
    width: calc(100% - 140px);
    margin: auto;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 24px;
    background: #3981ee;
  }
  .wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    .icon-left,
    .icon-right {
      width: 48px;
      height: 48px;
      margin: 10px;
      border-radius: 50%;
      color: white;
      background: #3981ee;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      cursor: pointer;
    }
    .right {
      width: calc(100% - 140px);

      height: 100%;
      .head {
        height: 60px;
        .wrapper {
          height: 80px;

          display: flex;
          width: 100%;
          height: 100%;
          font-size: 10px;
          .left {
            width: 50%;
            .first-line,
            .second-line,
            .third-line {
              display: flex;
              margin-bottom: 10px;
              align-items: center;
              span {
                margin-right: 16px;
              }
              .circle {
                height: 12px;
                width: 12px;
                border-radius: 50%;
                background: #51c41b;
                margin-right: 5px;
              }
              i {
                cursor: pointer;
              }
            }
          }
          .middle {
            width: 30%;
          }
          .right {
            width: 30%;

            display: flex;
            flex-direction: column;
          }
          .newRight {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .main {
        .main-head {
          display: flex;
          align-items: center;
          .el-icon-warning {
            font-size: 20px;
            margin-left: 8px;
          }
          .warning {
            margin-left: 8px;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>