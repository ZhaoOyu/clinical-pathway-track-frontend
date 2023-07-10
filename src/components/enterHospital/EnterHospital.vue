<template>
  <div class="enter-hospital">
    <div class="wrapper">
      <div class="head">
        <el-button type="primary" @click="addPatient">新增病人</el-button>
        <div class="input-wrapepr" style="display:flex">
          <el-select v-model="department" placeholder="脊柱一科" style="marginRight:20px">
            <el-option
              v-for="item in departments"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="place" placeholder="12栋213" style="marginRight:20px">
            <el-option
              v-for="item in inpatientBuildings"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <div class="btn-wrapper">
            <el-button type="primary">搜索</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="tab" v-if="patients0.length">
        <div class="line"></div>
        <div class="message">今日</div>
      </div>
      <div class="card-main">
        <el-card v-for="(patient,index) in patients0" :key="index">
          <div slot="header" class="clearfix">
            <!-- <span>{{patient.bedNumber}}号床</span> -->
            <span v-if="patient.name">{{patient.name}}</span>

            <el-tag size="mini" type="success" effect="dark" v-if="patient.admitTime && !patient.dischargeTime">已入院</el-tag>
            <el-tag size="mini" type="danger" effect="dark" @click="enterHospital(patient)" v-if="!patient.admitTime && !patient.dischargeTime">入院</el-tag>
            <el-tag size="mini" type="primary" effect="dark" @click="enterHospital(patient)" v-if="patient.admitTime && patient.dischargeTime">已出院</el-tag>
          </div>
          <div>
            <div class="firstline">
              <span>序号:{{patient.id}}</span>
              <span>{{patient.gender === 1?'男':"女"}}</span>
              <span>{{patient.age}}岁</span>
            </div>
            <div class="secondline">
              <span>入院时间:{{new Date(patient.admitTime).format("yyyy-MM-dd")}}</span>
            </div>
            <div class="secondline">
              <span>出院时间:{{patient.dischargeTime?new Date(patient.dischargeTime).format("yyyy.MM.dd"):"未出院"}}</span>
            </div>
            <!-- <div class="secondline">
              <span>病况:{{patient.type}}</span>
            </div>-->
            <div class="forthline">
              <span>付款方式:{{patient.medicalPaymentType?patient.medicalPaymentType.slice(0,10):""}}</span>
            </div>
            <div class="fifthline">
              <span class="red">欠费</span>
              <span class="red">0元</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="tab" v-if="patients1.length">
        <div class="line"></div>
        <div class="message">昨日</div>
      </div>
      <div class="card-main">
        <el-card v-for="(patient,index) in patients1" :key="index">
          <div slot="header" class="clearfix">

            <span>{{patient.name}}</span>

            <el-tag
              size="mini"
              type="success"
              effect="dark"
              v-if="patient.admitTime && !patient.dischargeTime"
            >已入院</el-tag>
            <el-tag
              size="mini"
              type="danger"
              effect="dark"
              @click="enterHospital(patient)"
              v-if="!patient.admitTime && !patient.dischargeTime"
            >入院</el-tag>
            <el-tag
              size="mini"
              type="primary"
              effect="dark"
              @click="enterHospital(patient)"
              v-if="patient.admitTime && patient.dischargeTime"
            >已出院</el-tag>
          </div>
          <div>
            <div class="firstline">
              <span>序号:{{patient.id}}</span>
              <span>{{patient.gender === 1?'男':"女"}}</span>
              <span>{{patient.age}}岁</span>
            </div>
            <div class="secondline">
              <span>入院时间:{{new Date(patient.admitTime).format("yyyy.MM.dd")}}</span>
            </div>
            <div class="secondline">
              <span>出院时间:{{patient.dischargeTime?new Date(patient.dischargeTime).format("yyyy.MM.dd"):"未出院"}}</span>
            </div>

            <div class="forthline">
              <span>付款方式:{{patient.medicalPaymentType?patient.medicalPaymentType.slice(0,10):""}}</span>
            </div>
            <div class="fifthline">
              <span class="red">欠费</span>
              <span class="red">8756元</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="tab" v-if="patients2.length">
        <div class="line"></div>
        <div class="message">前日</div>
      </div>
      <div class="card-main">
        <el-card v-for="(patient,index) in patients2" :key="index">
          <div slot="header" class="clearfix">

            <span>{{patient.name}}</span>

            <el-tag
              size="mini"
              type="success"
              effect="dark"
              v-if="patient.admitTime && !patient.dischargeTime"
            >已入院</el-tag>
            <el-tag
              size="mini"
              type="danger"
              effect="dark"
              @click="enterHospital(patient)"
              v-if="!patient.admitTime && !patient.dischargeTime"
            >入院</el-tag>
            <el-tag
              size="mini"
              type="primary"
              effect="dark"
              @click="enterHospital(patient)"
              v-if="patient.admitTime && patient.dischargeTime"
            >已出院</el-tag>
          </div>
          <div>
            <div class="firstline">
              <span>序号:{{patient.id}}</span>
              <span>{{patient.gender === 1?'男':"女"}}</span>
              <span>{{patient.age}}岁</span>
            </div>
            <div class="secondline">
              <span>入院时间:{{new Date(patient.admitTime).format("yyyy.MM.dd")}}</span>
            </div>
            <div class="secondline">
              <span>出院时间:{{patient.dischargeTime?new Date(patient.dischargeTime).format("yyyy.MM.dd"):"未出院"}}</span>
            </div>

            <div class="forthline">
              <span>付款方式:{{patient.medicalPaymentType?patient.medicalPaymentType.slice(0,10):""}}</span>
            </div>
            <div class="fifthline">
              <span class="red">欠费</span>
              <span class="red">800元</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="tab" v-if="patients.length">
        <div class="line"></div>
        <div class="message">三天前</div>
      </div>
      <div class="card-main">
        <el-card v-for="(patient,index) in patients" :key="index">
          <div slot="header" class="clearfix">
            <span>{{patient.name}}</span>

            <el-tag
              size="mini"
              type="success"
              effect="dark"
              v-if="patient.admitTime && !patient.dischargeTime"
            >已入院</el-tag>
            <el-tag
              size="mini"
              type="danger"
              effect="dark"
              @click="enterHospital(patient)"
              v-if="!patient.admitTime && !patient.dischargeTime"
            >入院</el-tag>
            <el-tag
              size="mini"
              type="primary"
              effect="dark"
              @click="enterHospital(patient)"
              v-if="patient.admitTime && patient.dischargeTime"
            >已出院</el-tag>
          </div>
          <div>
            <div class="firstline">
              <span>序号:{{patient.id}}</span>
              <span>{{patient.gender === 1?'男':"女"}}</span>
              <span>{{patient.age}}岁</span>
            </div>
            <div class="secondline">
              <span>入院时间:{{new Date(patient.admitTime).format("yyyy.MM.dd")}}</span>
            </div>
            <div class="secondline">
              <span>出院时间:{{patient.dischargeTime?new Date(patient.dischargeTime).format("yyyy.MM.dd"):"未出院"}}</span>
            </div>
            <div class="forthline">
              <span>付款方式:{{patient.medicalPaymentType?patient.medicalPaymentType.slice(0,10):""}}</span>
            </div>
            <div class="fifthline">
              <span class="red">欠费</span>
              <span class="red">900元</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <el-dialog :visible.sync="addpatient" width="50%">
      <div class="inner">
        <div class="head" slot="title">
          <div class="title">{{addFlag?"新增患者":"病人入院"}}</div>
        </div>
      </div>
      <div class="dia-main">
        <el-card>
          <div slot="header">基本信息</div>
          <div class="main-inner">
            <el-form :inline="true">
              <el-form-item label="姓名">
                <el-input v-model="infoForm.patientname" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="infoForm.gender" size="mini" style="width: 178px;">
                  <el-option label="男" :value="1"></el-option>
                  <el-option label="女" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-form :inline="true">

              <!-- <el-form-item label="出生日期">
                <el-input-number v-model="infoForm.age" :min="1" :max="120" size="mini"></el-input-number>
              </el-form-item> -->

              <!-- <el-form-item label="出生日期">
                <el-row>
                  <el-select :value="curYear" @change="setYear" style="width: 80px;" size="mini">
                    <el-option
                      v-for="item in yearList"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  <span style="margin-left: 5px">年</span>
                  <el-select :value="curMonth" @change="setMonth" style="width: 60px; margin-left: 5px;" size="mini">
                    <el-option
                      v-for="item in monthList"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  <span style="margin-left: 5px">月</span>
                  <el-select :value="curDay" @change="setDay" style="width: 60px; margin-left: 5px;" size="mini">
                    <el-option
                      v-for="item in dayList"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  <span style="margin-left: 5px">日</span>
                </el-row>
              </el-form-item> -->

              <el-form-item label="出生日期">
                <el-date-picker v-model="infoForm.birthDate" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" size="mini" style="width: 86%;"></el-date-picker>
              </el-form-item>



              <!-- <el-form-item label="身份证号" ref="xfrxxForm" :model="xfrxxForm" :rules="xfrxxRules" prop="zjhm">
                <el-input v-model="infoForm.idNumber" maxlength="18" size="mini" show-word-limit placeholder="请输入身份证号"></el-input>
              </el-form-item> -->

              <el-form ref="xfrxxForm" :model="xfrxxForm" :rules="xfrxxRules" inline style="margin-left: -10px">
                <el-form-item label="证件号码" prop="zjhm" style="width: 300px;">
                  <el-input v-model="infoForm.idNumber" maxlength="18" size="mini" show-word-limit placeholder="请正确输入身份证号码"/>
                </el-form-item>
              </el-form>
              
            </el-form>

            <el-form inline>
              <el-form-item label="诊断" style="margin-inline-start: 8px; width: 290px;">
                <el-select v-model="infoForm.diagnosisId" size="mini">
                  <el-option
                    v-for="(diagnosis,index) in diagnosises"
                    :key="index"
                    :label="diagnosis.name"
                    :value="diagnosis.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="病况" style="margin-left: 14.5%; width: 289px;">
                <el-select v-model="infoForm.condition" size="mini">
                  <el-option label="一般" value="一般"></el-option>
                  <el-option label="危" value="危"></el-option>
                  <el-option label="重" value="重"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-form inline>
              <!-- <el-form-item label="体温">
                <el-input v-model="infoForm.bodyTemperature" size="mini">
                  <template slot="append">℃</template>
                </el-input>
              </el-form-item>
              <el-form-item label="脉搏">
                <el-input v-model="infoForm.pulseRate" size="mini">
                  <template slot="append">次/分</template>
                </el-input>
              </el-form-item> -->

              <el-form-item label="手机号码">
                <el-input v-model="infoForm.phoneNumber" size="mini"> </el-input>
              </el-form-item>

              <el-form-item label="家庭住址">
                <el-input v-model="infoForm.homeAddress" size="mini"></el-input>
              </el-form-item>

            </el-form>

            <el-form inline>
              <!-- <el-form-item label="血压" class="xueya">
                <el-input v-model="infoForm.lowBloodPressure" size="mini">
                  <template slot="append">/</template>
                </el-input>
                <el-input v-model="infoForm.highBloodPressure" size="mini">
                  <template slot="append">mmHg</template>
                </el-input>
              </el-form-item>
              <el-form-item label="呼吸">
                <el-input v-model="infoForm.breathRate" size="mini">
                  <template slot="append">次/分</template>
                </el-input>
              </el-form-item> -->

              <el-form-item label="国家">
                <el-input v-model="infoForm.country" size="mini"></el-input>
              </el-form-item>

              <el-form-item label="民族" style="width: 288px;">
                <el-select v-model="infoForm.nation" size="mini">
                  <el-option label="汉族" value="汉族"></el-option><el-option label="壮族" value="壮族"></el-option><el-option label="蒙古族" value="蒙古族"></el-option>
                  <el-option label="回族" value="回族"></el-option><el-option label="藏族" value="藏族"></el-option><el-option label="维吾尔族" value="维吾尔族"></el-option>
                  <el-option label="苗族" value="苗族"></el-option><el-option label="彝族" value="彝族"></el-option><el-option label="布依族" value="布依族"></el-option>
                  <el-option label="满族" value="满族"></el-option><el-option label="侗族" value="侗族"></el-option><el-option label="朝鲜族" value="朝鲜族"></el-option>
                  <el-option label="瑶族" value="瑶族"></el-option><el-option label="白族" value="白族"></el-option><el-option label="东乡族" value="东乡族"></el-option>
                  <el-option label="锡伯族" value="锡伯族"></el-option><el-option label="土家族" value="土家族"></el-option><el-option label="哈尼族" value="哈尼族"></el-option>
                  <el-option label="傣族" value="傣族"></el-option><el-option label="黎族" value="黎族"></el-option><el-option label="哈萨克族" value="哈萨克族"></el-option>
                  <el-option label="畲族" value="畲族"></el-option><el-option label="佤族" value="佤族"></el-option><el-option label="僳僳族" value="僳僳族"></el-option>
                  <el-option label="水族" value="水族"></el-option><el-option label="拉祜族" value="拉祜族"></el-option><el-option label="纳西族" value="纳西族"></el-option>
                  <el-option label="土族" value="土族"></el-option><el-option label="景颇族" value="景颇族"></el-option><el-option label="柯尔克孜族" value="柯尔克孜族"></el-option>
                  <el-option label="高山族" value="高山族"></el-option><el-option label="达斡尔族" value="达斡尔族"></el-option><el-option label="仫佬族" value="仫佬族"></el-option>
                  <el-option label="羌族" value="羌族"></el-option><el-option label="撒拉族" value="撒拉族"></el-option><el-option label="德昂族" value="德昂族"></el-option>
                  <el-option label="仡佬族" value="仡佬族"></el-option><el-option label="阿昌族" value="阿昌族"></el-option><el-option label="普米族" value="普米族"></el-option>
                  <el-option label="布朗族" value="布朗族"></el-option><el-option label="塔吉克族" value="塔吉克族"></el-option><el-option label="怒族" value="怒族"></el-option>
                  <el-option label="乌孜别克族" value="乌孜别克族"></el-option><el-option label="俄罗斯族" value="俄罗斯族"></el-option><el-option label="鄂温克族" value="鄂温克族"></el-option>
                  <el-option label="毛南族" value="毛南族"></el-option><el-option label="保安族" value="保安族"></el-option><el-option label="裕固族" value="裕固族"></el-option>
                  <el-option label="京族" value="京族"></el-option><el-option label="塔塔尔族" value="塔塔尔族"></el-option><el-option label="独龙族" value="独龙族"></el-option>
                  <el-option label="鄂伦春族" value="鄂伦春族"></el-option><el-option label="赫哲族" value="赫哲族"></el-option><el-option label="门巴族" value="门巴族"></el-option>
                  <el-option label="珞巴族" value="珞巴族"></el-option><el-option label="基诺族" value="基诺族"></el-option>
                </el-select>
              </el-form-item>

            </el-form>

            <el-form inline>
              <el-form-item label="联系人姓名">
                <el-input v-model="infoForm.linkmanName" size="mini"></el-input>
              </el-form-item>

              <el-form-item label="联系人电话">
                <el-input v-model="infoForm.linkmanPhone" size="mini"></el-input>
              </el-form-item>
            </el-form>

          </div>
        </el-card>
        <el-card>
          <div slot="header">入院信息</div>
          <div class="main-info">
            <el-form>
              <el-form-item label="病人类型:">
                <el-select v-model="infoForm.type" size="mini">
                  <el-option label="普通病人" value="普通病人"></el-option>
                  <el-option label="重症病人" value="重症病人"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="科室:">
                <el-select v-model="infoForm.deptId" size="mini">
                  <el-option
                    v-for="(department, index) in departments"
                    :key="index"
                    :label="department.label"
                    :value="department.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="床位:">
                <el-select v-model="infoForm.lou" size="mini" style="width: 25%;">
                  <el-option 
                    v-for="(inpatientBuilding, index) in inpatientBuildings"
                    :key="index"
                    :label="inpatientBuilding.label"
                    :value="inpatientBuilding.value"
                  ></el-option>
                </el-select>
                <el-select v-model="infoForm.bedNumber" size="mini" style="width: 25%;">
                  <el-option label="1床" :value="1"></el-option>
                  <el-option label="2床" :value="2"></el-option>
                  <el-option label="3床" :value="3"></el-option>
                  <!-- <el-option label="4床" :value="4"></el-option> -->
                </el-select>
              </el-form-item>
              <el-form :inline="true">
                <el-form-item label="入院时间:" size="mini">
                  <el-date-picker v-model="infoForm.admissionTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期" size="mini" style="width: 93%;"></el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="入住时间:" size="mini">
                  <el-date-picker v-model="infoForm.stayTime" type="date" value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                </el-form-item> -->
              </el-form>
              <el-form-item label="保险类型">
                <el-select v-model="infoForm.payType" size="mini">
                  <el-option label="商业保险" value="1"></el-option>
                  <el-option label="自费保险" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form :inline="true">
                <el-form-item label="住院医生:">
                  <el-select v-model="infoForm.residentDocId" size="mini">
                    <el-option label="王医生" :value="1"></el-option>
                    <el-option label="张医生" :value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="主治医师:">
                  <el-select v-model="infoForm.attendingDocId" size="mini">
                    <el-option label="张医生" :value="1"></el-option>
                    <el-option label="杨医生" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-form>
          </div>
        </el-card>
      </div>
      <div
        class="wrapper"
        :style="{height:'50px',display:'flex',justifyContent:'flex-end',paddingTop:'10px',boxSizing:'border-box'}">
          <el-button type="info" @click="handleClickRefresh">刷新</el-button>
          <el-button type="primary" @click="handleClickAdd">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="orderDia" width="50%">
      <div class="inner">
        <div class="head" slot="title">
          <div class="title">患者医嘱</div>
        </div>
        <el-card>
          <div class="title" slot="title">选择患者</div>
          <div class="inner-order">
            <el-form>
              <el-form-item label="姓名:">
                <el-input
                  v-model="orderForm.patientname"
                  size="mini"
                  placeholder="请输入患者名称或者编号"
                  suffix-icon="el-icon-search"
                ></el-input>
              </el-form-item>
              <el-form-item label="诊断">
                <el-autocomplete
                  v-model="orderForm.zhenduan"
                  placeholder="请输入患者名称或者编号"
                  suffix-icon="el-icon-edit"
                  size="mini"
                ></el-autocomplete>
                <span class="red" :style="{marginLeft:'10px',fontSize:'16px'}">DRG费用:4600</span>
              </el-form-item>
              <el-form-item label="是否进入临床路径">
                <el-select v-model="orderForm.enter" size="mini">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
      <div
        class="wrapper"
        :style="{height:'50px',display:'flex',justifyContent:'flex-end',paddingTop:'10px',boxSizing:'border-box'}"
      >
        <el-button type="primary" @click="$router.push('/cpPatient')">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="isEnter" width="40%" class="enter">
      <div class="head" slot="title">
        <div class="title">是否进入临床路径</div>
      </div>
      <div style="width:80%;marginLeft:10%;fontWeight:800">当前存在与病人诊断相符的临床路径{{tempName}},</div>
      <div style="width:80%;marginLeft:10%;fontWeight:800">是否进入临床路径</div>
      <div slot="footer" class="dialog-footer" style="width:90%">
        <el-button @click="enterCp(0)">取 消</el-button>
        <el-button type="primary" @click="enterCp(1)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>




