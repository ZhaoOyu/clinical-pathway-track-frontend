<template>
  <div class="drg-management">
    <div class="left">
      <el-card class="el-card drg-info">
        <div class="wrapper">
          <div class="header">
            <div class="input-wrapper">
              <el-form inline>
                <el-form-item label="入院时间:">
                  <el-input size="mini" v-model="enterTime" placeholder="入院时间"></el-input>
                </el-form-item>
                <el-form-item label="入组DRG名称:">
                  <el-input size="mini" v-model="drgName" placeholder="入组DRG名称"></el-input>
                </el-form-item>
                <el-form-item label="病人姓名:">
                  <el-input size="mini" v-model="patientName" placeholder="病人姓名"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="btn-wrapper">
              <el-button size="mini" type="primary" icon="el-icon-search">搜索</el-button>
            </div>
          </div>
        </div>

        <div style="height:500px;">
            <div class="table">
              <!-- 竖向滚动条 -->
              <!-- <el-scrollbar style="height: 120%; width: 102%;" class="scrollbar"> -->
                <el-table :data="drgTable.slice((currentPage-1)*pagesize, currentPage*pagesize)" 
                          :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }" 
                          style="width: 100%;" size="mini" @row-click="handleRowClick">
                  <el-table-column prop="dept" label="科室"></el-table-column>
                  <el-table-column prop="hospitalNo" label="医保号"></el-table-column>
                  <el-table-column prop="name" label="姓名"></el-table-column>
                  <el-table-column prop="phoneNumber" label="手机号码"></el-table-column>
                  <el-table-column prop="doctorName" label="医生姓名"></el-table-column>
                  <el-table-column prop="enterTime" label="入院时间" width="100"></el-table-column>
                  <el-table-column prop="diasease" label="疾病" width="120"></el-table-column>
                  <el-table-column prop="drg" label="drg入组信息" width="100"></el-table-column>
                  <el-table-column prop="totalMoney" label="总金额"></el-table-column>
                  <el-table-column prop="rate" label="费用使用率"></el-table-column>
                  <el-table-column prop="earn" label="盈亏"></el-table-column>
                  <el-table-column prop="count" label="平安果">
                    <template slot-scope="scope">
                      <span class="appleColor" :style="{fontSize:'14px'}">
                        <i class="iconfont icon-pingguo" style="color:#E64C65; fontSize:14px"></i>
                        <span class="appleColor" :style="{fontSize:'14px'}">{{scope.row.count}}</span>
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              <!-- </el-scrollbar> -->
              
              <!-- handleSizeChange为pagesize发生改变时的相应函数	-->
              <!-- handleCurrentChange为currentpage发生改变时的相应函数	-->
              <!-- page-sizes为所有可选择的page-size。可以自己更改其中的数字 设置多少条一页 -->
              <!-- layout为附带的功能，一般不用动它 --> 
              <!--total为总数据数 -->
              <div class="yema" style="text-align: center;position: fixed; bottom: 351px; width: 40%; line-height: var(--footer-height);">
                  <el-pagination background
                    @size-change="handleSizeChange" 
                    @current-change="handleCurrentChange"  
                    :current-page="currentPage"  
                    :page-sizes="[5,10]"
                    :page-size="pagesize"   
                    layout="prev, pager, next, sizes, jumper, ->, total"
                    :total="drgTable.length">
                  </el-pagination>
              </div>
            </div>
        </div>        
      </el-card>

      <div class="patientDRG" id="patientDRG">

      </div>
      
    </div>
    <div class="right">
      <el-card class="detail">
        <div class="title">DRG详情</div>
        <div class="info">
          <div class="blueBack">病人信息</div>
          <div class="info-detail">
            <div class="left">
              <div class="name">
                姓名:
                <span class="blueLine">{{patient.name}}</span>
              </div>
              <div class="sex">
                性别:
                <span class="blueLine">{{patient.sex}}</span>
              </div>
              <div class="birthday">
                出生日期:
                <span class="blueLine">{{patient.birthday}}</span>
              </div>
              <div class="phoneNumber">
                手机号码:
                <span class="blueLine">{{patient.phoneNumber}}</span>
              </div>
            </div>
            <div class="middle">
              <div class="enterTime">
                入院时间:
                <span class="blueLine">{{patient.enterTime}}</span>
              </div>
              <div class="dept">
                入院科室:
                <span class="blueLine">{{patient.dept}}</span>
              </div>
              <div class="roomNo">
                病房:
                <span class="blueLine">{{patient.room}}</span>
              </div>
              <div class="doctorName">
                主治医生:
                <span class="blueLine">{{patient.doctorName}}</span>
              </div>
            </div>
            <div class="right">
              <div class="diasease">
                就诊疾病:
                <span class="blueLine">{{patient.diasease}}</span>
              </div>
              <div class="phoneNumber">
                住院时间:
                <span class="blueLine">{{patient.days}}</span>
              </div>
              <div class="phoneNumber">
                花费费用:
                <span class="blueLine">{{patient.totalMoney}}</span>
              </div>
              <div class="phoneNumber">
                付费方式:
                <span class="blueLine">{{patient.payType}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="drg1">
          <!-- <div class="blueBack">费用管理</div> -->
          <div class="title-inner blueBack">
            <span class="green1">费用管理</span>

            <div class="apple">
              <el-tag size="mini" type="danger" effect="dark" style="marginRight:4px">高倍组预警</el-tag>
              <!-- <i class="iconfont icon-pingguo" style="color:#E64C65;fontSize:16px"></i>

              <span class="green1">-10</span>-->
              <!-- <el-tag size="mini" type="danger">高倍组预警</el-tag> -->
            </div>
          </div>
          <div class="drg-detail">
            <div class="left">
              <div class="name">
                DRG:
                <span>IB29</span>
              </div>
              <div class="name">
                支付标准:
                <span>637.182元</span>
              </div>
              <div class="name">
                标准权重:
                <span>1.167</span>
              </div>
              <div class="name">
                DRG付费类型:
                <span>高倍组付费</span>
              </div>

              <!-- <div class="name">
                标准住院日:
                <span>19天</span>
              </div>-->
            </div>

            <div class="right">
              <div class="name">
                名称:
                <span>静脉输液治疗</span>
              </div>
              <div class="name">
                实际总费用:
                <span>964.35元</span>
              </div>
              <div class="name">
                实际权重:
                <span>1.733</span>
              </div>
              <div class="name">
                医院亏损:
                <span>-327.168元</span>
              </div>

              <!-- <div class="name">
                DRG支付:
                <span>637.182元</span>
              </div>
              <div class="name">
                结余留用:
                <span>-823元</span>
              </div>-->
            </div>
          </div>
          <div class="title-inner">
            <div class="title1">费用情况</div>
            <!-- <div class="apple">
              <span class="green1">亏损</span>
              <i class="iconfont icon-pingguo" style="color:#E64C65;fontSize:16px"></i>

              <span class="green1">-10</span>
            </div>-->
          </div>
          <div class="chart">
            <div id="chart2"></div>
            <div class="table2">
              <div class="info1">
                医院盈亏情况
                <span class="red">亏损2204元</span>
              </div>
              <el-table :data="money" size="mini">
                <el-table-column prop="money" label="类型"></el-table-column>
                <el-table-column prop="calc" label="盈亏金额"></el-table-column>
                <el-table-column prop="res" label="原因">
                  <template slot-scope="scope">
                    <span>{{scope.row.res}}</span>
                    <el-tag
                      size="mini"
                      type="danger"
                      @click="$router.push('/cpPatient')"
                      style="cursor:pointer"
                    >查看详情</el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
 
<script>
import * as echarts from 'echarts'
export default {
  data () {
    return {
      //左上角人员换页参数
      currentPage: 1,
      pagesize: 10,

      //左下角折线图参数
      echartsPatientDRG: "",
      optionDataPatient: ["48", "73", "43", "65", "97"],
      optionDataPatientDRG: ["57", "62", "43", "77", "100"],

      money: [
        { money: '医技', calc: "980(实际费用) - 2000(标准费用)= -1020元", res: " 临床路径第 二 阶段超出1020元" },
        { money: '医耗', calc: "1020(实际费用) - 1980(标准费用)= -960元", res: " 临床路径第 三 阶段超出960元 " },
      ],
      enterTime: "",
      drgName: "",
      patientName: "",
      drgTable: [
        {
          dept: "内分泌科", hospitalNo: "A4549794", name: "赵长英", phoneNumber: "42", doctorName: "王医生", diasease: "2型糖尿病", drg: "糖尿病疾患", totalMoney: "2749", rate: "273%", earn: '-1741.98', count: "-10", enterTime: "2022-06-29"
        },        {
          dept: "内分泌科", hospitalNo: "90044292", name: "徐玉秀", phoneNumber: "45", doctorName: "王医生", diasease: "2型糖尿病", drg: "糖尿病疾患", totalMoney: "2749", rate: "273%", earn: '-1741.98', count: "-10", enterTime: "2022-06-29"
        },        {
          dept: "内分泌科", hospitalNo: "A2075171", name: "吴啟明", phoneNumber: "45", doctorName: "王医生", diasease: "2型糖尿病", drg: "糖尿病疾患", totalMoney: "2749", rate: "273%", earn: '-1741.98', count: "-10", enterTime: "2022-06-29"
        },        {
          dept: "内分泌科", hospitalNo: "A9091146", name: "潘洁", phoneNumber: "54", doctorName: "王医生", diasease: "2型糖尿病", drg: "糖尿病疾患", totalMoney: "2749", rate: "273%", earn: '-1741.98', count: "-10", enterTime: "2022-06-29"
        },        {
          dept: "内分泌科", hospitalNo: "A9003673", name: "姚彩琴", phoneNumber: "65", doctorName: "王医生", diasease: "2型糖尿病", drg: "糖尿病疾患", totalMoney: "2749", rate: "273%", earn: '-1741.98', count: "-10", enterTime: "2022-06-29"
        },        {
          dept: "内分泌科", hospitalNo: "A1711723", name: "李长武", phoneNumber: "43", doctorName: "王医生", diasease: "2型糖尿病", drg: "糖尿病疾患", totalMoney: "2749", rate: "273%", earn: '-1741.98', count: "-10", enterTime: "2022-06-29"
        },        {
          dept: "内分泌科", hospitalNo: "20347456", name: "蔡辉英", phoneNumber: "38", doctorName: "王医生", diasease: "2型糖尿病", drg: "糖尿病疾患", totalMoney: "2749", rate: "273%", earn: '-1741.98', count: "-10", enterTime: "2022-06-29"
        },        {
          dept: "内分泌科", hospitalNo: "A7269940", name: "尹小武", phoneNumber: "55", doctorName: "王医生", diasease: "2型糖尿病", drg: "糖尿病疾患", totalMoney: "2749", rate: "273%", earn: '-1741.98', count: "-10", enterTime: "2022-06-29"
        },        {
          dept: "内分泌科", hospitalNo: "90031836", name: "张家松", phoneNumber: "52", doctorName: "王医生", diasease: "2型糖尿病", drg: "糖尿病疾患", totalMoney: "2749", rate: "273%", earn: '-1741.98', count: "-10", enterTime: "2022-06-29"
        },        {
          dept: "内分泌科", hospitalNo: "A1512443", name: "李正勇", phoneNumber: "41", doctorName: "王医生", diasease: "2型糖尿病", drg: "糖尿病疾患", totalMoney: "2749", rate: "273%", earn: '-1741.98', count: "-10", enterTime: "2022-06-29"
        },        {
          dept: "内分泌科", hospitalNo: "90672838", name: "焦厚平", phoneNumber: "48", doctorName: "王医生", diasease: "2型糖尿病", drg: "糖尿病疾患", totalMoney: "2749", rate: "273%", earn: '-1741.98', count: "-10", enterTime: "2022-06-28"
        },        {
          dept: "内分泌科", hospitalNo: "90007234", name: "苏志强", phoneNumber: "35", doctorName: "王医生", diasease: "2型糖尿病", drg: "糖尿病疾患", totalMoney: "2749", rate: "273%", earn: '-1741.98', count: "-10", enterTime: "2022-06-28"
        },        {
          dept: "内分泌科", hospitalNo: "90324156", name: "康忠权", phoneNumber: "67", doctorName: "王医生", diasease: "2型糖尿病", drg: "糖尿病疾患", totalMoney: "2749", rate: "273%", earn: '-1741.98', count: "-10", enterTime: "2022-06-28"
        },        {
          dept: "内分泌科", hospitalNo: "AA779782", name: "程秀珍", phoneNumber: "69", doctorName: "王医生", diasease: "2型糖尿病", drg: "糖尿病疾患", totalMoney: "2749", rate: "273%", earn: '-1741.98', count: "-10", enterTime: "2022-06-28"
        },        {
          dept: "内分泌科", hospitalNo: "90073252", name: "张之震", phoneNumber: "50", doctorName: "王医生", diasease: "2型糖尿病", drg: "糖尿病疾患", totalMoney: "2749", rate: "273%", earn: '-1741.98', count: "-10", enterTime: "2022-06-28"
        },        {
          dept: "内分泌科", hospitalNo: "90073252", name: "张之震", phoneNumber: "50", doctorName: "王医生", diasease: "2型糖尿病", drg: "糖尿病疾患", totalMoney: "2749", rate: "273%", earn: '-1741.98', count: "-10", enterTime: "2022-06-28"
        },        {
          dept: "内分泌科", hospitalNo: "90073252", name: "张之震", phoneNumber: "50", doctorName: "王医生", diasease: "2型糖尿病", drg: "糖尿病疾患", totalMoney: "2749", rate: "273%", earn: '-1741.98', count: "-10", enterTime: "2022-06-28"
        }
      ],
      patient: {},
      options: {},

    }
  },
  mounted () {
    //左下角折线图
    this.$nextTick(function () {
      this.drawLine("patientDRG");
    });

    this.patient = {
      ...this.drgTable[0],
      birthday: "1977.03.08",
      room: '内分泌科一病区',
      days: '12天',
      payType: "医保",
      sex: '男'
    }
    this.option = {
      color: ['#27b148', '#2979ff'],
      title: {
        text: '医疗花费',

      },
      legend: {
        data: ['实际花费', '平均花费']
      },
      radar: {
        //shape: 'circle',
        indicator: [
          { name: '医疗', max: 6500 },
          { name: '护理', max: 16000 },
          { name: '管理', max: 30000 },
          { name: '医技', max: 38000 },
          { name: '医耗', max: 52000 }
        ]
      },
      series: [
        {
          name: '实际 vs 平均',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: '实际花费'
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: '平均花费'
            }
          ]
        }
      ]
    };

    var chartDom = document.getElementById('chart2');
    var myChart = echarts.init(chartDom);
    this.option && myChart.setOption(this.option);
  },
  methods: {
    //左下角折线图
    drawLine(id) {
      this.echartsPatientDRG = echarts.init(document.getElementById(id));
      this.echartsPatientDRG.setOption({
        tooltip: {
          trigger: "axis",
        },
        title: {
          // text: this.echartsPatientName,
          text: '患者每日花费'
        },
        legend: {
          data: ["每日花费", "DRG每日花费"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {},
        //   },
        // },
        xAxis: {
          type: "category",
          // boundaryGap: false,
          data: ["2022-5-11", "2022-5-12", "2022-5-13", "2022-5-14", "2022-5-15"],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: '{value} 元'
          },
        },
 
        series: [
          {
            name: "每日花费",
            type: "line",
            smooth: true,
            // stack: "总量",
            data: this.optionDataPatient,
          },
          {
            name: "DRG每日花费",
            type: "line",
            smooth: true,
            // stack: "总量",
            data: this.optionDataPatientDRG,
          },
        ],
      });
    },

    ///分页,初始页currentPage、初始每页数据数pagesize和数据testpage
    handleSizeChange(pageSize){
      this.currentPage=1;
      this.pagesize=pageSize;
    },
    handleCurrentChange(currentPage){
      this.currentPage=currentPage;
    },

    //右上角表格联动
    handleRowClick (row, column, e) {
      console.log('row', row, column);
      
      this.patient = {
        ...row,
        birthday: "1977.03.10",
        room: '内分泌科一病区',
        days: '12天',
        payType: "医保",
        sex: '男',
      };
    },
  }
}
</script>
 
