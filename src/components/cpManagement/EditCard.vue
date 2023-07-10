<template>
  <div class="edit-card">
    <div class="head">{{head}}</div>
    <div class="title">{{title}}</div>
    <div class="main">
      <el-table :data="orderInfos" border style="width: 100%">
        <el-table-column label="路径项目" prop="label" width="200">
          <template slot-scope="scope">
            <div class="inner">
              <div class="label">
                {{scope.row.cpProject.content}}
                <i
                  class="el-icon-circle-close red"
                  @click="deleteProject(scope.row.cpProject.id)"
                ></i>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="医嘱摘要" prop="zaiyao">
          <template slot-scope="scope">
            <div v-for="item in scope.row.cpAdvices" :key="item.cpAdviceName" class="inner">
              <div class="wrapper">
                <span>{{item.cpAdviceName}}</span>
                <span
                  style="marginLeft:4px"
                >{{item.cpAdvice.execFreq?item.cpAdvice.execFreq:''}}</span>
              </div>

              <div class="icons">
                <i class="el-icon-edit" @click="edit(scope.row.cpProject.id)"></i>
                <i class="el-icon-close" @click="deleteItem(item)"></i>
              </div>
            </div>
            <div class="add">
              <i class="el-icon-circle-plus-outline" @click="addadvice(scope.row.cpProject.id)"></i>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="info" width="360">
          <template slot="header">
            <div class="header">
              <span>医嘱信息</span>
            </div>
          </template>
          <template slot-scope="scope">
            <div class="wrapper">
              <div class="left">
                <el-form>
                  <el-form-item label="生成者:">
                    <el-select v-model="scope.row.info.createPerson" size="mini">
                      <el-option label="医生" value="1"></el-option>
                      <el-option label="护士" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="执行者:">
                    <el-select v-model="scope.row.info.todoPerson" size="mini">
                      <el-option label="医生" value="1"></el-option>
                      <el-option label="护士" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="项目类型:">
                    <el-select v-model="scope.row.info.type" size="mini">
                      <el-option label="医嘱型" value="1"></el-option>
                      <el-option label="检查型" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
              <div class="right">
                <el-form>
                  <el-form-item label="执行方式:">
                    <el-select v-model="scope.row.info.todoType" size="mini">
                      <el-option label="必要时执行" value="1"></el-option>
                      <el-option label="一直执行" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="生成方式">
                    <el-select v-model="scope.row.info.createType" size="mini">
                      <el-option label="每天生成" value="1"></el-option>
                      <el-option label="每周生成" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="项目图标:">
                    <i :class="scope.row.info.icon"></i>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </template>
        </el-table-column>-->
      </el-table>
    </div>
    <div class="btns">
      <el-button type="primary" @click="addNewProject">新增</el-button>
      <el-button type="success" @click="confirmSave">确定保存</el-button>
    </div>
    <el-dialog :visible.sync="showDia" width="80%">
      <addorder-template @close="showDia = false" :addNoUpdate="true" @addItem="handleAddItem"></addorder-template>
    </el-dialog>
  </div>
</template>

