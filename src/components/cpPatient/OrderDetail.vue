<template>
  <el-card class="order-detail">
    <!-- <div slot="header" class="head">
      <span class="title">医嘱详细信息</span>
    </div>-->
    <div class="search">
      <order-search></order-search>
    </div>
    <div class="list">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="已生成医嘱" name="first">
          <el-table :data="addedOrders" border style="width: 100%" size="mini">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="name" label="名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.name?scope.row.name:scope.row.content}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="content" label="内容" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.content?scope.row.content:scope.row.name}}</span>
              </template>
            </el-table-column>-->

            <el-table-column prop="timeType" label="期效">
              <template slot-scope="scope">
                <span>{{scope.row.timeType===0?"长期医嘱":"临时医嘱"}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="execFreq" label="频率">
              <template slot-scope="scope">
                <span>{{scope.row.execFreq?scope.row.execFreq:"/"}}</span>
              </template>
            </el-table-column>

            <el-table-column prop="everyUse" label="单量"></el-table-column>
            <el-table-column prop="totalUse" label="总量"></el-table-column>
            <el-table-column prop="execTimeScheme" label="时间方案" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.execTimeScheme?scope.row.execTimeScheme:"/"}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待生成医嘱" name="second">
          <el-table :data="todoOrders" border style="width: 100%" size="mini">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="name" label="名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.name?scope.row.name:scope.row.content}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="content" label="内容" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.content?scope.row.content:scope.row.name}}</span>
              </template>
            </el-table-column>-->

            <el-table-column prop="timeType" label="期效">
              <template slot-scope="scope">
                <span>{{scope.row.timeType===0?"长期医嘱":"临时医嘱"}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="execFreq" label="频率">
              <template slot-scope="scope">
                <span>{{scope.row.execFreq?scope.row.execFreq:"/"}}</span>
              </template>
            </el-table-column>

            <el-table-column prop="everyUse" label="单量"></el-table-column>
            <el-table-column prop="totalUse" label="总量"></el-table-column>
            <el-table-column prop="execTimeScheme" label="时间方案" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.execTimeScheme?scope.row.execTimeScheme:"/"}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="error" v-if="nowVar!==0">
      <el-form :model="errorForm" class="demo-form-inline" size="mini">
        <el-form-item label="选择变异原因">
          <el-select v-model="errorForm.reason" placeholder="变异原因" size="mini">
            <el-option label="并发症" value="1"></el-option>
            <el-option label="其他" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加变异说明">
          <el-input type="textarea" :rows="2" placeholder="变异说明" v-model="errorForm.info"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-card class="detail">
      <div class="inner">
        <div class="left">
          <el-form size="mini">
            <el-form-item label="名称">
              <span style="fontSize:14px">{{this.adviceName}}</span>
            </el-form-item>
            <el-form-item label="期效">
              <el-select v-model="formDetail.timeType" size="mini">
                <el-option label="临时医嘱" :value="0"></el-option>
                <el-option label="长期医嘱" :value="1"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="内容">
              <el-input v-model="formDetail.content"></el-input>
            </el-form-item>
            <el-form-item label="总量">
              <!-- <el-select v-model="formDetail.allCount" size="mini">
                    <el-option label="一次" value="1"></el-option>
                    <el-option label="两次" value="2"></el-option>
                    <el-option label="三次及以上" value="3"></el-option>
              </el-select>-->
              <el-input size="mini" v-model="formDetail.totalUse"></el-input>
            </el-form-item>
            <el-form-item label="单量">
              <el-input size="mini" v-model="formDetail.everyUse"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="right">
          <el-form size="mini">
            <el-form-item label="频率">
              <el-select v-model="formDetail.execFreq" size="mini">
                <el-option label="每天两次" value="每天两次"></el-option>
                <el-option label="每天三次" value="每天三次"></el-option>
                <el-option label="每天四次" value="每天四次"></el-option>
                <el-option label="每天清晨" value="每天清晨"></el-option>
                <el-option label="每天上午一次" value="每天上午一次"></el-option>
                <el-option label="每天上午一次" value="每天上午一次"></el-option>
                <el-option label="每天晚上一次" value="每天晚上一次"></el-option>
                <el-option label="隔日一次" value="隔日一次"></el-option>
                <el-option label="三天一次" value="三天一次"></el-option>
                <el-option label="每周一次" value="每周一次"></el-option>
                <el-option label="每周二次" value="每周二次"></el-option>
                <el-option label="每周三次" value="每周三次"></el-option>
                <el-option label="每小时一次" value="每小时一次"></el-option>
                <el-option label="每2小时一次" value="每2小时一次"></el-option>
                <el-option label="每3小时一次" value="每3小时一次"></el-option>
                <el-option label="每4小时一次" value="每4小时一次"></el-option>
                <el-option label="每6小时一次" value="每6小时一次"></el-option>
                <el-option label="每8小时一次" value="每8小时一次"></el-option>
                <el-option label="每12小时一次" value="每12小时一次"></el-option>
                <el-option label="每24小时一次" value="每24小时一次"></el-option>
                <el-option label="每48小时一次" value="每48小时一次"></el-option>
                <el-option label="每天一剂" value="每天一剂"></el-option>
                <el-option label="隔日一剂" value="隔日一剂"></el-option>
                <el-option label="每周一剂" value="每周一剂"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用法">
              <el-input v-model="formDetail.checkMethod" size="mini"></el-input>
            </el-form-item>

            <el-form-item label="执行科室">
              <el-select v-model="formDetail.execDeptId" size="mini">
                <!-- <el-option label="检验科" value="1"></el-option>
                    <el-option label="骨科" value="2"></el-option>
                <el-option label="脊柱科" value="3"></el-option>-->
                <el-option
                  v-for="item in departments"
                  :label="item.name"
                  :value="item.id"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="执行性质">
              <el-select v-model="formDetail.execNature" size="mini">
                <el-option label="无执行的叮嘱" :value="0"></el-option>
                <el-option label="病人所在科室" :value="1"></el-option>
                <el-option label="病人所在病区" :value="2"></el-option>
                <el-option label="开单人所在科室" :value="3"></el-option>
                <el-option label="制定科室" :value="4"></el-option>
                <el-option label="院外执行" :value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间方案">
              <!-- <el-select v-model="formDetail.exec_time_scheme" size="mini">
                    <el-option label="每天" value="1"></el-option>
                    <el-option label="每周" value="2"></el-option>
              </el-select>-->
              <el-input v-model="formDetail.execTimeScheme" size="mini"></el-input>
            </el-form-item>
            <!-- <el-form-item label="开始时间">
                  <el-date-picker v-model="formDetail.startTime" type="date" placeholder="开始时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                  <el-date-picker v-model="formDetail.endTime" type="date" placeholder="结束时间"></el-date-picker>
            </el-form-item>-->
            <el-form-item label="医生嘱托">
              <el-input type="textarea" :rows="2" placeholder="变异说明" v-model="formDetail.entrust"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button type="primary" size="mini" :style="{float:'right'}" @click="confirmDetail">更新</el-button>
      </div>
    </el-card>
    <div class="xishu">
      <div class="wrapper">
        <span>
          变异系数:
          <span class="red">{{variationNum}}</span>
        </span>
        <span>
          已发生变异:
          <span class="red">{{hasVar}}</span>
        </span>
        <span>
          该阶段变异数:
          <span class="red">{{nowVar}}</span>
        </span>
        <el-button type="primary" size="mini" :style="{float:'right'}" @click="clickTheDay">确认</el-button>
      </div>
    </div>
  </el-card>
