<template>
  <div class="cp-add">
    <div class="left">
      <choose-template></choose-template>
    </div>
    <div class="right">
      <el-card class="head">
        <div class="wrapper">
          <div class="head-left">
            <div class="line1">
              <i class="el-icon-user-solid"></i>
              <span>姓名:</span>
              <span class="bold">{{patient.name}}</span>
            </div>
            <div class="line2">
              <span>住院次数:</span>
              <span
                :style="{display:'inline-block',width:'40px',cursor:'pointer'}"
              >{{patient.enterCount}}</span>
              <i class="el-icon-edit"></i>
            </div>
          </div>
          <div class="head-right">
            <div class="right-tou">
              <div class="row1">
                <div class="hospitalNo">
                  <span>住院号:{{patient.hospitalNo}}</span>
                  <span :style="{marginLeft:'20px'}">护理:{{patient.careRank}}</span>
                </div>
                <div class="allergy">
                  <span>过敏药物:</span>
                  <span
                    :style="{display:'inline-block',width:'40px',cursor:'pointer'}"
                  >{{patient.allergy}}</span>
                  <i class="el-icon-edit"></i>
                </div>
              </div>
              <div class="row2">
                <div class="roomNo">
                  <span>床位:{{patient.roomNo}}</span>
                </div>
                <div class="status">
                  <span>病况:{{patient.status}}</span>
                </div>
              </div>
              <div class="row3">
                <div class="type">
                  <span>类型:{{patient.type}}</span>
                </div>
                <div class="time">
                  <span>入院:{{patient.time.format('yyyy-MM-dd')}}</span>
                </div>
              </div>
              <div class="row4">
                <div class="pay">
                  <span>付款:{{patient.payType}}</span>
                </div>
                <div class="disease">
                  <span>诊断:</span>
                  <span class="red">{{patient.disease}}</span>
                </div>
              </div>
              <div class="row5">
                <div class="insuranceNo">医保号:{{patient.insuranceNo}}</div>
                <div class="enter">是否进入路径:{{patient.enter}}</div>
              </div>
            </div>
            <div class="right-wei">
              <div class="one">
                <span>费用:</span>
                <span class="blue">预交金额:{{patient.todoMoney}}</span>
                <span class="blue">未结金额:{{patient.undoMoney}}</span>
                <span class="blue">剩余数:{{patient.lateNoney}}</span>
                <span class="blue">担保额:{{patient.danbaoMoney}}</span>
                <span class="blue">药占比:{{patient.yaoPercentage}}</span>
                <span class="orange">预估总费用:{{patient.yuguMoney}}</span>
                <span class="drg">DRG预估费用:{{patient.drgMoney}}</span>
              </div>
              <div class="order" :style="{marginLeft:'40px'}">
                <span>医嘱:</span>
                <span>未打印</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <div class="main" :style="{marginTop:'8px'}">
        <div class="stage">
          <el-card>
            <div slot="header" class="header">
              <span class="title">{{stage.title}}</span>
            </div>
            <el-card class="work">
              <div slot="header" class="work-header">
                <span class="title">主要诊疗工作</span>
                <div :style="{width:'100px'}"></div>
                <div class="btn-wrapper" v-if="stage.status === 0">
                  <el-checkbox
                    v-model="stage.work.checkAll"
                    @change="handleCheckAllChange('work')"
                  >全选</el-checkbox>
                  <el-tooltip
                    effect="light"
                    placement="bottom-start"
                    style="margin-right: 5px"
                    content="执行"
                  >
                    <i
                      class="el-icon-s-promotion purple"
                      :style="{marginLeft:'4px',cursor:'pointer'}"
                    ></i>
                    c
                  </el-tooltip>
                </div>
              </div>
              <div class="card-main">
                <div v-for="item in stage.work.tasks" :key="item.label" class="item">
                  <i class="el-icon-circle-check green" v-if="item.status === 1"></i>
                  <el-checkbox v-model="item.checked" v-if="item.status === 0">{{item.label}}</el-checkbox>
                  <span v-if="item.status === 1">
                    {{item.label}}
                    <div v-if="item.error" :style="{marginLeft:'16px',height:'30px'}">
                      <p class="errorP">变异原因:{{item.errorReason}}</p>
                      <p class="errorP">变异说明:{{item.errorInfo}}</p>
                    </div>
                  </span>
                </div>
              </div>
              <div class="add">
                <i class="el-icon-circle-plus-outline"></i>
              </div>
            </el-card>
            <el-card class="long-order">
              <div slot="header" class="work-header">
                <span class="title">长期医嘱</span>
                <div class="btn-wrapper" v-if="stage.status === 0">
                  <el-checkbox
                    v-model="stage.longOrders.checkAll"
                    @change="handleCheckAllChange('longOrders')"
                  >全选</el-checkbox>
                  <el-tooltip
                    effect="light"
                    placement="bottom-start"
                    style="margin-right: 5px"
                    content="执行"
                  >
                    <el-tooltip
                      effect="light"
                      placement="bottom-start"
                      style="margin-right: 5px"
                      content="执行"
                    >
                      <i
                        class="el-icon-s-promotion purple"
                        :style="{marginLeft:'4px',cursor:'pointer'}"
                      ></i>
                    </el-tooltip>
                  </el-tooltip>
                </div>
              </div>
              <div class="card-main">
                <div
                  v-for="item in stage.longOrders.tasks"
                  :key="item.label"
                  class="item"
                  :class="item.error?'error':''"
                >
                  <i class="el-icon-circle-check green" v-if="item.status === 1"></i>
                  <el-checkbox v-model="item.checked" v-if="item.status === 0">{{item.label}}</el-checkbox>
                  <span v-if="item.status === 1">{{item.label}}</span>
                </div>
              </div>
              <div class="add">
                <i class="el-icon-circle-plus-outline"></i>
              </div>
            </el-card>
            <el-card class="short-order">
              <div slot="header" class="work-header">
                <span class="title">临时医嘱</span>
                <div class="btn-wrapper" v-if="stage.status === 0">
                  <el-checkbox
                    v-model="stage.shortOrders.checkAll"
                    @change="handleCheckAllChange('shortOrders')"
                  >全选</el-checkbox>
                  <i
                    class="el-icon-s-promotion purple"
                    :style="{marginLeft:'4px',cursor:'pointer'}"
                  ></i>
                </div>
              </div>
              <div class="card-main">
                <div v-for="item in stage.shortOrders.tasks" :key="item.label" class="item">
                  <i class="el-icon-circle-check green" v-if="item.status === 1"></i>
                  <el-checkbox v-model="item.checked" v-if="item.status === 0">{{item.label}}</el-checkbox>
                  <span v-if="item.status === 1">
                    {{item.label}}
                    <div v-if="item.note">
                      <p class="noteP">{{item.note}}</p>
                    </div>
                  </span>
                </div>
              </div>
              <div class="add">
                <i class="el-icon-circle-plus-outline"></i>
              </div>
            </el-card>
            <el-card class="care">
              <div slot="header" class="work-header">
                <span class="title">主要护理工作</span>
                <div class="btn-wrapper" v-if="stage.status === 0">
                  <el-checkbox
                    v-model="stage.careWorks.checkAll"
                    @change="handleCheckAllChange('careWorks')"
                  >全选</el-checkbox>
                  <el-tooltip
                    effect="light"
                    placement="bottom-start"
                    style="margin-right: 5px"
                    content="执行"
                  >
                    <i
                      class="el-icon-s-promotion purple"
                      :style="{marginLeft:'4px',cursor:'pointer'}"
                    ></i>
                  </el-tooltip>
                </div>
              </div>
              <div class="card-main">
                <div v-for="item in stage.careWorks.tasks" :key="item.label" class="item">
                  <i class="el-icon-circle-check green" v-if="item.status === 1"></i>
                  <el-checkbox v-model="item.checked" v-if="item.status === 0">{{item.label}}</el-checkbox>
                  <span v-if="item.status === 1">
                    {{item.label}}
                    <div v-if="item.note">
                      <p class="noteP">{{item.note}}</p>
                    </div>
                  </span>
                </div>
              </div>
              <div class="add">
                <i class="el-icon-circle-plus-outline"></i>
              </div>
            </el-card>
          </el-card>
        </div>
        <div class="order-detail-wrapper">
          <order-detail from="generate"></order-detail>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