<script>
import AddorderTemplate from '../orderManagement/AddorderTemplate.vue';
import { getOneTableCpAdvice, addCpProject, addCpAdviceToProject, deleteCpAdvice, deleteCpProject } from '@/api/cp-template'
export default {
  components: { AddorderTemplate },
  props: {
    cpProjId: 1,
    cpTempId: Number,
    stageId: Number,
    classification: String,
  },
  computed: {
    singleOrder () {
      return this.$store.state.singleOrder
    },
    judgeRender () {
      return `${this.cpTempId}${this.stageId}${this.classification}`
    }
  },
  data () {
    return {
      showDia: false,
      head: "长期医嘱",
      title: "住院第二天",
      orderInfos: [
        // {
        //   id: 1,
        //   cpProjectName: ' 骨髓穿刺和骨髓活检（必要时）',
        //   cpAdvices: [
        //     { index: 0, label: '长嘱：苯丁酸氮芥单用或联合利妥昔单抗：10mg/(m2d)，d1～7' },
        //     { index: 1, label: '长嘱：利妥昔单抗375～500mg/m2，d1' },
        //     { index: 2, label: '长嘱：氟达拉滨单用：F 25mg/(m2d)，d1～5' },
        //     { index: 3, label: '长嘱：FC方案: F 25mg/(m2d)，d1～3；CTX 250mg/(m2d)，d1～3' },
        //   ],
        //   info: {
        //     createPerson: "医生",
        //     todoPerson: "医生",
        //     type: "医嘱类",
        //     todoType: "必要时执行",
        //     createType: "每天生成",
        //     icon: "el-icon-aim"
        //   }
        // },
        // {
        //   id: 2,
        //   label: ' 骨髓形态学、病理、免疫组化（必要时）',
        //   zaiyao: [
        //     { index: 0, label: '长嘱：苯丁酸氮芥单用或联合利妥昔单抗：10mg/(m2d)，d1～7' },
        //     { index: 1, label: '长嘱：利妥昔单抗375～500mg/m2，d1' },
        //     { index: 2, label: '长嘱：氟达拉滨单用：F 25mg/(m2d)，d1～5' },
        //     { index: 3, label: '长嘱：FC方案: F 25mg/(m2d)，d1～3；CTX 250mg/(m2d)，d1～3' },
        //   ],
        //   info: {
        //     createPerson: "医生",
        //     todoPerson: "医生",
        //     type: "医嘱类",
        //     todoType: "必要时执行",
        //     createType: "每天生成",
        //     icon: "el-icon-aim"
        //   }
        // },
        // {
        //   id: 3,
        //   label: ' 外周血免疫表型',
        //   zaiyao: [
        //     { index: 0, label: '长嘱：苯丁酸氮芥单用或联合利妥昔单抗：10mg/(m2d)，d1～7' },
        //     { index: 1, label: '长嘱：利妥昔单抗375～500mg/m2，d1' },
        //     { index: 2, label: '长嘱：氟达拉滨单用：F 25mg/(m2d)，d1～5' },
        //     { index: 3, label: '长嘱：FC方案: F 25mg/(m2d)，d1～3；CTX 250mg/(m2d)，d1～3' },
        //   ],
        //   info: {
        //     createPerson: "医生",
        //     todoPerson: "医生",
        //     type: "医嘱类",
        //     todoType: "必要时执行",
        //     createType: "每天生成",
        //     icon: "el-icon-aim"
        //   }
        // },
        // {
        //   id: 4,
        //   label: ' 外周血细胞(CpG刺激)/分子遗传学',
        //   zaiyao: [
        //     { index: 0, label: '长嘱：苯丁酸氮芥单用或联合利妥昔单抗：10mg/(m2d)，d1～7' },
        //     { index: 1, label: '长嘱：利妥昔单抗375～500mg/m2，d1' },
        //     { index: 2, label: '长嘱：氟达拉滨单用：F 25mg/(m2d)，d1～5' },
        //     { index: 3, label: '长嘱：FC方案: F 25mg/(m2d)，d1～3；CTX 250mg/(m2d)，d1～3' },
        //   ],
        //   info: {
        //     createPerson: "医生",
        //     todoPerson: "医生",
        //     type: "医嘱类",
        //     todoType: "必要时执行",
        //     createType: "每天生成",
        //     icon: "el-icon-aim"
        //   }
        // },
      ]
    }

  },
  methods: {
    deleteProject (id) {
      deleteCpProject({ id: id }).then(res => {
        if (res) {
          this.sMessage('删除项目成功')
          this.getData()
        }

      })
    },
    deleteItem (advice) {
      console.log('advice', advice);
      deleteCpAdvice({ id: advice.cpAdvice.id }).then(res => {
        this.sMessage(`删除医嘱${advice.cpAdviceName}删除`)
        this.getData()
      })
    },
    confirmSave () {
      this.$emit('close')
      this.$emit('refresh')
    },
    handleAddItem (data) {
      console.log('data', data);
      addCpAdviceToProject({ ...data, cpProjId: this.cpProjId }).then(res => {
        this.getData()
      })
    },
    getData () {
      let data = {
        cpTempId: this.cpTempId,
        stageId: this.stageId,
        classification: this.classification,
      }
      getOneTableCpAdvice(data).then(advice => {
        console.log('advice', advice);
        this.orderInfos = advice
      })
    },
    addadvice (id) {
      this.cpProjId = id
      this.showDia = true
    },
    edit (scope) {
      console.log('scope', scope);
    },
    addNewProject () {
      this.$prompt('请输入项目名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        let data = {
          cpTempId: this.cpTempId,
          content: value,
          stageId: this.stageId,
          classification: this.classification
        }
        addCpProject(data).then(res => {
          this.sMessage('新增项目成功')
          this.getData()
        })
      })

    }
  },

  mounted () {
    this.getData()
  },
  watch: {
    singleOrder (newV) {
      this.orderInfos[0].zaiyao.push({
        index: 4, label: newV
      })
    },

    judgeRender: function () {
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-card {
  .add {
    margin-top: 4px;
    width: 100%;
    display: flex;
    border-radius: 10px;
    color: #3981ee;
    justify-content: center;
    font-size: 18px;
    cursor: pointer;
  }

  .head {
    height: 40px;
    background: #3981ee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    color: white;
  }
  .title {
    height: 40px;
    background: #3981ee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    color: white;
  }
  .main {
    .inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        cursor: pointer;
      }
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        font-size: 18px;
        cursor: pointer;
      }
    }
    .wrapper {
      display: flex;
      .left {
        width: 50%;
        padding-left: 2%;
        box-sizing: border-box;
      }
      .right {
        width: 50%;
        padding-left: 2%;
        box-sizing: border-box;
      }
    }
  }
  .btns {
    display: flex;
    justify-content: space-between;
    height: 50px;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 10px;
    padding-bottom: 10px !important;
  }
}
::v-deep .el-form-item {
  margin-bottom: 0px !important;
  display: flex;
  align-items: center;
}
::v-deep .el-form-item__label {
  display: inline-block;
  width: 120px;
  font-size: 12px;
}
</style>