</template>
 
<script>
import { getAllDept } from '@/api/my-template.js'
import OrderSearch from './OrderSearch.vue'
import { getStagePatCpAdvices, getStageVar, editStageDayPatientAdvice } from '@/api/patient'
import { getAdviceById } from '@/api/my-template.js'
export default {
  components: {
    OrderSearch
  },
  props: {
    stageId: Number,
    nowVar: Number
  },
  computed: {
    todoOrders () {
      return this.$store.state.todoOrders
    },
    myAdvice () {
      return this.$store.state.myAdvice
    }


  },
  watch: {
    myAdvice (newAdvice) {
      this.adviceName = newAdvice ? newAdvice.name : ""
      const adviceMap = this.$store.state.adviceMap
      if (newAdvice.id && adviceMap[newAdvice.id]) {
        this.formDetail = adviceMap[newAdvice.id]
      }

    }
  },
  mounted () {
    const { patientId, stageId, dayNum } = this.$route.query

    this.patientId = Number(patientId)
    this.stageId = Number(stageId)
    this.dayNum = Number(dayNum)
    this.getStagePatCpAdvices()
    getAllDept().then(res => {
      this.departments = res
    })
    getStageVar({ patientId: this.patientId, stageId: this.stageId }).then(vars => {
      console.log('vars', vars);
      this.hasVar = vars.hasVar
      this.variationNum = vars.variationNum
    })
  },

  data () {
    return {
      adviceName: '',
      departments: [],
      hasVar: 0,
      variationNum: 0,
      activeName: "second",
      formDetail: {
        timeType: 0,
        addPerson: "医生",
        label: "",
        content: "",
        totalUse: 20,
        everyUse: 2,
        execFreq: "每天三次",
        checkMethod: "静脉采血",
        entrust: "",
        execDeptId: 1,
        execNature: 0,
        execTimeScheme: "每天",

      },
      errorForm: {
        reason: "其他",
        info: ""
      },

      addedOrders: [

      ]
    }
  },
  methods: {


    confirmDetail () {

      if (this.myAdvice) {

        this.$store.commit('setAdviceMap', { id: this.myAdvice.id, detail: this.formDetail })
        this.sMessage('修改医嘱内容成功')
      } else {
        this.eMessage('请先选择模板种的一项医嘱')
      }
    },
    getStagePatCpAdvices () {
      getStagePatCpAdvices({ patientId: this.patientId, stageId: this.stageId, dayNum: this.dayNum }).then(advices => {
        console.log('advices2', advices);
        this.addedOrders = advices.map(item => ({ ...item.treatment, ...item.advice })).map(item => {
          console.log('item.name', item.name);
          if (!item.name) {
            item.name = item.content
          }
          if (!item.content) {
            item.content = item.name
          }
          return item
        })
      })
    },
    clickTheDay () {
      let data = {
        patientId: this.patientId,
        stageId: this.stageId,
        dayNum: this.dayNum,
        patientCpAdviceVOS: this.todoOrders.map(order => {
          return {
            cpAdviceId: order.cpAdviceId,
            advice: order
          }
        })
      }
      editStageDayPatientAdvice(data).then(res2 => {
        console.log('res2', res2);
        this.sMessage('填充医嘱成功')
        //!清空
        this.$store.commit('setMyAdvice', null)
        this.$store.commit('setMyAdvices', [])

        this.$store.commit('deleteCpAdvices', [])
        this.$store.commit('deleteTodoOrders', [])
        this.$store.commit('setTodoOrders', [])
        this.$router.push('/CpPatient')
      })
    }

  },

}
</script>
 
<style lang="scss" scoped>
.order-detail {
  width: 100%;
  /* height: 100%; */
  .head {
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    background: #3981ee;
    height: 30px;
    color: white;
  }
  .el-card__body {
    width: 100%;
    .list {
      width: 100%;
      margin-top: 6px;
    }
    .search {
      width: 100%;
    }
    .error {
      margin-top: 10px;

      font-size: 12px;
    }
    .xishu {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 40px;
      .wrapper {
        margin-right: 10px;
        span {
          margin-right: 10px;
        }
      }
    }
    .detail {
      margin-top: 10px;
      width: 100%;
      .inner {
        width: 100%;

        display: flex;
        align-items: flex-start;
      }

      .left {
        width: 50%;
      }
      .right {
        width: 50%;
      }
    }
  }
}
::v-deep .el-form-item {
  margin-bottom: 0px !important;
  display: flex;
  align-items: center;
}
::v-deep .detail .el-form-item {
  margin-bottom: 5px !important;
  display: flex;
  align-items: center;
}
::v-deep .detail .el-form-item__label {
  display: inline-block;
  width: 80px;
}
::v-deep .el-tab-pane {
  max-height: 400px !important;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>