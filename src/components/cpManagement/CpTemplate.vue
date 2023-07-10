<template>
  <div class="cp-template">
    <div class="wrapper" v-if="stages.length">
      <el-card v-for="(stage,index) in stages" :key="index">
        <div slot="header" class="header">
          <div class="drg">
            <span class="white">预计阶段花费:{{stage.yujiMoney}}</span>
            <span class="white medium bold">占DRG:{{stage.percentage}}</span>
          </div>
          <span class="title">{{stage.name}}</span>

          <span>
            <el-tooltip
              effect="light"
              placement="bottom-start"
              style="margin-right: 5px"
              content="修改"
            >
              <i
                class="el-icon-s-operation purple"
                @click="editStage(index,stage.id,stage.version)"
              ></i>.
            </el-tooltip>
            <el-tooltip
              effect="light"
              placement="bottom-start"
              style="margin-right: 5px"
              content="增加"
            >
              <i class="el-icon-folder-add green" @click="addStage(stage.version)"></i>
            </el-tooltip>
            <el-tooltip
              effect="light"
              placement="bottom-start"
              style="margin-right: 5px"
              content="删除"
            >
              <i class="el-icon-circle-close red"></i>
            </el-tooltip>
          </span>
        </div>
        <el-card class="work cardMessage">
          <div slot="header" class="work-header">
            <span class="title">主要诊疗工作</span>
            <div :style="{width:'100px'}"></div>
            <div class="btn-wrapper">
              <el-tooltip
                effect="light"
                placement="bottom-start"
                style="margin-right: 5px"
                content="修改"
              >
                <i
                  class="el-icon-edit purple"
                  :style="{marginLeft:'4px',cursor:'pointer'}"
                  @click="showDia(stage.id,'主要诊疗工作')"
                ></i>
              </el-tooltip>
            </div>
          </div>
          <div class="card-main">
            <div v-for="(item,index) in stage.work.tasks" :key="index" class="item">
              <i class="el-icon-circle-check green" v-if="item.status === 1"></i>
              <el-checkbox v-model="item.checked" v-if="item.status === 0">
                <span @click="e=>handleClickItem(e,item.id)">{{item.content}}</span>
              </el-checkbox>
            </div>
          </div>
        </el-card>
        <el-card class="long-order cardMessage">
          <div slot="header" class="work-header">
            <span class="title">长期医嘱</span>
            <div class="btn-wrapper">
              <el-tooltip
                effect="light"
                placement="bottom-start"
                style="margin-right: 5px"
                content="修改"
              >
                <i
                  class="el-icon-edit purple"
                  :style="{marginLeft:'4px',cursor:'pointer'}"
                  @click="showDia(stage.id,'长期医嘱')"
                ></i>
              </el-tooltip>
            </div>
          </div>
          <div class="card-main">
            <div v-for="item in stage.longOrders.tasks" :key="item.content" class="item">
              <i class="el-icon-circle-check green" v-if="item.status === 1"></i>
              <el-checkbox v-model="item.checked" v-if="item.status === 0">
                <span @click="e=>handleClickItem(e,item.id)">{{item.content}}</span>
              </el-checkbox>
            </div>
          </div>
        </el-card>
        <el-card class="short-order cardMessage">
          <div slot="header" class="work-header">
            <span class="title">临时医嘱</span>
            <div class="btn-wrapper">
              <el-tooltip
                effect="light"
                placement="bottom-start"
                style="margin-right: 5px"
                content="修改"
              >
                <i
                  class="el-icon-edit purple"
                  :style="{marginLeft:'4px',cursor:'pointer'}"
                  @click="showDia(stage.id,'临时医嘱')"
                ></i>
              </el-tooltip>
            </div>
          </div>
          <div class="card-main">
            <div v-for="item in stage.shortOrders.tasks" :key="item.content" class="item">
              <i class="el-icon-circle-check green" v-if="item.status === 1"></i>
              <el-checkbox v-model="item.checked" v-if="item.status === 0">
                <span @click="e=>handleClickItem(e,item.id)">{{item.content}}</span>
              </el-checkbox>
            </div>
          </div>
        </el-card>
        <el-card class="care cardMessage">
          <div slot="header" class="work-header">
            <span class="title">主要护理工作</span>
            <div class="btn-wrapper">
              <el-tooltip
                effect="light"
                placement="bottom-start"
                style="margin-right: 5px"
                content="修改"
              >
                <i
                  class="el-icon-edit purple"
                  :style="{marginLeft:'4px',cursor:'pointer'}"
                  @click="showDia(stage.id,'主要护理工作')"
                ></i>
              </el-tooltip>
            </div>
          </div>
          <div class="card-main">
            <div v-for="item in stage.careWorks.tasks" :key="item.content" class="item">
              <i class="el-icon-circle-check green" v-if="item.status === 1"></i>
              <el-checkbox v-model="item.checked" v-if="item.status === 0">
                <span @click="e=>handleClickItem(e,item.id)">{{item.content}}</span>
              </el-checkbox>
            </div>
          </div>
        </el-card>
      </el-card>
    </div>
    <div class="order-info" v-if="orderInfos.length">
      <el-table :data="orderInfos" border>
        <el-table-column prop="name" label="名称" width="240"></el-table-column>
        <!-- <el-table-column prop="content" label="内容"></el-table-column> -->

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

        <el-table-column prop="everyUse" label="单量"></el-table-column>
        <el-table-column prop="totalUse" label="总量"></el-table-column>
        <el-table-column prop="deptId" label="执行科室">
          <span>内分泌科</span>
        </el-table-column>
      </el-table>
    </div>
    <el-empty v-if="!stages.length" style="width:calc(100vw - 340px)">
      <el-button type="primary" @click="addStage">新增阶段</el-button>
    </el-empty>
    <div class="bodyPadding">
      <el-dialog :visible.sync="cardShow" width="60%">
        <!-- <error-help></error-help> -->
        <edit-card
          @close="cardShow=false"
          :cpTempId="id"
          :stageId="stageId"
          :classification="classification"
          @refresh="handleGetData"
        ></edit-card>
      </el-dialog>
    </div>
    <div class="beginDay">
      <el-dialog title="阶段起始天数" :visible.sync="showStage" width="60%">
        <el-form label-width="80px">
          <el-form-item label="起始天数">
            <el-input v-model="startDay"></el-input>
          </el-form-item>
          <el-form-item label="结束天数">
            <el-input v-model="endDay"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showStage = false">取 消</el-button>
          <el-button type="primary" @click="addStageConfirm" v-if="addOrUpdate">确 定</el-button>
          <el-button type="primary" @click="confirmEditStage" v-else>确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import EditCard from './EditCard.vue'
