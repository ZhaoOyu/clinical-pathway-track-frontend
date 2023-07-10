<template>
  <div class="cp-main">
    <div class="wrapper">
      <el-card
        v-for="(stage,index1) in stages"
        :key="index1"
        class="stage"
        :class="{'double':doubleStage[index1]}"
      >
        <div slot="header" class="stage-header">
          <span class="title">{{stage.cpStage.name}}</span>
        </div>
        <el-card v-for="(day,index2) in stage.cpStagesDays" :key="day.dayNum" class="day">
          <div slot="header" class="header">
            <div class="empty"></div>
            <span class="title">第{{day.dayNum}}天</span>

            <span v-if="!day.patientCpEvaluateVO.result">
              <el-tooltip
                effect="light"
                placement="bottom-start"
                style="margin-right: 5px"
                content="智能变异辅助"
              >
                <i class="el-icon-rank purple" @click="showError=true"></i>
              </el-tooltip>
              <el-tooltip
                effect="light"
                placement="bottom-start"
                style="margin-right: 5px"
                content="补充"
              >
                <i class="el-icon-edit orange" @click="clickAdd(stage.cpStage.id,day.dayNum)"></i>
              </el-tooltip>
              <el-tooltip
                effect="light"
                placement="bottom-start"
                style="margin-right: 5px"
                content="评估"
              >
                <i class="el-icon-thumb red" @click="beginEvalute(index1,index2)"></i>
              </el-tooltip>
              <el-tooltip
                effect="light"
                placement="bottom-start"
                style="margin-right: 5px"
                content="生成"
              >
                <i class="el-icon-folder-add green" @click="clickAdd(stage.cpStage.id,day.dayNum)"></i>
              </el-tooltip>
            </span>
            <span v-else>
              <i class="el-icon-circle-check green"></i>
              <span>已完成</span>
              <el-tooltip
                effect="light"
                placement="bottom-start"
                style="margin-right: 5px"
                content="生成"
              ></el-tooltip>
            </span>
          </div>
          <el-card
            v-for="(category,index3) in day.oneTablePatientProVOList"
            :key="category.classification"
            class="work"
          >
            <div slot="header" class="work-header">
              <span class="title">{{category.classification}}</span>
              <div :style="{width:'100px'}"></div>
              <div class="btn-wrapper" v-if="!category.execAll">
                <el-checkbox
                  v-model="category.checkAll"
                  @change="value=>handleCheckAllChange(index1,index2,index3,value)"
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
                    @click="execList(index1,index2,index3)"
                  ></i>
                  c
                </el-tooltip>
              </div>
            </div>
            <div class="card-main">
              <div v-for="(project,index4) in category.cpProjects" :key="index4" class="item">
                <div
                  class="exec"
                  v-if="category.patientCpExecs[index4].executor && !category.patientCpExecs[index4].isVari"
                >
                  <i class="el-icon-circle-check green" style="fontSize:16px"></i>
                  <span
                    style="marginLeft:8px"
                    @click="e=>clickProject(project,category.patientCpExecs[index4],e)"
                  >{{project.content}}</span>
                </div>

                <el-checkbox
                  v-model="project.checked"
                  v-if="!category.patientCpExecs[index4].executor && !category.patientCpExecs[index4].isVari"
                  @change="value=>handleChangeCheck(index1,index2,index3,value)"
                >
                  <span
                    @click="e=>clickProject(project,category.patientCpExecs[index4],e)"
                  >{{project.content}}</span>
                </el-checkbox>

                <div
                  class="exec error"
                  v-if="category.patientCpExecs[index4].executor && category.patientCpExecs[index4].isVari"
                >
                  <i class="el-icon-circle-check green" style="fontSize:16px"></i>
                  <span
                    style="marginLeft:8px"
                    @click="e=>clickProject(project,category.patientCpExecs[index4],e)"
                  >{{project.content}}</span>
                  <div :style="{marginLeft:'16px',height:'30px'}">
                    <p class="errorP">变异原因:{{category.patientCpExecs[index4].addReason}}</p>
                    <p class="errorP">变异说明:{{category.patientCpExecs[index4].projContent}}</p>
                  </div>
                </div>
                <div
                  v-if="!category.patientCpExecs[index4].executor && category.patientCpExecs[index4].isVari"
                  class="error"
                >
                  <el-checkbox
                    v-model="project.checked"
                    @change="value=>handleChangeCheck(index1,index2,index3,value)"
                  >
                    <span
                      @click="e=>clickProject(project,category.patientCpExecs[index4],e)"
                    >{{project.content}}</span>
                  </el-checkbox>
                  <div :style="{marginLeft:'16px',height:'30px'}">
                    <p class="errorP">变异原因:{{category.patientCpExecs[index4].addReason}}</p>
                    <p class="errorP">变异说明:{{category.patientCpExecs[index4].projContent}}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
          <el-card v-if="day.patientCpEvaluateVO.result" style="font-size:12px;">
            <p class="warning red"></p>
            <p class="result">评估结果:{{day.patientCpEvaluateVO.result === -1?'变异后继续':"正常"}}</p>
            <p class="reason">变异原因:{{day.patientCpEvaluateVO.variationReason}}</p>
            <p class="reason">变异说明:{{day.patientCpEvaluateVO.variationDesc}}</p>
            <p class="info">评估说明:{{day.patientCpEvaluateVO.description}}</p>
            <p class="person">评估人:{{day.patientCpEvaluateVO.evaluatePerson}}</p>
            <p>
              <span class="orange">阶段花费:2400</span>
              <span class="drg" :style="{marginLeft:'10px'}">占DRG:20%</span>
            </p>
          </el-card>
        </el-card>
      </el-card>
    </div>
    <div class="order-info" :style="{width: '100%'}">
      <el-table :data="orderInfos" border>
        <el-table-column prop="name" label="名称" width="220"></el-table-column>
        <!-- <el-table-column prop="content" label="内容" width="220"></el-table-column> -->

        <el-table-column prop="timeType" label="期效">
          <template slot-scope="scope">
            <span>{{ scope.row.timeType===0?"长期医嘱":"临时医嘱"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="execFreq" label="频率">
          <template slot-scope="scope">
            <span>{{scope.row.execFreq?scope.row.execFreq:"/"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="startExecTime" label="开始时间" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.startExecTime?new Date(scope.row.startExecTime).format('yyyy-MM-dd'):"/"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="endExecTime" label="结束时间" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.startExecTime?new Date(scope.row.endExecTime).format('yyyy-MM-dd'):"/"}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="everyUse" label="单量"></el-table-column>
        <el-table-column prop="totalUse" label="总量"></el-table-column>
        <el-table-column prop="deptId" label="执行科室">
          <span>内分泌科</span>
        </el-table-column>
        <!-- <el-table-column prop="checkMethod" label="用法"></el-table-column> -->
      </el-table>
    </div>
    <el-dialog :visible.sync="showError" width="80%">
      <error-help @close="handleClose"></error-help>
    </el-dialog>
    <el-dialog :visible.sync="evaluteShow" width="80%">
      <evaluate-stage @confirm="handleConfimEvaluate"></evaluate-stage>
    </el-dialog>
  </div>
</template>
 
<script>
import ErrorHelp from './ErrorHelp.vue'
import EvaluateStage from './EvaluateStage.vue';
import { getPatientCpContent, doPatientCpExec, evaluate, getExecProAdvices } from '@/api/patient.js'
export default {
  components: { ErrorHelp, EvaluateStage },
  props: {
    id: {//病人id
      type: Number
    }
  },
  watch: {
    id () {
      this.getContent()
    }
  },
  data () {
    return {
      doubleStage: [],
      showError: false,
      teshu: false,
      evaluteShow: false,
      stages: [],
      activeElement: null,
      orderInfos: [

      ]
    }
  },
  methods: {
    clickProject (project, projectExec, e) {
      console.log('e', e);
      console.log('project', project);
      this.activeElement && this.activeElement.classList.remove('orangeBackground')
      this.activeElement = e.target
      this.activeElement.classList.add('orangeBackground')
      console.log('project', project);
      getExecProAdvices(projectExec.id).then(adviceDetail => {
        console.log('adviceDetail', adviceDetail);
        this.orderInfos = adviceDetail.map(item => ({ ...item.treatment, ...item.advice })).map(item => {
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
    clickAdd (stageId, dayNum) {
      this.$router.push({
        path: '/cpAdd',
        query: {
          patientId: this.id,
          stageId: stageId,
          dayNum: dayNum
        }
      })
    },
    beginEvalute (index1, index2) {
      this.evaluteShow = true
      this.dayNum = this.stages[index1].cpStagesDays[index2].dayNum
      console.log('this.dayNum', this.dayNum);
    },
    execList (index1, index2, index3) {
      let list = []
      let category = this.stages[index1].cpStagesDays[index2].oneTablePatientProVOList[index3]
      category.cpProjects.forEach((item, index) => {
        if (item.checked === true && !item.executor) {
          //!没被执行且被勾选
          list.push(category.patientCpExecs[index].id)
        }
      })
      doPatientCpExec(list).then(res => {
        this.sMessage('执行医嘱成功')
        this.getContent()
      })
    },
    handleChangeCheck (index1, index2, index3, value) {
      let checkAll = true
      this.stages[index1].cpStagesDays[index2].oneTablePatientProVOList[index3].cpProjects.forEach(item => {
        if (item.checked === false) {
          checkAll = false
          return
        }
      })
      this.stages[index1].cpStagesDays[index2].oneTablePatientProVOList[index3].checkAll = checkAll
    },
    handleCheckAllChange (index1, index2, index3, value) {
      this.stages[index1].cpStagesDays[index2].oneTablePatientProVOList[index3].cpProjects.forEach(item => {
        item.checked = value
      })

    },
    handleClose () {
      this.showError = false
      this.stages[1].longOrders.tasks.push({ label: '葡萄糖', status: 0, checked: false })
      this.stages[1].longOrders.tasks.push({ label: '氯化钠注射液 0.9%100ml:0.9g', status: 1, checked: false, error: true, errorReason: '术后感染', errorInfo: '无' })
    },
    handleConfimEvaluate (evaluteInfo) {
      evaluate({ ...evaluteInfo, patientId: this.id, dayNumber: this.dayNum }).then(res => {
        this.sMessage("评估成功")
        this.evaluteShow = false
        this.getContent()
      })


    },
    parseContent (content) {
      return content.map((stage, index) => {
        let cpStagesDays = stage.cpStagesDays.map(day => {
          let oneTablePatientProVOList = day.oneTablePatientProVOList.map(table => {
            let varPro = []
            let varExec = []
            //把变异的信息加到cpProjects
            if (table.varAdvices) {

              varPro = table.varAdvices.map(item => {
                return {
                  ...item.advice,
                  content: item.treatment.name
                }
              })
              varExec = table.varAdvices.map(item => item.patientCpExec)
            }
            table.cpProjects = table.cpProjects.concat(varPro)
            table.patientCpExecs = table.patientCpExecs.concat(varExec)

            let checkAll = true
            let execAll = true
            table.patientCpExecs.forEach(proStatus => {
              if (!proStatus.executor) {
                checkAll = false
                execAll = false
                return
              }

            })


            return {
              checkAll: checkAll, //表示未全选
              execAll: execAll,//表示全部执行
              classification: table.classification,
              cpProjects: table.cpProjects.map((project, index) => {
                let checked = false
                if (table.patientCpExecs[index].executor) {
                  checked = true
                }
                return {
                  ...project,
                  checked: checked,
                  executor: table.patientCpExecs[index].executor
                }
              }),
              patientCpExecs: table.patientCpExecs,
            }
          })

          return {
            dayNum: day.dayNum,
            oneTablePatientProVOList: oneTablePatientProVOList,
            patientCpEvaluateVO: day.patientCpEvaluateVO
          }
        })
        console.log('stage', stage);
        if (stage.cpStage.endDay !== stage.cpStage.startDay) {
          this.doubleStage[index] = true
        } else {
          this.doubleStage[index] = false

        }

        return {
          cpStage: stage.cpStage,
          cpStagesDays: cpStagesDays
        }
      })

    },
    getContent () {
      if (this.id > 0) {
        getPatientCpContent(this.id).then(content => {
          console.log('content', content);
          this.stages = this.parseContent(content)

        })
      }


    }
  },
  mounted () {
    this.getContent()
  }
}
</script>
 
<style lang="scss" scoped>
.cp-main {
  margin-top: 4px;
  .wrapper {
    width: 100%;
    overflow-x: auto;
    display: flex;
    .double {
      min-width: 740px !important;
    }
    .stage {
      min-width: 370px;
      /* overflow-x: auto; */
      margin-right: 10px;
      .stage-header {
        display: flex;
        justify-content: center;
      }
      .el-card__body {
        .day {
          margin-right: 8px;
          min-width: 350px;
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .empty {
              width: 48px;
            }
            i {
              font-size: 18px;
              cursor: pointer;
              margin-right: 4px;
            }
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
              }
            }
          }
        }
      }

      .evalute {
        font-size: 12px;
      }
    }
  }
}
.title {
  font-size: 14px;
}
.error {
  background: #e8a35f;
}
.errorP,
.noteP {
  margin: 0 !important;
}
::v-deep .el-checkbox__label {
  font-size: 12px;
}
::v-deep .el-card__header {
  padding: 10px !important;
}
::v-deep .stage > .el-card__body {
  display: flex;
  width: 100%;
  overflow: auto;
}
</style>