//!这个文件不需要 有ADD就行 因为一样的 就是初始化的时候有没有数据问题  ADD文件本身就会先读数据 空的自然就是空的
import ChooseTemplate from './ChooseTemplate.vue'
import OrderDetail from './OrderDetail.vue'
export default {
  components: {
    ChooseTemplate,
    OrderDetail
  },
  data () {
    return {

      //患者基础信息
      patient: {},
      stage: {},


    }
  },
  mounted () {

    this.patient = {
      name: "张三丰",
      hospitalNo: 20212563,
      careRank: 'I级护理',
      allergy: '无记录',
      roomNo: '20',
      enterCount: "第一次",
      status: "一般",
      type: "普通病人",
      time: new Date(),
      payType: "商业医疗保险",
      disease: "[M875.006]慢性淋巴细胞白血病",
      insuranceNo: "XXXXxxxxxxx",
      enter: "已进入",
      todoMoney: 200,
      undoMoney: 300,
      lateNoney: 100,
      danbaoMoney: 100,
      yaoPercentage: "70%",
      yuguMoney: 4367,
      drgMoney: 4469,
    },
      this.stage = {
        title: "第5-7天", status: 0,
        work: {
          checkAll: false,//全选
          tasks: [
            { label: '上级医师查房', status: 0, checked: false }, //status=1表示已经执行 checked必为true 表示勾选
            { label: '完成入院检查', status: 0, checked: false }, //status=1表示已经执行 checked必为true 表示勾选
            { label: '继续对症支持治疗', status: 0, checked: false }, //status=1表示已经执行 checked必为true 表示勾选
            { label: ' 完成必要的相关科室会诊', status: 0, checked: false }, //status=1表示已经执行 checked必为true 表示勾选
            { label: '完成上级医师查房记录等病历书写', status: 0, checked: false }, //status=1表示已经执行 checked必为true 表示勾选
            { label: '向患者及家属交待病情及其注意事项', status: 0, checked: false }, //status=1表示已经执行 checked必为true 表示勾选
          ]
        },
        longOrders: {
          checkAll: false,
          tasks: [
            { label: '患者既往基础用药', status: 0, checked: false },
            { label: '其他医嘱', status: 0, checked: false },

          ]
        },

        shortOrders: {
          checkAll: false,
          tasks: [
            { label: '骨髓穿刺和骨髓活检（必要时）', status: 0, checked: false },
            { label: '骨髓形态学、病理、免疫组化（必要时）', status: 0, checked: false },
            { label: '外周血免疫表型', status: 0, checked: false },
            { label: '外周血细胞(CpG刺激)/分子遗传学', status: 0, checked: false },

          ]
        },
        careWorks: {
          checkAll: false,
          tasks: [
            { label: '观察患者病情变化', status: 0, checked: false },
          ]
        },
        evalute: {
          result: '变异后继续',
          errorReason: '其它',
          info: '继续下一阶段',
          person: '王医生',
          stageMoney: 926,
          drgPercentage: '20%'

        }
      }
  },
  methods: {
    handleCheckAllChange (title) {
      console.log('title', title);
      this.stage[title].tasks.forEach(task => {
        task.checked = this.stage[title].checkAll
      });
    },
  }
}
</script>
 
