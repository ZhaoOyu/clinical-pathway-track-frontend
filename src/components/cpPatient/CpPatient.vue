<template>
  <div class="cp-patient">
    <el-card class="left">
      <el-input placeholder="请输入患者名或编号" suffix-icon="el-icon-search"></el-input>
      <el-radio-group v-model="dayType" size="mini" style="marginTop:4px" @change="changeDayType">
        <el-radio-button label="今日"></el-radio-button>
        <el-radio-button label="昨日"></el-radio-button>
        <el-radio-button label="两天前"></el-radio-button>
      </el-radio-group>
      <div class="list">
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo">
          <el-submenu index="0">
            <template slot="title">
              <span>内分泌科</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(patient,index2) in patients"
                :key="patient.id"
                :index="`${index2}`"
                @click="handleClickMenu(patient)"
              >{{patient.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </el-card>
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
              >第{{patient.admitCount }}次</span>
              <i class="el-icon-edit"></i>
            </div>
          </div>
          <div class="head-right">
            <div class="right-tou">
              <div class="row1">
                <div class="hospitalNo">
                  <span>住院号:{{patient.hospitalNumber}}</span>
                  <span :style="{marginLeft:'20px'}">护理:I级护理</span>
                </div>
                <div class="allergy">
                  <span>过敏药物:</span>
                  <span :style="{display:'inline-block',width:'40px',cursor:'pointer'}">无记录</span>
                  <i class="el-icon-edit"></i>
                </div>
              </div>
              <div class="row2">
                <div class="roomNo">
                  <span>床位:{{patient.bedNumber}}</span>
                </div>
                <div class="status">
                  <span>病况:{{patient.patientCondition}}</span>
                </div>
              </div>
              <div class="row3">
                <div class="type">
                  <span>类型:{{patient.type}}</span>
                </div>
                <div class="time">
                  <span>入院:{{patient.admitTime}}</span>
                </div>
              </div>
              <div class="row4">
                <div class="pay">
                  <span>付款:{{patient.paymentType}}</span>
                </div>
                <div class="disease">
                  <span>诊断:</span>
                  <span class="red">{{patient.diagnosisName}}</span>
                </div>
              </div>
              <div class="row5">
                <div class="insuranceNo">医保号:{{patient.careCardNumber}}</div>
                <div class="enter">是否进入路径:{{patient.enterCp === 0?'未进入':'已进入'}}</div>
              </div>
            </div>
            <div class="right-wei">
              <div class="one">
                <span>费用:</span>
                <span class="blue">预交金额:{{patient.prepay}}</span>
                <span class="blue">未结金额:{{patient.outstanding}}</span>
                <span class="blue">剩余数:{{patient.remain}}</span>
                <span class="blue">担保额:{{patient.guarantee}}</span>
                <span class="blue">药占比:{{patient.drugPer}}</span>
                <span class="red">预估总费用:{{patient.total}}</span>
                <span class="drg">DRG预估费用:{{patient.drgFee}}</span>
                <span class="appleColor">
                  <i class="iconfont icon-pingguo" style="color:#E64C65;fontSize:14px"></i>

                  <span class="appleColor" :style="{fontSize:'14px'}">5</span>
                </span>
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
        <div class="main-head">
          <el-radio-group v-model="type" size="mini" @change="changeMain">
            <el-radio-button label="临床路径"></el-radio-button>
            <el-radio-button label="医嘱信息"></el-radio-button>
          </el-radio-group>
          <i class="el-icon-warning"></i>
          <span class="warning">双击临床路径单元格可在底部查看具体医嘱</span>
          <el-button type="primary" size="mini" :style="{marginLeft:'10px'}" @click="trace">临床路径溯源</el-button>
        </div>
        <div class="main-center">
          <cp-main v-if="mainType === '临床路径'" :id="id"></cp-main>
          <order-info v-if="mainType === '医嘱信息'" ref="orderInfo" :patientId="id"></order-info>
        </div>
      </div>
    </div>
    <!-- <el-dialog :visible.sync="dialogTableVisible" width="80%">
       <error-help></error-help>
      <addorder-template></addorder-template>
    </el-dialog>-->
  </div>
</template>
 
<script>
import AddorderTemplate from '../orderManagement/AddorderTemplate.vue'
import CpMain from './CpMain.vue'
import ErrorHelp from './ErrorHelp.vue'
import OrderInfo from './OrderInfo.vue'
import { getPatientGroupByDept, getPatientCpHeader, getPatientCpContent, getPatientsThreeByDept } from '@/api/patient'
export default {
  components: { CpMain, ErrorHelp, AddorderTemplate, OrderInfo },
  data () {
    return {
      dayType: "今日",
      id: 0,
      activeIndex: '0',
      dialogTableVisible: true,
      enterCountOptions: [
        { value: 1, label: '第一次' },
        { value: 2, label: '第二次' },
        { value: 3, label: '三次以上' },
      ],
      allergyOptions: [
        { value: 1, label: '无记录' },
        { value: 2, label: '青霉素' },
        { value: 3, label: '其他' },
      ],
      patients: [],
      patients0: [],
      patients1: [],
      patients2: [],
      //患者基础信息
      patient: {},
      type: '临床路径',
      mainType: '临床路径',
    }
  },
  methods: {
    trace () {
      this.$router.push({
        path: '/trace',
        query: {
          patientId: this.id,

        }
      })
    },
    changeMain (e) {
      this.mainType = e
      console.log('e', e);
    },
    handleClickMenu (patient) {
      this.id = patient.id
      this.getHead(patient.id)
    },
    getPatient () {
      const nowD = new Date().getDate()

      getPatientsThreeByDept().then(res => {
        console.log('three', res);
        res[0].patients.forEach(item => {
          const dateN = new Date(item.admitTime).getDate()
          if (nowD === dateN) {
            this.patients0.push(item)

          } else if (nowD - dateN === 1) {
            this.patients1.push(item)

          }
          else {
            this.patients2.push(item)

          }

        })
        this.patients = this.patients0
        console.log('this.patients2', this.patients);
        this.id = this.patients[0].id

        this.getHead(this.id)

      })
      // getPatientGroupByDept().then(patents => {
      //   this.patients = patents
      //   this.id = this.patients[0].patients[0].id
      //   this.getHead(this.id)
      // })
    },
    getHead (id) {
      getPatientCpHeader(id).then(head => {
        console.log('head', head);
        this.patient = {
          // ...head.diagnosis,
          ...head.patientDiagnosis,
          ...head.patient,
          ...head.patientChargeVO,
          admitTime: this.formateTime(head.patient.admitTime),
          diagnosisName: `[${head.diagnosis.code}]${head.diagnosis.name}`,
          prepay: 200,
          outstanding: 300,
          remain: 100,
          guarantee: 100,
          drugPer: "70%",
          total: 4367,
          drgFee: 4469,
          // ...head.patientDiagnosis
        }
        console.log('patient', this.patient);

      })
    },
    changeDayType (dayType) {
      if (dayType === '今日') {
        this.patients = this.patients0
      } else if (dayType === '昨日') {
        this.patients = this.patients1

      } else {
        this.patients = this.patients2

      }
      console.log('this.patients2', this.patients);

      this.id = this.patients[0].id
      this.getHead(this.id)

    }
  },
  mounted () {
    this.getPatient()




    this.$notify.info({
      title: '提醒',
      dangerouslyUseHTMLString: true,
      message: "请注意，您今日还有 <span class='red'>待执行</span> 医嘱",
      type: 'warning',
      offset: 140
    });
    this.$notify({
      title: '通知',
      dangerouslyUseHTMLString: true,

      message: "您的病人 <span class='red'>测试人 </span>检查结果已出,请查收",
      type: 'success',
      offset: 220

    });
    this.$notify.error({
      title: '警告',
      dangerouslyUseHTMLString: true,

      message: "当前阶段费用 <span class='red'>已超出 </span> DRG规定费用",
      offset: 300
    });
    const h = this.$createElement
    this.$msgbox({
      title: '此诊断提醒',
      message: h('p', null, [
        h('span', null, '该病人的'),
        h('span', { class: 'red' }, '淋巴细胞血栓'),
        h('span', null, '结果显示术后感染,已加入次诊断,是否移除?')
      ]),
      confirmButtonText: '确定',
      showCancelButton: true,
      cancelButtonText: "取消",
      callback: action => {
        // this.$message({
        //   type: 'info',
        //   message: `action: ${action}`
        // });
      }
    });


  },
  watch: {
    '$route.query.id': function (newV) {
      if (newV === 'orderInfo') {
        this.type === '医嘱信息'
        console.log('this.$refs.orderInfo', this.$refs);
        this.$refs.orderInfo.closeDia()

      }
    }
  }
}
</script>
 
<style lang="scss" scoped>
.cp-patient {
  padding: 10px;
  box-sizing: border-box;
  height: calc(100% - 60px);
  display: flex;
  .left {
    width: 240px;
    height: 100%;
    .list {
      overflow-y: auto;
      height: 100%;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  .right {
    margin-left: 10px;
    width: calc(100% - 240px);
    height: 100%;
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
      .main-center {
        width: 100%;
        overflow-x: scroll;
      }
    }
  }
}
::v-deep .el-card__body {
  padding: 10px !important;
}
::v-deep .el-dialog__header {
  display: none !important;
}
::v-deep .el-card__body {
  height: 100%;
}
</style>

</style>
 



