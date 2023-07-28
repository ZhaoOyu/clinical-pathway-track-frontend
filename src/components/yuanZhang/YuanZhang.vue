<template>
  <div class="monitor">
    <div class="headWapper">
      <div class="tra1">
        <div class="notice">{{ notice }}</div>
        <div class="block">区块数:{{ blockNumber }}</div>
        <div class="node">交易数:{{ nodeNumber }}</div>
        <div class="honors">
          <div class="inner">
            <el-popover
              placement="top-start"
              title="全国医疗质量管理案例优秀奖"
              width="300"
              trigger="hover"
              style="margintop: 6px"
            >
              <div class="detail" style="display: flex">
                <div class="left">
                  <div class="first bold" style="margintop: 5px">获得时间:</div>
                  <div class="second bold" style="margintop: 10px">
                    所做贡献:
                  </div>
                </div>
                <div class="right">
                  <div class="first" style="margintop: 5px; marginleft: 4px">
                    2018/04/18 - 2018/12/18
                  </div>
                  <div class="second" style="margintop: 10px; marginleft: 4px">
                    慢性病就诊人数下降百分之26%
                  </div>
                </div>
              </div>
              <svg class="icon" aria-hidden="true" slot="reference">
                <use xlink:href="#icon-jiangbei-" />
              </svg>
            </el-popover>
            <el-popover
              placement="top-start"
              title="全国医疗质量管理案例卓越奖"
              width="300"
              trigger="hover"
            >
              <div class="detail" style="display: flex">
                <div class="left">
                  <div class="first bold" style="margintop: 5px">获得时间:</div>
                  <div class="second bold" style="margintop: 10px">
                    所做贡献:
                  </div>
                </div>
                <div class="right">
                  <div class="first" style="margintop: 5px; marginleft: 4px">
                    2019/02/18 - 2019/11/18
                  </div>
                  <div class="second" style="margintop: 10px; marginleft: 4px">
                    医护人员满意度达到96%
                  </div>
                </div>
              </div>
              <svg class="icon" aria-hidden="true" slot="reference">
                <use xlink:href="#icon-jiangbei" />
              </svg>
            </el-popover>
            <el-popover
              placement="top-start"
              title="科室质量安全奖"
              width="300"
              trigger="hover"
              style="margintop: 6px"
            >
              <div class="detail" style="display: flex">
                <div class="left">
                  <div class="first bold" style="margintop: 5px">获得时间:</div>
                  <div class="second bold" style="margintop: 10px">
                    所做贡献:
                  </div>
                </div>
                <div class="right">
                  <div class="first" style="margintop: 5px; marginleft: 4px">
                    2020/04/09 - 2019/11/09
                  </div>
                  <div class="second" style="margintop: 10px; marginleft: 4px">
                    没有发生明显的安全隐患
                  </div>
                </div>
              </div>
              <svg class="icon" aria-hidden="true" slot="reference">
                <use xlink:href="#icon-jiangbei-1" />
              </svg>
            </el-popover>
          </div>
        </div>
      </div>
      <!-- head -->
      <div class="head" style="position: relative">
        <div class="title">智慧医疗平台</div>
        <div class="sub-title">{{ hospital }}</div>
      </div>
      <div class="head1"></div>
    </div>
    <div class="wrapper">
      <div class="operation-platform">
        <el-button
          @click="$router.push('/operationPlatform')"
          type="primary"
          round
          >医疗运营管理平台</el-button
        >
      </div>
      <div class="navs">
        <div class="nav-item">
          <Card
            :number="drg"
            word="DRG盈亏(万)"
            desc="The Drg Profit  situation"
            iconClass="icon-yibaoka"
          ></Card>
        </div>
        <div class="nav-item">
          <Card
            :number="abnormalNumber"
            word="异常数"
            desc="The Number of Abnormal"
            iconClass="icon-yichang"
          ></Card>
        </div>
        <div class="nav-item">
          <Card
            :number="jingdouNumber"
            word="平安果数"
            desc="The Number of Fruit"
            iconClass="icon-yichang"
          ></Card>
        </div>
        <div class="nav-item">
          <Card
            :number="guokao"
            word="国考分数"
            desc="The Score of Exam"
            iconClass="icon-yichang"
          ></Card>
        </div>
        <div class="nav-item">
          <Card
            :number="doctorNumber"
            :word="doctorWord"
            desc="The Total Doctor Number"
            iconClass="icon-shouye"
          ></Card>
        </div>
        <div class="nav-item">
          <Card
            :number="patientsNumber"
            :word="patientWord"
            desc="The Total Patients Number"
            iconClass="icon-wodehuanzhe"
          ></Card>
        </div>
        <div class="nav-item">
          <Card
            :number="totalPeopleNumber"
            word="累计看病人次"
            desc="The Total People Number"
            iconClass="icon-zongrenshu"
          ></Card>
        </div>
      </div>
      <div class="monitor-platform">
        <el-button
          @click="$router.push('/monitorPlatform')"
          type="primary"
          round
          >医疗质量监管平台</el-button
        >
      </div>
      <!-- content -->
      <div class="center">
        <div class="left">
          <div class="earn">
            <drg />
          </div>
          <!-- <div class="pinganguo">
            <jing-dou></jing-dou>
          </div> -->
          <div class="drgInfoShow">
            <infoShow></infoShow>
          </div>
        </div>
        <div class="middle">
          <earlyWarning @clickDepartment="handleClickDepartment"></earlyWarning>
        </div>
        <div class="right">
          <div class="earlyWarnings">
            <early-warnings></early-warnings>
          </div>
          <div class="guokao">
            <guo-kao></guo-kao>
          </div>
        </div>
      </div>
      <!-- footer -->
      <div class="bottom2">
        <div class="left">
          <img src="./1.png" />
        </div>

        <div class="pinganguo">
          <jing-dou></jing-dou>
        </div>

        <div class="right">
          <ping-rank></ping-rank>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "./component/Head.vue";