import { getAllDept } from '@/api/my-template.js'
import { getTemplateContent, addCpStage, updateCpStage, getCpAdviceInfo } from '@/api/cp-template'
const nature = ['无执行的叮嘱', '病人所在科室', '病人所在病区', '开单人所在科室', '制定科室', '院外执行']
export default {
  components: { EditCard },
  computed: {
    singleOrder () {
      return this.$store.state.singleOrder
    }
  },
  props: {
    id: { //模板id
      type: Number,
      // default: 1
    }
  },
  watch: {
    id () {
      this.getStageData()

    },
    singleOrder (newV) {
      this.stages[0].longOrders.tasks.push({ content: newV, status: 0, checked: false },)
    }
  },
  data () {
    return {
      addOrUpdate: true,
      showStage: false,
      startDay: 1,
      endDay: 1,
      stageId: 1,
      classification: "主要诊疗工作",
      activeElement: null,
      cardShow: false,
      stages: [],

      orderInfos: [

      ]
    }
  },

  methods: {
    handleGetData () {
      this.getStageData()
    },
    confirmEditStage () {
      console.log('stageId', this.stageId);
      let data = {
        id: this.stageId,
        cpTempId: this.id,
        startDay: Number(this.startDay),
        endDay: Number(this.endDay),
        version: this.stageVersion
      }
      updateCpStage(data).then(stage2 => {
        this.sMessage('更新模板成功')
        this.getStageData()

        this.showStage = false

      })
      this.addOrUpdate = true

    },
    editStage (index, stageId, version) {
      this.stageVersion = version

      this.showStage = true
      this.startDay = this.stages[index].startDay
      this.endDay = this.stages[index].endDay
      this.addOrUpdate = false
      this.stageId = stageId

    },
    addStageConfirm () {
      let data = {
        cpTempId: this.id,
        startDay: Number(this.startDay),
        endDay: Number(this.endDay),
        version: this.stageVersion


      }
      addCpStage(data).then(stage => {
        console.log('stage', stage);
        this.getStageData()

      })
      this.showStage = false

    },
    addStage (version) {
      if (typeof version === 'Number') this.stageVersion = version
      this.showStage = true
    },
    handleCheckAllChange () {

    },
    showDia (stageId, classification) {
      this.stageId = stageId
      this.classification = classification
      this.cardShow = true
    },
    handleClickItem (e, id) {
      console.log('e', e);
      this.activeElement && this.activeElement.classList.remove('orangeBackground')
      this.activeElement = e.target
      this.activeElement.classList.add('orangeBackground')
      getCpAdviceInfo(id).then(advices => {
        console.log('advices', advices);
        this.orderInfos = advices.map(advice => {
          let advice2 = {
            ...advice.cpAdvice,
            cpAdviceName: advice.cpAdviceName,


          }
          let department = this.departments.filter(item => item.id === advice2.execDeptId)[0] ? this.departments.filter(item => item.id === advice2.execDeptId)[0].name : ""
          advice2['name'] = advice.cpAdviceName
          advice2['deptId'] = "内分泌科"
          advice2['execNature'] = nature[advice2.execNature ? advice2.execNature : 0]

          if (!advice2.name) {
            advice2.name = advice2.content
          }
          if (!advice2.content) {
            advice2.content = advice2.name
          }
          return advice2
        })
      })

    },
    getStageData () {

      if (!this.id) return
      getTemplateContent(this.id).then(res3 => {
        console.log('res3', res3);
        this.$emit('empty', res3.length)
        this.stages = res3.map(stage => {
          let work = []
          let longOrders = []
          let shortOrders = []
          let careWorks = []
          stage.cpProjects.forEach(project => {
            project['status'] = 0
            project['checked'] = false
            if (project.classification === '主要诊疗工作') {
              work.push(project)
            } else if (project.classification === '长期医嘱') {
              longOrders.push(project)
            } else if (project.classification === '临时医嘱') {
              shortOrders.push(project)
            } else {
              careWorks.push(project)
            }
          });
          return {

            yujiMoney: '1128',
            percentage: '25%',
            ...stage.cpStage,
            work: {
              checkAll: true,
              tasks: work
            },
            longOrders: {
              checkAll: true,
              tasks: longOrders
            },
            shortOrders: {
              checkAll: true,
              tasks: shortOrders
            },
            careWorks: {
              checkAll: true,
              tasks: careWorks
            },
          }
        })
      })
    }
  },
  mounted () {
    this.getStageData()
    getAllDept().then(res => {
      this.departments = res
    })
  },
  watch: {
    id (newId) {
      this.getStageData()
    }
  }
}

</script>

<style lang="scss" scoped>
.cp-template {
  margin-top: 4px;
  /* width: 100%; */

  .wrapper {
    display: flex;
    /* justify-content: center; */

    width: 100%;
    overflow-x: auto;
    .el-card {
      min-width: 290px;
      margin-right: 10px;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #3981ee;
        height: 38px;
        font-weight: 600;
        line-height: 32px;
        .drg {
          font-size: 12px;
          transform: scale(0.8);
          span {
            font-weight: 400;

            display: block;
            height: 18px;
            line-height: 18px;
          }
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
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        margin-bottom: 10px;
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
      .long-order {
        margin-bottom: 10px;
        overflow-y: scroll;
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
          }
        }
      }
      .short-order {
        margin-bottom: 10px;
        overflow-y: scroll;
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
          }
        }
      }
      .care {
        margin-bottom: 10px;
        overflow-y: scroll;
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
::v-deep .cardMessage .el-card__header {
  padding: 10px !important;
}
::v-deep .el-card__header {
  padding: 0px !important;
}
::v-deep .bodyPadding .el-dialog__body {
  padding: 0 !important;
}
::v-deep .beginDay .el-dialog__header {
  display: block !important;
}
</style>