<style lang="scss" scoped>
/* .error {
  background: #f29308;
} */
.cp-add {
  padding: 10px;
  box-sizing: border-box;
  height: calc(100% - 60px);
  display: flex;
  .left {
    width: 240px;
    height: 100%;
  }
  .right {
    margin-left: 10px;
    height: 100%;
    width: calc(100% - 250px);
    .head {
      height: 80px;

      .wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        font-size: 10px;

        span {
          width: 60px;
        }
        .head-left {
          width: 10%;
          .line2 {
            display: flex;
            align-items: center;
          }
        }
        .head-right {
          width: 90%;
          .right-tou {
            width: 100%;
            height: 50px;
            display: flex;
            div {
              flex: 1;
              padding-left: 10px;
              box-sizing: border-box;
              div {
                margin-bottom: 4px;
              }
            }
            .allergy {
              display: flex;
              align-items: center;
            }
          }
          .right-wei {
            height: 20px;
            display: flex;
            padding-left: 20px;
            box-sizing: border-box;
            align-items: center;
            span {
              margin-right: 10px;
            }
          }
        }
      }
    }
    .main {
      display: flex;
      width: 100%;
      .stage {
        width: 340px;
        margin-right: 10px;
        .header {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #3981ee;
          height: 30px;
          color: white;
        }
        .work {
          width: 99%;
          height: 240px;
          margin-bottom: 10px;
          overflow-y: auto;
          &::-webkit-scrollbar {
            display: none;
          }
          .work-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .card-main {
            padding-left: 10px;
            box-sizing: border-box;
            font-size: 12px;
            .item {
              margin-bottom: 2px;
              width: 100%;

              border-radius: 10px;
            }
          }
        }
        .long-order {
          margin-bottom: 10px;
          overflow-y: auto;
          &::-webkit-scrollbar {
            display: none;
          }
          width: 99%;
          height: 240px;
          .work-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .card-main {
            padding-left: 10px;
            box-sizing: border-box;
            font-size: 12px;
            .item {
              margin-bottom: 2px;
              width: 100%;

              border-radius: 10px;
            }
          }
        }
        .short-order {
          margin-bottom: 10px;
          overflow-y: auto;
          &::-webkit-scrollbar {
            display: none;
          }
          width: 99%;
          height: 240px;
          .work-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .card-main {
            padding-left: 10px;
            box-sizing: border-box;
            font-size: 12px;
            .item {
              margin-bottom: 2px;
              width: 100%;

              border-radius: 10px;
            }
          }
        }
        .care {
          margin-bottom: 10px;
          overflow-y: auto;
          &::-webkit-scrollbar {
            display: none;
          }
          width: 99%;
          height: 240px;
          .work-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .card-main {
            padding-left: 10px;
            box-sizing: border-box;
            font-size: 12px;
            .item {
              margin-bottom: 2px;
              width: 100%;

              border-radius: 10px;
            }
          }
        }
        .evalute {
          font-size: 12px;
        }
      }
      .order-detail-wrapper {
        //width: calc(100% -350px);
        width: calc(100% - 350px);
        height: calc(100vh - 60px);
      }
    }
  }
}
::v-deep .el-card__body {
  padding: 10px !important;
}
::v-deep .el-card__header {
  padding: 0px !important;
}
::v-deep .el-checkbox__label {
  font-size: 12px;
}
.add {
  margin-top: 4px;
  width: 100%;
  display: flex;
  border-radius: 10px;
  color: #3981ee;
  justify-content: center;
  cursor: pointer;
  width: 98%;
  margin-left: 2%;
}
.errorP,
.noteP {
  margin: 0 !important;
}
</style>
 