<script>

import { stay, getAll, enterCp } from '@/api/enter'
import { addPatient, getPatientsThree } from '@/api/patient'
import { getAllDept } from '@/api/my-template.js'
import { getAllDia } from '@/api/cp-template.js'

export default {
  
  computed:{
    // curYear(){
    //   return this.birthdayInfo.year;
    // },
    // curMonth(){
    //   return this.birthdayInfo.month;
    // },
    // curDay() {
    //   return this.birthdayInfo.day;
    // },
    // yearList() {
    //   let currentYear = new Date().getFullYear();
    //   return this.getYearArr(1900, currentYear);
    // },
    // dayList() {
    //   let monthRange = this.getMonthDay(this.curYear, this.curMonth);
    //   return this.getNumberArr(1, monthRange);
    // },
  },
  data () {
    return {
      addFlag: false,
      isEnter: false,
      enterShow: false,
      orderForm: {
        patientname: "",
        zhenduan: "",
        enter: "是"
      },
      tempName: "",
      infoForm: {
        patientId: 1,
        patientname: "",
        gender: 1,
        age: 24,
        birthDate: "",
        idNumber: "",
        phoneNumber: "",
        linkmanPhone: "",
        linkmanName: "",
        linkmanRelation: "",
        nation: "汉族",
        country: "中国",
        homeAddress: "",
        deptId: 1,
        condition: "一般",        
        admissionTime: new Date(),
        // stayTime: new Date(),
        status: "",        
        diagnosisId: "",
        type: "普通病人",
        lou: "12栋213",
        bedNumber: 1,
        payType: "商业保险",
        residentDocId: 1,
        attendingDocId: 1,
        bodyTemperature: "",
        pulseRate: "",
        tempture: "",
        bloodPressure: "",
        highBloodPressure: "",
        lowBloodPressure: "",
        breathRate: "",
        
      },
      addpatient: false,
      orderDia: false,
      departments: [
        { value: 1, label: '糖尿病科' },
        { value: 2, label: '骨科' },
        { value: 3, label: '内分泌科' },
      ],
      diagnosises: [],

      inpatientBuildings: [
        { value: 1, label: '12栋213' },
        { value: 2, label: '12栋214' },
        { value: 3, label: '12栋215' },
      ],
      patients: [],
      patients0: [],
      patients1: [],
      patients2: [],
      department: '外科',
      place: '12栋213',

      //出生日期
      // birthdayInfo:{
      //   year: 2000,
      //   month: 1,
      //   day: 1
      // },
      // monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

      //身份证
      xfrxxForm: {},
      xfrxxRules:{
        zjhm: [
          // {required: true, message: '请输入身份证', trigger: 'blur'},
          {
            pattern: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
            message: '请输入正确的证件号', trigger: 'blur',
            validator: this.validSjh
          }
        ],
      },
    }
  },
  methods: {
    //新增病人界面刷新输入框
    handleClickRefresh(){
      this.infoForm.patientname = "";
      this.infoForm.gender = 1;
      this.infoForm.idNumber = "";
      // this.infoForm.birthDate = "2000";
      this.infoForm.condition = "一般";
      this.infoForm.phoneNumber = "";
      this.infoForm.homeAddress = "";
      this.infoForm.country = "中国";
      this.infoForm.nation = "汉族";
      this.linkmanName = "";
      this.linkmanPhone = "";
      this.infoForm.type = "普通病人";
      this.infoForm.deptId = 1;
    },
    addPatient () {
      this.addpatient = true;
      this.addFlag = true;
    },
    handleClickAdd () {
      this.addpatient = false;
      let data = {
        ...this.infoForm,
        name: this.infoForm.patientname

        // lowBloodPressure: Number(this.infoForm.lowBloodPressure),
        // highBloodPressure: Number(this.infoForm.highBloodPressure),
        // bodyTemperature: Number(this.infoForm.bodyTemperature),
        // pulseRate: Number(this.infoForm.pulseRate),
        // breathRate: Number(this.infoForm.breathRate),

        // idNumber: Number(this.infoForm.idNumber),
        // phoneNumber: Number(this.infoForm.phoneNumber),
        // linkmanPhone: Number(this.infoForm.linkmanPhone)
      };
      console.log('data', data);
      if (this.addFlag) {
        addPatient(data).then(res => {
          console.log('add', res);
          this.patients0 = []
          this.patients1 = []
          this.patients2 = []
          this.patients = []
          getPatientsThree().then(res => {
            console.log('three', res);
            const nowD = new Date().getDate()

            res.forEach(item => {
              if (!item.admissionTime) {
                this.patients0.push(item)
              } else {
                const dateN = new Date(item.admitTime).getDate()
                console.log('patient', item);
                if (nowD === dateN) {
                  this.patients0.push(item)
                } else if (nowD - dateN === 1) {
                  this.patients1.push(item)
                } else if (nowD - dateN === 2) {
                  this.patients2.push(item)
                } else {
                  this.patients.push(item)
                }
              }
            })
            console.log(this.patients)
          })
        })
      }
      else {
        stay(data).then(res => {
          console.log('res', res);
          this.sMessage("入住成功")
          if (res) {
            console.log('res', res);
            this.isEnter = true
            this.cpTmplId = res.id
            this.tempName = res.name
          }
          this.patients0 = []
          this.patients1 = []
          this.patients2 = []
          this.patients = []
          getPatientsThree().then(res => {
            console.log('three', res);
            const nowD = new Date().getDate()

            res.forEach(item => {
              if (!item.admissionTime) {
                this.patients0.push(item)
              } else {
                const dateN = new Date(item.admitTime).getDate()
                console.log('patient', item);
                if (nowD === dateN) {
                  this.patients0.push(item)
                } else if (nowD - dateN === 1) {
                  this.patients1.push(item)
                }
                else if (nowD - dateN === 2) {
                  this.patients2.push(item)
                } else {
                  this.patients.push(item)
                }
              }
            })
            console.log(this.patients)
          })
        })
      }
      this.addFlag = false
    },
    enterCp (enter) {
      enterCp({ cpTmplId: this.cpTmplId, enter: enter, patientId: this.infoForm.patientId }).then(res2 => {
        if (res2) {
          if (enter === 1) this.sMessage("进入临床路径")
          this.isEnter = false
          this.$router.push('/CpPatient')
        }
      })
    },
    enterHospital (patient) {
      this.addpatient = true;
      this.infoForm.patientId = patient.id;
      this.infoForm.patientname = patient.name;
      this.infoForm.gender = patient.gender;
      this.infoForm.age = patient.age;
      this.infoForm.birthDate = patient.birthDate;
      this.infoForm.idNumber = patient.idNumber;
      this.infoForm.phoneNumber = patient.phoneNumber;
      this.infoForm.nation = patient.nation;
      this.infoForm.country = patient.country;
      this.infoForm.homeAddress = patient.homeAddress;
      this.infoForm.linkmanName = patient.linkmanName;
      this.infoForm.linkmanRelation = patient.linkmanRelation;
      this.infoForm.linkmanPhone = patient.linkmanPhone;
      this.infoForm.admissionTime = patient.admitTime;
      // this.infoForm.stayTime = patient.stayTime;
    },

    //出生日期
    // setBirthDay(birthdayInfo) {
    //   console.log("setBirthDay");
    //   this.birthdayInfo = birthdayInfo;
    //   this.infoForm.birthDate = `${year}-${month}-${day}`;
    // },
    // getNumberArr(a, b) {
    //   return Array.from(Array(b - a + 1)).map((e, i) => a + i);
    // },
    // getYearArr(a, b) {
    //   return Array.from(Array(b - a + 1)).map((e, i) => a + i).reverse();
    // },
    // getMonthDay(year, month) {
    //   let days = new Date(year, month, 0).getDate();
    //   return days;
    // },
    // setYear(year){
      
    //   this.birthdayInfo.year = year;
    //   this.$emit('setBirthDay',this.birthdayInfo);
    //   console.log("setYear");
    // },
    // setMonth(month){
    //   this.birthdayInfo.month = month;
    //   this.$emit('setBirthDay',this.birthdayInfo);
    // },
    // setDay(day){
    //   this.birthdayInfo.day = day;
    //   this.$emit('setBirthDay',this.birthdayInfo);
    // },

    //身份证验证
    async validSjh(rule, value, callback){
      // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
      let reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/;
      if (!value) {
        return callback(new Error("身份证号不能为空"));
      } else if (!reg.test(value)) {
        callback(new Error("你输入的身份证长度或格式错误"));
      } else {
        //身份证城市
        var aCity = {
          11: "北京",12: "天津",13: "河北",14: "山西",15: "内蒙古",21: "辽宁",22: "吉林",23: "黑龙江",31: "上海",32: "江苏",33: "浙江",34: "安徽",35: "福建",
          36: "江西",37: "山东",41: "河南",42: "湖北",43: "湖南",44: "广东",45: "广西",46: "海南",50: "重庆",51: "四川",52: "贵州",53: "云南",54: "西藏",
          61: "陕西",62: "甘肃",63: "青海",64: "宁夏",65: "新疆",71: "台湾",81: "香港",82: "澳门",91: "国外"
        };
        if (!aCity[parseInt(value.substr(0, 2))]) {
          callback(new Error("你的身份证地区非法"));
        }
        // 出生日期验证
        var sBirthday = (
            value.substr(6, 4) + "-" +
            Number(value.substr(10, 2)) + "-" +
            Number(value.substr(12, 2))
          ).replace(/-/g, "/"),
          d = new Date(sBirthday);
        if (sBirthday != d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()) {
          callback(new Error("身份证上的出生日期非法"));
        }

        // 身份证号码校验
        var sum = 0,
          weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
          codes = "10X98765432";
        for (var i = 0; i < value.length - 1; i++) {
          sum += value[i] * weights[i];
        }
        var last = codes[sum % 11]; //计算出来的最后一位身份证号码
        if (value[value.length - 1] != last) {
          callback(new Error("你输入的身份证号非法"));
        } else {
          await this.go(value, value.length);
        }
        callback();
      }
    },

  },
  mounted () {
    // getAllDept().then(res => {
    //   this.departments = res
    // })
    // getAllDia().then(res => {
    //   this.diagnosises = res
    // })
    // getAll().then(res => {
    //   console.log('res', res);
    //   this.patients = res
    // })
    getPatientsThree().then(res => {
      console.log('three', res);
      const nowD = new Date().getDate()

      res.forEach(item => {
        if (!item.admissionTime) {
          this.patients0.push(item)

        } else {
          const dateN = new Date(item.admitTime).getDate()
          console.log('patient', item);
          if (nowD === dateN) {
            this.patients0.push(item)
          } else if (nowD - dateN === 1) {
            this.patients1.push(item)
          }
          else if (nowD - dateN === 2) {
            this.patients2.push(item)
          } else {
            this.patients.push(item)
          }
        }
      })
      console.log(this.patients)
    })
  }
}
</script>