import Card from "./component/Card.vue";
import Departments from "./component/Departments.vue";
import TotalSalary from "./component/TotalSalary.vue";
import Payment from "./component/payment.vue";
import Patient from "./component/patient.vue";
import Drg from "./component/Drg.vue";
import earlyWarning from "./component/earlyWarning.vue";
import earlyWarnings from "./component/earlyWarnings.vue";
import yuyueNumberComparison from "./component/yuyueNumberComparison.vue";
import hotSlow from "./component/hotSlow.vue";
import JingDou from "./component/JingDou.vue";
import GuoKao from "./component/GuoKao.vue";
import PingRank from "./PingRank.vue";
import infoShow from "./component/infoShow.vue";
import {getPresidentTotal,getPresidentGuokao,getPresidentDrgWarning,getPresidentDrgInfo,getPresidentDepartmentWarnings,getPresidentAppleRankDoctor,getPresidentAppleRankDepartment,getPresidentAppleNumber} from "./../../api/yuanZhang.js"
import { getPatientInfo } from "@/api/drg-management";


export default {
  components: {
    Head,
    Card,
    Departments,
    TotalSalary,
    Payment,
    Drg,
    earlyWarnings,
    yuyueNumberComparison,
    hotSlow,
    JingDou,
    earlyWarning,
    GuoKao,
    PingRank,
    infoShow,
    Patient,
  },

  data() {
    return {
      PresidentTotal:[],
      jingdouNumber: 1426,
      guokao: 37,
      drg: "120/-41",
      doctorNumber: 584,
      doctorWord: "医生在线人数",
      patientsNumber: 503,
      patientWord: "患者用户人数",
      totalPeopleNumber: 2479109,
      totalIncome: 47991,
      totalOutcome: 45875,
      totalInsurance: 2456,
      abnormalNumber: 7369,
      hospital: "",
      blockNumber: 24600,
      nodeNumber: 486300,
      notices: ["! 发热人数增多", "! 外科预警数量较多", "! 慢性病数量增多"],
      notice: "! 发热人数增多",
    };
  },
  computed: {},
  watch:{
    PresidentTotal:{
      handler(){
        this.putPresidentTotal()
      }
    }
  },
  created() {
    getPresidentTotal().then(res=>{
      this.PresidentTotal = res
    })
  },
  mounted() {
    this.$notify.error({
      title: "警告",
      dangerouslyUseHTMLString: true,

      message: "存在 <span class='red'> 3</span> 条违规记录,点击查看",
      offset: 100,
    });
    this.$nextTick(() => {
      let el = document.querySelector(".el-notification");
      el.addEventListener("click", () => {
        this.$router.push({
          path: "/feixing",
        });
      });
    });
    const hospital = this.$route.query.hospital;
    this.hospital = hospital;
    let i = 1;

    setInterval(() => {
      this.notice = this.notices[i++ % 3];
      if (i % 2 === 0) {
        this.doctorWord = "(门诊+住院)人数";
        this.doctorNumber = `${this.PresidentTotal[0].consultationNumber}+${this.PresidentTotal[0].hospitaliserNumber}`;
        this.patientWord = "(挂号+住院)人数";
        this.patientsNumber = `${this.PresidentTotal[0].registerNumber}+${this.PresidentTotal[0].hospitaliserNumber}`;
      } else {
        this.doctorWord = "医生在线人数";
        this.doctorNumber = `${this.PresidentTotal[0].doctorNumber}`;
        this.patientWord = "患者用户人数";
        this.patientsNumber = `${this.PresidentTotal[0].patientNumber}`;
      }
    }, 3000);
    setInterval(() => {}, 3000);
  },
  methods: {
    // handleMouseLeave (type) {
    //   if (type === 0) {
    //     this.doctorWord = "医生在线人数"
    //     this.doctorNumber = "584"
    //   } else {
    //     this.patientWord = "患者用户人数"
    //     this.patientsNumber = "503"
    //   }
    // },
    // handleMouseEnter (type) {
    //   if (type === 0) {
    //     this.doctorWord = "(门诊+住院)人数"
    //     this.doctorNumber = "246+438"
    //   } else {
    //     this.patientWord = "(挂号+住院)人数"
    //     this.patientsNumber = "365+138"
    //   }
    // },
    handleClickDepartment(department) {
      console.log("department", department);
      this.$store.commit("changeDepartment", department);
    },

    putPresidentTotal(){
      this.drg = `${this.PresidentTotal[0].drgIn}/${this.PresidentTotal[0].drgOut}`
      this.abnormalNumber = this.PresidentTotal[0].abnormalNumber
      this.jingdouNumber = this.PresidentTotal[0].appleNumber
      this.guokao = this.PresidentTotal[0].examScore
      this.doctorNumber = this.PresidentTotal[0].doctorNumber
      this.totalPeopleNumber = this.PresidentTotal[0].totalNumber
      this.patientsNumber = this.PresidentTotal[0].patientNumber
    },
  },
};
</script>
<style scoped >
/* /deep/ .el-card__body {
  padding: 0;
} */

