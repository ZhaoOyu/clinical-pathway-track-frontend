<template>
  <div class="cp-management">
    <el-card class="left">
      <el-input placeholder="请输入患者名或编号" suffix-icon="el-icon-search"></el-input>
      <div class="list">
        <el-menu :default-active="avtive" class="el-menu-vertical-demo">
          <el-submenu index="0" v-for="(dept,index1) in patients" :key="index1">
            <template slot="title">
              <span>{{dept.deptName}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(item,index) in dept.templates"
                :key="item.id"
                :index="`${index1} - ${index}`"
                @click="e=>handleClickMenu(item.id)"
              >{{item.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="button">
        <el-button type="primary" @click="addNewTemplate">新增模板</el-button>
      </div>
    </el-card>
    <div class="right" v-if="!addStatus">
      <el-card class="head">
        <div class="wrapper">
          <div class="left">
            <div class="first-line">
              <i :class="template.icon"></i>
              <span>对应病种:{{template.name}}</span>
              <div class="circle"></div>
              <span>{{template.result}}</span>
            </div>
            <div class="second-line">
              <i class="el-icon-s-order"></i>
              <span>第{{template.latestVersion}}版</span>
              <span>创建人:{{template.creator}}</span>
              <span>审核人:{{template.reviewer}}</span>
              <span>{{template.createTime}}</span>
              <span>
                平均模板费用/DRG控费:
                <span
                  class="red bold"
                >{{template.standardPrice}}/{{Number(template.standardPrice)+120}}</span>
              </span>
            </div>
            <div class="third-line">
              <span>
                标准住院日:{{template.standardDay}}
                <i class="el-icon-edit" @click="handleEdit(0)"></i>
              </span>
              <span>
                标准费用:{{template.standardPrice}}
                <i class="el-icon-edit" @click="handleEdit(1)"></i>
              </span>
              <span>
                变异系数:{{template.variationNum}}
                <i class="el-icon-edit" @click="handleEdit(2)"></i>
              </span>
              <span>
                确诊天数{{template.quezhenDays}}
                <i class="el-icon-edit" @click="handleEdit(3)"></i>
              </span>
              <span class="warning">
                <i class="el-icon-warning"></i>
                <span>双击单元格或点击查看按钮进行临床路径编辑操作</span>
              </span>
            </div>
          </div>
          <div class="right">
            <el-button type="primary">提交</el-button>
            <el-button type="danger">停用</el-button>
            <el-button type="warning" @click="bigDataShow=true">大数据生成</el-button>
          </div>
        </div>
      </el-card>
      <div class="main" :style="{marginTop:'8px'}">
        <div class="main-center">
          <cp-template :id="id"></cp-template>
        </div>
      </div>
    </div>
    <div class="add-right" v-if="addStatus">
      <add-new-template @refresh="handleRefresh"></add-new-template>
    </div>
    <div class="bodyPadding">
      <el-dialog :visible.sync="bigDataShow" width="90%">
        <!-- <error-help></error-help> -->
        <big-data @close="bigDataShow = false"></big-data>
      </el-dialog>
    </div>
    <el-dialog :title="editTitle" :visible.sync="editShow" class="addHeader">
      <el-form>
        <el-form-item :label="editTitle" label-width="120px">
          <el-input v-model="template.standardDay" autocomplete="off" v-if="editTitle==='标准住院日'"></el-input>
          <el-input v-model="template.standardPrice" autocomplete="off" v-if="editTitle==='标准费用'"></el-input>
          <el-input v-model="template.variationNum" autocomplete="off" v-if="editTitle==='变异系数'"></el-input>
          <el-input v-model="template.quezhenDays" autocomplete="off" v-if="editTitle==='确诊天数'"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editShow = false">取 消</el-button>
        <el-button type="primary" @click="editClose">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AddorderTemplate from '../orderManagement/AddorderTemplate.vue'
import CpTemplate from './CpTemplate'
import ErrorHelp from '../cpPatient/ErrorHelp.vue'
import OrderInfo from '../cpPatient/OrderInfo.vue'
import BigData from './BigData.vue'
import { getAllCpTemplate, getTemplateHeader, updateCpTempBasicInfo } from '@/api/cp-template'
import AddNewTemplate from './AddNewTemplate.vue'
export default {
  components: { CpTemplate, ErrorHelp, AddorderTemplate, OrderInfo, BigData, AddNewTemplate },
  data () {
    return {
      editShow: false,
      addStatus: false,
      editTitle: "",
      id: 0,
      avtive: '0 - 0',
      bigDataShow: false,
      dialogTableVisible: true,

      patients: {},
      //模板基础信息
      template: {},
      type: '临床路径',
      mainType: '临床路径',
    }
  },

  methods: {
    addNewTemplate () {
      this.addStatus = true
    },
    handleRefresh () {
      getAllCpTemplate().then(res => {
        console.log('res', res);
        this.patients = res.map(item => {
          return {
            templates: item.cpTemplates,
            deptName: item.deptName
          }
        })
      })
    },
    editClose () {
      this.editShow = false
      const data = {
        cpTemplate: {
          ...this.template
        },
        cpVersion: {
          ...this.template

        }
      }
      updateCpTempBasicInfo(data).then(res => {
        console.log('res', res);
        this.sMessage("修改信息成功")
        getTemplateHeader(id).then(res2 => {
          console.log('res2', res2);
          this.template = {
            icon: 'el-icon-aim',
            result: '已审核通过',
            ...res2.cpTemplate,
            ...res2.cpVersion,
            creator: res2.creator,
            reviewer: res2.reviewer,


            createTime: new Date(res2.cpVersion.createTime).format('yyyy-MM-dd'),
            averageMoney: 4400,
            drgMoney: 4700,
            quezhenDays: 12

          }
        })
      })

    },
    handleEdit (type) {
      if (type === 0) {
        this.editTitle = '标准住院日'
      } else if (type === 1) {
        this.editTitle = '标准费用'

      } else if (type === 2) {
        this.editTitle = '变异系数'

      } else if (type === 3) {
        this.editTitle = '确诊天数'

      }
      this.editShow = true
    },
    changeMain (e) {
      this.mainType = e
      console.log('e', e);
    },
    handleClickMenu (id) {
      this.id = id

      this.addStatus = false
      getTemplateHeader(id).then(res2 => {
        this.template = {
          icon: 'el-icon-aim',
          result: '已审核通过',
          ...res2.cpTemplate,
          ...res2.cpVersion,
          creator: res2.creator,
          reviewer: res2.reviewer,


          createTime: new Date(res2.cpVersion.createTime).format('yyyy-MM-dd'),

          averageMoney: 4400,
          drgMoney: 4700,
          quezhenDays: 12

        }
      })
    }
  },
  mounted () {

    // this.template = {
    //   icon: 'el-icon-aim',
    //   disease: '[M875.006]慢性淋巴细胞白血病',
    //   result: '已审核通过',
    //   index: 3,
    //   createPerson: '王主任',
    //   shenghePerson: '李医生',
    //   time: new Date().format('yyyy-MM-dd'),
    //   averageMoney: 4400,
    //   drgMoney: 4700,
    //   days: 7,
    //   money: 8500,
    //   xishu: 8,
    //   quezhenDays: 12
    // }
    getAllCpTemplate().then(res => {
      console.log('res', res);
      this.patients = res.map(item => {
        return {
          templates: item.cpTemplates,
          deptName: item.deptName
        }
      })
        this.id = this.patients[0].templates[0].id
        getTemplateHeader(this.id).then(res2 => {
            console.log('res2', res2);
            this.template = {
                icon: 'el-icon-aim',
                result: '已审核通过',
                ...res2.cpTemplate,
                ...res2.cpVersion,
                creator: res2.creator,
                reviewer: res2.reviewer,

                createTime: new Date(res2.cpVersion.createTime).format('yyyy-MM-dd'),


                averageMoney: 4400,
                drgMoney: 4700,
                quezhenDays: 12

            }
        })
    })


  },

}
</script>

<style lang="scss" scoped>
.cp-management {
  padding: 10px;
  box-sizing: border-box;
  height: calc(100% - 60px);
  display: flex;
  .left {
    width: 300px;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .button {
      margin-top: 10px;
      width: 100%;
      text-align: center;
    }
  }
  .right {
    margin-left: 10px;
    width: calc(100% - 300px);
    height: 100%;
    .head {
      height: 80px;
      width: 100%;

      .wrapper {
        height: 80px;

        display: flex;
        width: 100%;
        height: 100%;
        font-size: 10px;
        .left {
          width: 70%;

          .first-line,
          .second-line,
          .third-line {
            display: flex;
            margin-bottom: 5px;
            align-items: center;
            span {
              margin-right: 16px;
            }
            .circle {
              height: 12px;
              width: 12px;
              border-radius: 50%;
              background: #51c41b;
              margin-right: 5px;
            }
            i {
              cursor: pointer;
            }
          }
        }
        .right {
          width: 30%;
          padding-left: 5%;
          padding-top: 20px;
        }
      }
    }
    .main {
      .main-center {
      }
    }
  }
  .add-right {
    margin-left: 10px;
    width: calc(100% - 300px);
    max-width: calc(100% - 300px);
    height: 100%;
  }
}
::v-deep .el-card__body {
  padding: 10px !important;
}
::v-deep .el-dialog__header {
  display: none !important;
}
::v-deep .el-menu-item {
  padding-left: 20px !important;
}
::v-deep .bodyPadding .el-dialog__body {
  padding: 0 !important;
}
::v-deep .addHeader .el-dialog__header {
  display: block !important;
}
</style>