<style lang="scss" scoped>

.drg-management {
  width: 100%;
  display: flex;
  padding: 10px 20px 10px 20px;
  height: calc(100% - 60px);
  box-sizing: border-box;
  .left {
    width: 50%;
    margin-left: 1%;
    margin-right: 1%;
    .el-card {
      height: 62%;
      width: 100%;

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: -15px;
        height: 60px;
      }
      .table {
        margin-left: -15px;
        margin-top: 10px;
        height: 80%;
        width: 100%;
      }
    }

    .patientDRG {
      height: 37%;
      width: 100%;
      margin-top: 1%;
    }
  }
  .right {
    width: 49%;
    margin-left: 1%;
    /* height: 100%; */

    .detail {
      height: 100%;

      .title {
        font-size: 20px;
        font-weight: bold;
      }
      .info {
        margin-top: 10px;

        .info-detail {
          display: flex;
          justify-content: center;
          .left,
          .right,
          .middle {
            flex: 1;
            font-size: 13px;
            div {
              margin-top: 10px;
              margin-left: 8px;
            }
          }
        }
      }
    }
    .drg1 {
      margin-top: 15px;

      .title-inner {
        margin-top: 5px;

        display: flex;
        justify-content: space-between;
        font-size: 13px;
        height: 28px;
        border-bottom: 2px #d1d1fe solid;
        align-items: center;
        padding-left: 8px;

        .title1 {
          font-weight: bold;
        }
        .apple {
          .green1 {
            color: #27b148;
            font-weight: bold;
            margin-right: 40px;
          }
        }
      }
      .drg-detail {
        font-size: 13px;
        display: flex;
        .left,
        .right {
          div {
            margin-top: 10px;
            margin-left: 8px;
          }
        }
      }
      .chart {
        width: 100%;
        height: 37vh;
        margin-top: 10px;
        display: flex;
        overflow: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        #chart2 {
          width: 50%;
          height: 130%;
        }
        .table2 {
          overflow: scroll;
          &::-webkit-scrollbar {
            display: none;
          }
          width: 50%;
          height:250%;
        }
      }
    }
  }
}
.blueBack {
  color: white;
  background: #2979ff;
  font-size: 13px;
  font-weight: bold;
  border-radius: 8px;
  height: 28px;
  display: flex;
  padding-left: 8px;
  align-items: center;
}
.blueLine {
  font-weight: bold;
  color: #2979ff;
  /* text-decoration: underline; */
  border-bottom: 2px #2979ff solid;
}
::v-deep .el-input__inner {
  width: 110px !important;
}
::v-deep .el-form-item {
  margin-bottom: 0px !important;
}
.info1 {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>