<style lang="scss" scoped>
.enter-hospital {
  height: calc(100% - 60px);
  padding: 20px 100px 20px 100px;

  box-sizing: border-box;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main {
    .clearfix {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-tag {
        cursor: pointer;
      }
    }
    .tab {
      margin-top: 10px;
      display: flex;
      align-items: center;

      height: 24px;
      .line {
        width: 3px;
        height: 24px;

        background: #3981ee;
        margin-right: 16px;
      }
    }
    .card-main {
      display: flex;
      flex-wrap: wrap;
    }
    .el-card {
      width: 178px;
      height: 240px;
      margin-right: 3%;
      margin-top: 20px;
      font-size: 14px;
      .firstline,
      .secondline,
      .thirdline,
      .forthline {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
      }
      .fifthline {
        display: flex;
        justify-content: space-between;
        .red {
          color: #f56c6c;
        }
      }
    }
  }

  //!方向:前端监测区块链系统 追踪溯源
}
.inner {
  .head {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: #3981ee;
    height: 40px;
    justify-content: center;
    color: white;
    .title {
      font-size: 20px;
      font-weight: bold;
    }
    .dia-main {
      width: 100%;
    }
  }
}
::v-deep .el-form-item {
  margin-bottom: 10px !important;
  display: flex;
  align-items: center;
  width: 50%;
}
::v-deep .main-info .el-form-item {
  margin-bottom: 10px !important;
  display: flex;
  align-items: center;
  width: 100%;
}
::v-deep .inner-order .el-form-item {
  margin-bottom: 10px !important;
  display: flex;
  align-items: center;
  width: 100%;
}
::v-deep .el-form-item__label {
  display: inline-block;
  font-weight: bold;
  width: 120px;
}
::v-deep .inner-order .el-form-item__label {
  display: inline-block;
  font-weight: bold;
  width: 140px;
}
::v-deep .el-textarea__inner {
  width: 240px;
}
::v-deep .el-dialog__header {
  display: none !important;
}
::v-deep .enter .el-dialog__header {
  display: block !important;
}
::v-deep .el-card {
  width: 100%;
  margin-top: 8px;
}
::v-deep .el-form--inline {
  display: flex;
}

// ::v-deep .xueya .el-form-item__content {
//   display: flex;
// }
// ::v-deep .xueya .el-input__inner {
//   width: 60px !important;
// }
// ::v-deep .xueya .el-input-group__append {
//   width: 30px !important;
// }
</style>