::v-deep .el-card__body {
  padding: 0;
}
</style>
<style lang="scss" scoped>
.monitor {
  width: 100%;
  height: 100%;
  background: #081326;
  .headWapper {
    height: 12%;
    width: 100%;
    z-index: 2;
  }
  .head {
    height: 12%;
    width: 50%;
    display: flex;
    margin-left: 25%;
    justify-content: center;
    align-items: center;
    //background: url("component/img/header.png");
    background-size: 100% 100%;
    border-top: 80px solid #0e1d38;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;

    z-index: 999;
    display: flex;

    .title {
      margin-top: -10%;
      color: white;
      font-size: 32px;
      font-weight: bold;
    }
    .sub-title {
      color: white;

      margin-top: -8%;
      font-size: 20px;
      font-weight: bold;
      margin-left: 20px;
    }
  }
  .head1 {
    height: 12%;
    width: 50%;
    display: flex;
    margin-left: 25%;
    justify-content: center;
    align-items: center;
    //background: url("component/img/header.png");
    background-size: 100% 100%;
    border-top: 80px solid #3a77e6;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    color: white;
    font-size: 32px;
    font-weight: bold;
    position: absolute;
    top: 1px;
    z-index: 777;
  }
  .tra1 {
    position: absolute;
    top: 0;
    height: 5%;
    width: 100%;
    background: #0e1d38;
    border-bottom: 1px solid #3a77e6;
    z-index: 888;
    display: flex;
    align-items: center;
    .block {
      color: white;
      font-size: 16px;
      position: absolute;
      width: 100px;

      left: 20px;
    }
    .node {
      color: white;
      font-size: 16px;
      position: absolute;

      width: 120px;
      left: 140px;
    }
    .honors {
      position: absolute;
      left: 260px;
      text-align: center;
      .inner {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;

        .icon {
          width: 32px;
          height: 32px;
          cursor: pointer;
          margin-right: 2px;
        }
      }
    }
    .notice {
      color: #f35833;
      font-size: 16px;
      position: absolute;

      right: 20px;
    }
  }
  .wrapper {
    height: 88%;
    width: 98%;
    padding-left: 2%;
    box-sizing: border-box;
    .navs {
      height: 15%;
      display: flex;
      width: 100%;
      margin-left: 2%;
      .nav-item {
        display: flex;
        flex: 1;
        background-color: #081326;
        color: white;
        border: #081326 solid 1px;
        .el-card {
          border: #081326 solid 1px;
        }
      }
    }
    /* .center {
      height: 40%;
      display: flex;
      padding-top: 10px;
      box-sizing: border-box;
      .input-output {
        flex: 1 0 30%;
        background: red;
        margin-right: 5px;
      }
      .salary {
        flex: 1 0 30%;
        background: #081326;
        margin-left: 2px;
        margin-right: 5px;
      }
      .earlyWarnings {
        flex: 1 0 40%;
      }

      .error {
        flex: 1 0 20%;
        background: #081326;
        margin-left: 2px;
        margin-right: 5px;
      } 
    } */
    .bottom {
      height: 40%;
      display: flex;
      padding-top: 10px;
      box-sizing: border-box;
      .percentage {
        background: #081326;
        flex: 1 0 30%;
        margin-right: 5px;
      }
      .yuyue {
        flex: 1 0 30%;
        background: #081326;
        margin-left: 2px;
        margin-right: 5px;
      }
      .peopleNumber {
        flex: 1 0 40%;
      }
    }
    .center {
      height: 82%;
      display: flex;
      justify-content: center;
      width: 100%;
      .left {
        width: 30%;
        height: 100%;

        padding-right: 10px;
        box-sizing: border-box;
        .earn {
          height: 50%;
          width: 100%;
          padding-bottom: 10px;
          box-sizing: border-box;
        }

        .drgInfoShow {
          padding-top: 10px;
          box-sizing: border-box;
          height: 50%;
          width: 100%;
        }
      }
      .middle {
        width: 40%;
        height: 100%;
      }
      .right {
        box-sizing: border-box;
        height: 100%;
        padding-left: 10px;
        width: 30%;
        .earlyWarnings {
          height: 50%;
          width: 100%;
          padding-bottom: 10px;
          box-sizing: border-box;
        }
        .guokao {
          height: 50%;
          width: 100%;
          padding-top: 10px;
          box-sizing: border-box;
        }
      }
    }
  }
}
.bottom2 {
  background: #081326;
  width: 105%;
  margin-left: -3%;
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  img {
    width: 100%;
  }
  .pinganguo {
    // padding-top: 10px;
    // box-sizing: border-box;
    height: 400px;
    width: 600px;
  }
  .right {
    width: 30%;
    height: 100%;
  }
}
.monitor-platform {
  cursor: default;
  text-align: right;
  position: absolute;
  top: 50px;
  right: 10px;
}
.operation-platform {
  cursor: default;
  text-align: right;
  position: absolute;
  top: 50px;
  left: 10px;
}
</style>
