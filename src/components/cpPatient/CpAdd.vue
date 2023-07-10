<template>
  <div class="cp-add">
    <div class="left">
      <choose-template @judgeVar="judgeMyVar"></choose-template>
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
        <div class="stage">
          <el-card>
            <div slot="header" class="header">
              <span class="title">第{{stage.dayNum}}天</span>
            </div>
            <el-card
              class="work"
              v-for="(category,index1) in stage.stagePatientProVos"
              :key="category.classification"
            >
              <div slot="header" class="work-header">
                <span class="title">{{category.classification}}</span>
                <div :style="{width:'100px'}"></div>
                <!-- <div class="btn-wrapper">
                  <el-checkbox
                    v-model="category.checkAll"
                    @change="value=>handleCheckAllChange(index1,value)"
                  >全选</el-checkbox>
                </div>-->
              </div>
              <div class="card-main">
                <div v-for="(project,index2) in category.cpProjectVos" :key="index2" class="item">
                  <div
                    class="exec"
                    v-if="(category.patientCpExecVos[index2].patientCpExec && category.patientCpExecVos[index2].patientCpExec.executor) && !(category.patientCpExecVos[index2].patientCpExec &&category.patientCpExecVos[index2].patientCpExec.isVari)"
                  >
                    <i class="el-icon-circle-check green"></i>
                    <span
                      style="marginLeft:8px"
                      @click.prevent="clickProject(index1,index2)"
                    >{{project.cpProject.content}}</span>
                  </div>

                  <el-checkbox
                    v-model="project.checked"
                    v-if="!(category.patientCpExecVos[index2].patientCpExec && category.patientCpExecVos[index2].patientCpExec.executor) &&!(category.patientCpExecVos[index2].patientCpExec&&category.patientCpExecVos[index2].patientCpExec.isVari)"
                    @change="value=>handleChangeCheck(index1,index2,value)"
                    :indeterminate="project.pending"
                  >
                    <span @click.prevent="clickProject(index1,index2)">{{project.cpProject.content}}</span>
                  </el-checkbox>

                  <div
                    class="exec error"
                    v-if="category.patientCpExecVos[index2].patientCpExec && category.patientCpExecVos[index2].patientCpExec.executor  && (category.patientCpExecVos[index2].patientCpExec && category.patientCpExecVos[index2].patientCpExec.isVari)"
                  >
                    <i class="el-icon-circle-check green" style="fontSize:16px"></i>
                    <span
                      style="marginLeft:8px"
                      @click.prevent="clickProject(index1,index2)"
                    >{{project.cpProject.content}}</span>
                    <div :style="{marginLeft:'16px',height:'30px'}">
                      <p
                        class="errorP"
                      >变异原因:{{category.patientCpExecVos[index2].patientCpExec.isVari}}</p>
                      <p
                        class="errorP"
                      >变异说明:{{category.patientCpExecVos[index2].patientCpExec.projContent}}</p>
                    </div>
                  </div>
                  <div
                    v-if="(!category.patientCpExecVos[index2].patientCpExec || !category.patientCpExecVos[index2].patientCpExec.executor ) && (category.patientCpExecVos[index2].patientCpExec && category.patientCpExecVos[index2].patientCpExec.isVari)"
                    class="error"
                  >
                    <el-checkbox
                      v-model="project.checked"
                      :indeterminate="project.pending"
                      @change.prevent="value=>handleChangeCheck(index1,index2,value)"
                    >
                      <span @click="clickProject(index1,index2)">{{project.cpProject.content}}</span>
                    </el-checkbox>
                    <div :style="{marginLeft:'16px',height:'30px'}">
                      <p
                        class="errorP"
                      >变异原因:{{category.patientCpExecVos[index2].patientCpExec.isVari}}</p>
                      <p
                        class="errorP"
                      >变异说明:{{category.patientCpExecVos[index2].patientCpExec.projContent}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="add">
                <i class="el-icon-circle-plus-outline"></i>
              </div>
            </el-card>
          </el-card>
        </div>
        <div class="order-detail-wrapper">
          <order-detail :stageId="stageId" :dayNum="dayNum" :nowVar="nowVar"></order-detail>
        </div>
      </div>
    </div>
    <el-dialog title="具体项目" :visible.sync="advicesShow" width="80%">
      <el-table
        :data="projectAdvices"
        border
        style="width: 100%"
        size="mini"
        ref="advicesTable"
        @select="handleSelect"
        @select-all="handleSelectAll"
      >
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
        </el-table-column> -->
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
      </el-table>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="advicesShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd()">确 定</el-button>
      </div>-->
    </el-dialog>
  </div>
</template>
 
<script>
import ChooseTemplate from './ChooseTemplate.vue'
import OrderDetail from './OrderDetail.vue'
import { getPatientCpHeader, getStageDayPatientExec } from '@/api/patient'

export default {
  components: {
    ChooseTemplate,
    OrderDetail
  },
  data () {
    return {
      advicesShow: false,
      projectAdvices: [],
      //患者基础信息
      patient: {},
      stage: {},
      patientId: 1,
      stageId: 1,
      dayNum: 1,
      selectionAdvices: [],
      allPathIds: [],
      nowVar: 0,
    }
  },
  mounted () {
    const { patientId, stageId, dayNum } = this.$route.query

    this.patientId = Number(patientId)
    this.stageId = Number(stageId)
    this.dayNum = Number(dayNum)
    this.getHead(this.patientId)
    this.getStage()


  },
  computed: {
    myAdvices () {
      return this.$store.state.myAdvices
    }
  },
  methods: {

    judgeMyVar () {
      console.log('this.allPathIds', this.allPathIds);
      this.myAdvices.forEach((advice, index) => {
        let trId = this.allPathIds.map(item => (item.treatmentId))
        console.log('trId', trId);
        let idx = trId.indexOf(advice.id)
        if (idx === -1) {
          this.eMessage('存在变异项目' + advice.name)
          this.nowVar = this.nowVar + 1
          this.myAdices[index].cpAdviceId = null
        } else {
          this.myAdices[index].cpAdviceId = this.allPathIds[i].cpAdviceId
        }


      })
    },

    confirmAdd () {
      let selectionAdvices = this.selectionAdvices.map(item => {
        return {
          ...item,
          cpAdviceId: item.id,
          categoryIndex: this.categoryIndex,
          hasChoose: true
        }
      })
      let alreayAdvice = this.$store.state.cpAdvices

      let alreayAdviceId = alreayAdvice.filter(advice => {
        return advice.categoryIndex === this.categoryIndex
      }).map(advice => advice.id)
      let tempAdviceId = this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].cpAdvices.map(item => {
        if (item.hasChoose) {
          return item.cpAdvice.id
        } else return -1
      })
      console.log('tempAdviceId', tempAdviceId);
      selectionAdvices = selectionAdvices.filter(advice => {
        console.log('advice.id', advice.id);
        if (alreayAdviceId.indexOf(advice.id) === -1 && tempAdviceId.indexOf(advice.id) === -1) {
          return true
        }
        else return false
      })

      this.$store.commit('setCpAdvices', selectionAdvices)
      this.$store.commit('setTodoOrders')
    },
    handleSelectAll (value) {
      console.log('value', value);
      this.selectionAdvices = value.filter(item => {
        if (item) {
          return true
        }
      })

      if (this.selectionAdvices.length) {
        this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].checked = true

        this.confirmAdd()

      } else {
        //todo 取消不掉已经选拉的
        let advices = this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].cpAdvices
        let count = 0
        advices.forEach(advice => {
          if (advice.hasChoose) {
            advice.checked = true

            this.$nextTick(() => {
              const advice2 = this.projectAdvices.filter(item2 => item2.id === advice.cpAdvice.id)[0]
              this.$refs.advicesTable.toggleRowSelection(advice2, true)
            })
            count++
          } else {
            this.deleteTodo({ ...advice.cpAdvice, name: advice.cpAdviceName })

          }
        })
        //!全部可用取消
        if (count === 0) {
          this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].checked = false
          this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].pending = false

          const list = advices.map(item => ({ ...item.cpAdvice }))
          console.log('list', list);
          list.forEach(row => {
            this.deleteTodo(row)

          })
        } else if (count === advices.length) {
          //全部不可以取消
          this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].checked = true
          this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].pending = false


        } else {
          //部分可取消
          this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].pending = true

        }

      }

    },
    handleSelect (selection, row) {
      this.selectionAdvices = []
      console.log('se', selection, row);


      this.selectionAdvices = selection.filter(item => {
        if (item) {
          return true
        }
      })


      if (this.selectionAdvices.indexOf(row) !== -1) {
        //增加逻辑
        if (this.selectionAdvices.length < this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].cpAdvices.length && this.selectionAdvices.length > 0) {
          this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].pending = true
        }
        else if (this.selectionAdvices.length === this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].cpAdvices.length) {
          //全选
          this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].checked = true
          this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].pending = false

        } else if (this.selectionAdvices.length === 0) {
          this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].checked = false
          this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].pending = false
        }
        this.confirmAdd()

      } else {
        //删除逻辑
        let pastArr = [...this.selectionAdvices]
        if (row.hasChoose) {
          pastArr.push(row)
          console.log('enter');
          this.$nextTick(() => {
            const advice2 = this.projectAdvices.filter(item2 => item2.id === row.id)[0]
            this.$refs.advicesTable.toggleRowSelection(advice2, true)
          })
        } else {
          this.deleteTodo(row)

        }
        if (pastArr.length < this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].cpAdvices.length && pastArr.length > 0) {
          this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].pending = true
        }
        else if (pastArr.length === this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].cpAdvices.length) {
          //全选
          this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].checked = true
          this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].pending = false

        } else if (pastArr.length === 0) {
          this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].checked = false
          this.stage.stagePatientProVos[this.categoryIndex].cpProjectVos[this.projectIndex].pending = false
        }
      }
      //取消逻辑
    },
    deleteTodo (list) {
      this.$store.commit('deleteCpAdvice', list)
      this.$store.commit('setTodoOrders')
    },
    clickProject (index1, index2) {
      this.selectionAdvices = []
      //!执行的不可修改医嘱
      //category.patientCpExecs[index4].executor
      let executor = this.stage.stagePatientProVos[index1].patientCpExecVos[index2].patientCpExec
      console.log('ex', executor);
      if (executor && executor.executor) return
      this.advicesShow = true
      this.categoryIndex = index1
      this.projectIndex = index2
      let advices = this.stage.stagePatientProVos[index1].cpProjectVos[index2].cpAdvices
      this.projectAdvices = advices.map(item => {

        return {
          ...item.cpAdvice,
          categoryIndex: this.categoryIndex,
          checked: item.checked,
          name: item.cpAdviceName,
          hasChoose: item.hasChoose
        }
      })
      let arr = this.$store.state.cpAdvices
      this.projectAdvices.forEach(item => {
        if (item.hasChoose || item.checked) {
          this.$nextTick(() => {
            this.$refs.advicesTable.toggleRowSelection(item, true)
          }
          )
        }
      })
      arr.forEach(item => {

        if (item.hasChoose && index1 === item.categoryIndex) {
          this.$nextTick(() => {
            const advice2 = this.projectAdvices.filter(item2 => item2.id === item.id)[0]
            this.$refs.advicesTable.toggleRowSelection(advice2, true)
          }
          )
        }
      })

    },
    handleChangeCheck (index1, index2, value) {
      this.categoryIndex = index1
      this.projectIndex = index2
      //!全选
      let checkAll = true
      this.stage.stagePatientProVos[index1].cpProjectVos.forEach(project => {
        if (project.checked === false) {
          checkAll = false
        }
      });
      this.stage.stagePatientProVos[index1].checkAll = checkAll
      //!外框点击内部全选
      console.log('value', value);
      let count = 0
      let addItems = []
      this.stage.stagePatientProVos[index1].cpProjectVos[index2].cpAdvices.forEach(advice => {

        console.log('advice', advice);
        if (value) {
          advice.checked = value
          this.stage.stagePatientProVos[index1].cpProjectVos[index2].pending = false
          this.stage.stagePatientProVos[index1].cpProjectVos[index2].checked = true
          addItems.push({
            ...advice.cpAdvice,
            name: advice.cpAdviceName
          })

        } else {
          //!判断内部是否有不能删除的项目
          if (advice.hasChoose) {
            //!不能删除
            advice.checked = true
            count++
          } else {
            //!能删除
            advice.checked = false
            this.deleteTodo({ ...advice.cpAdvice, name: advice.cpAdviceName })
          }
        }

      })
      if (value) {
        this.selectionAdvices = addItems
        this.confirmAdd()

      }
      if (!value) {
        //!判断是否全部是不可取消的
        if (count === this.stage.stagePatientProVos[index1].cpProjectVos[index2].cpAdvices.length) {
          this.stage.stagePatientProVos[index1].cpProjectVos[index2].pending = false
          this.stage.stagePatientProVos[index1].cpProjectVos[index2].checked = true


        } else if (count > 0 && count < this.stage.stagePatientProVos[index1].cpProjectVos[index2].cpAdvices.length) {
          this.stage.stagePatientProVos[index1].cpProjectVos[index2].pending = true

        } else if (count === 0) {
          this.stage.stagePatientProVos[index1].cpProjectVos[index2].pending = false
          this.stage.stagePatientProVos[index1].cpProjectVos[index2].checked = false

        }
      }


    },
    handleCheckAllChange (index1, value) {
      this.stage.stagePatientProVos[index1].cpProjectVos.forEach(project => {
        project.checked = value
      });
    },
    getHead (id) {
      getPatientCpHeader(id).then(head => {
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
    parseContent (stage) {
      let stageProVos = stage.stagePatientProVos.map(category => {
        //处理变异
        let varPro = []
        let varExec = []
        if (category.varAdvices) {
          varPro = category.varAdvices.map(varAdvice => {
            return {
              cpProject: { ...varAdvice.advice, content: varAdvice.treatment.name },
              cpAdvice: []
            }
          })
          varExec = category.varAdvices.map(varAdvice => {
            return {
              advices: [],
              patientCpExec: varAdvice.patientCpExec
            }
          })
        }
        category.cpProjectVos = category.cpProjectVos.concat(varPro)
        category.patientCpExecVos = category.patientCpExecVos.concat(varExec)
        let checkAll = true

        let newCpPros = category.cpProjectVos.map((project, index) => {
          let pending = false
          let count = 0
          let checked = category.patientCpExecVos[index].patientCpExec ? true : false
          if (!checked) {
            checkAll = false
          }
          if (project.cpAdvices) {
            project.cpAdvices.forEach(advice => {
              if (advice.hasChoose) {
                count++
              }
              this.allPathIds.push({ treatmentId: advice.cpAdvice.treatmentId, cpAdviceId: advice.cpAdvice.id }) //!全部路径内的id
            })
            if (project.cpAdvices.length > count && count > 0) {
              pending = true
            } else {
              pending = false

            }
          }
          return {
            ...project,
            checked: checked,
            pending: pending
          }
        })
        return {
          checkAll: checkAll,
          classification: category.classification,
          cpProjectVos: newCpPros,
          patientCpExecVos: category.patientCpExecVos
        }
      })
      return {
        dayNum: stage.dayNum,
        stagePatientProVos: stageProVos
      }
    },
    getStage () {
      getStageDayPatientExec({ patientId: this.patientId, stageId: this.stageId, dayNum: this.dayNum }).then(stage => {
        console.log('stage', stage);
        this.stage = this.parseContent(stage)
      })
    },


  }
}
</script>
 
<style lang="scss" scoped>
/* .error {
  background: #f29308;
} */
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

          width: 99%;
          height: 240px;
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
        .short-order {
          margin-bottom: 10px;
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
::v-deep .el-checkbox__label {
  font-size: 12px;
}
::v-deep .el-card__header {
  padding: 0px !important;
}
.add {
  margin-top: 4px;
  width: 100%;
  display: flex;
  border-radius: 10px;
  justify-content: center;
  color: #3981ee;
  cursor: pointer;
  width: 98%;
  margin-left: 2%;
}
.errorP,
.noteP {
  margin: 0 !important;
}
.error {
  background: #e8a35f;
}
</style>
 



