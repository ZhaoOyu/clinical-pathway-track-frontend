<template>
  <div class="order-template">
    <el-card class="left">
      <el-card class="template">
        <el-input placeholder="请输入模板名称" suffix-icon="el-icon-search"></el-input>
        <el-menu default-active="activeIndex" class="el-menu-vertical-demo">
          <el-menu-item
            v-for="(item,index) in templates"
            :key="item.name"
            :index="`${index}`"
            @click="chooseTemplate(item)"
          >
            <div class="inner">
              <span>{{item.name}}</span>
              <i class="el-icon-circle-close" style="color:red" @click="deleteTemplate(item.id)"></i>
            </div>
          </el-menu-item>
        </el-menu>
      </el-card>
      <div class="btn">
        <el-button type="primary" @click="changeStatus">新增模板</el-button>
      </div>
    </el-card>
    <div class="right">
      <div class="form">
        <el-form class="demo-form-inline" size="mini">
          <el-form-item label="医嘱名字:">
            <el-input placeholder="名称" v-model="templateForm.name" v-if="addStatus"></el-input>
            <span v-else>{{templateForm.name}}</span>
          </el-form-item>
          <el-form-item label="备注说明:">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="变异说明"
              v-model="templateForm.info"
              v-if="addStatus"
            ></el-input>
            <span v-else>{{templateForm.info}}</span>
          </el-form-item>
        </el-form>
      </div>
      <div class="add-btn">
        <el-button type="success" size="mini" @click="addOrder">添加医嘱</el-button>
      </div>
      <div class="list">
        <el-table :data="orderInfos" border style="width: 100%" size="mini">
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column prop="name" label="名称" width="240"></el-table-column>
          <el-table-column prop="content" label="内容"></el-table-column>

          <el-table-column prop="entrust" label="说明" width="240"></el-table-column>
          <el-table-column prop="timeType" label="期效">
            <template slot-scope="scope">
              <span>{{scope.row.timeType===0?"长期医嘱":"临时医嘱"}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="execFreq" label="频率"></el-table-column>

          <el-table-column prop="everyUse" label="单量"></el-table-column>
          <el-table-column prop="totalUse" label="总量"></el-table-column>
          <el-table-column prop="checkMethod" label="用法" width="160"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="inner">
                <span class="blue" @click="edit(scope)">编辑</span>
                <span class="red" @click="deleteItem(scope)">删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="add">
        <el-button type="primary" @click="addTemplate" v-if="addStatus">添加该模板</el-button>
      </div>
    </div>
    <el-dialog :visible.sync="showDia" width="80%">
      <addorder-template
        @addItem="handleAdditem"
        @updateItem="handleUpdateItem"
        :addNoUpdate="addNoUpdate"
        :addStatus="addStatus"
        ref="addOrder"
      ></addorder-template>
    </el-dialog>
  </div>
</template>
 
<script>
import AddorderTemplate from '../orderManagement/AddorderTemplate.vue'
import { getAllTemplate, getAdviceTemplate, updateAdvice, addAdviceTemplate, addAdvice, deleteAdviceTemplate, deleteAdvice } from '@/api/my-template.js'
export default {
  components: {
    AddorderTemplate,
  },


  data () {
    return {
      adTempId: 1,
      addNoUpdate: true,
      showDia: false,
      activeIndex: 0,
      addStatus: false,
      templateForm: {
        name: "",
        info: ""
      },
      templates: [
        // '模板1_脊柱骨折内置固定_体温升高',
        // '模板2_脊柱骨折内置固定_高血压',
        // '模板3_脊柱骨折内置固定_静脉血栓'
      ],
      orderInfos: [

      ]
    }
  },

  async mounted () {

    this.getTemplate()

  },
  methods: {
    deleteTemplate (tempId) {
      deleteAdviceTemplate({ id: tempId }).then(res => {
        this.sMessage('删除模板成功')
        this.getTemplate()
      })
    },
    afterClose () {
      if (!this.addStatus) {
        //!修改整个模块
        const template = this.templates.filter(item => {
          return item.id === this.adTempId
        })[0]

        this.getTemplate(template)
      } else {
        //!新家整个模块
        const orders = this.$store.state.orders
        console.log('neworders', orders);
        this.orderInfos = orders
      }
    },
    handleUpdateItem (data) {
      const adTempId = this.adTempId || 1
      const rowId = this.rowId
      data['adTempId'] = adTempId
      data['id'] = rowId
      updateAdvice(data).then(res => {
        this.sMessage('更新医嘱成功')

        this.showDia = false
        this.afterClose()


      })
    },
    handleAdditem (data, order) {
      if (!this.addStatus) { //是否是新增模板
        const adTempId = this.adTempId || 1

        data['adTempId'] = adTempId

        addAdvice(data).then(res => {
          this.sMessage('新增医嘱成功')
        })
      } else {
        this.$store.commit('addOrders', { ...order, ...data })
      }
      this.showDia = false
      this.afterClose()
    },
    changeStatus () {
      this.addStatus = true
      this.templateForm.name = ""
      this.templateForm.info = ""
      this.orderInfos = []
    },
    getTemplate (template) {
      this.addStatus = false
      getAllTemplate().then(res => {
        this.templates = res
        if (!this.addStatus) {
          if (template) this.chooseTemplate(template)
          else this.chooseTemplate(res[0])
        }

      })
    },

    edit (scope) {
      console.log('scope', scope);
      this.addNoUpdate = false
      this.showDia = true
      this.rowId = scope.row.id
      this.$store.commit('chooseTreatmentId', scope.row.treatmentId)
      this.$store.commit('chooseTreatmentName', scope.row.name)
      this.$store.commit('chooseRowId', scope.row.id)
      this.$refs.addOrder && (this.$refs.addOrder.refresh())


    },
    deleteItem (scope) {
      deleteAdvice({ id: scope.row.id }).then(res => {
        this.sMessage(`删除医嘱${scope.row.name}成功`)
        this.getTemplate()
      })
    },
    addOrder () {
      this.addNoUpdate = true

      this.showDia = true
      this.$refs.addOrder.refresh()
      this.$store.commit('chooseTemplateId', this.adTempId)
    },
    addTemplate () {
      const orders = this.$store.state.orders
      let data = {
        name: this.templateForm.name,
        note: this.templateForm.info,
        adTmpDetailVOS: orders.map(item => {
          return {
            name: item.name,
            adTempDetail: item
          }
        })
      }
      addAdviceTemplate(data).then(res => {
        this.getTemplate()
      })
    },
    chooseTemplate (template) {
      this.addStatus = false
      const id = template.id
      this.adTempId = template.id
      this.templateForm.name = template.name
      this.templateForm.info = template.note
      getAdviceTemplate(id).then(res => {
        console.log('res', res);
        if (!this.addStatus) {
          this.orderInfos = res.map(item => {
            return {
              name: item.name,
              ...item.adTempDetail
            }
          })
          console.log('info', this.orderInfos);
        }

      })
    }
  }
}
</script>
 
<style lang="scss" scoped>
.order-template {
  width: 100%;
  display: flex;
  height: calc(100% - 80px);

  .left {
    width: 320px;
    height: 100%;
    .btn {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 40px;
    }
  }
  .right {
    margin-left: 4px;
    margin-top: 40px;
    padding: 10px;
    box-sizing: border-box;
    flex: 1;
    .add-btn {
      margin-top: 10px;
      float: right;
      margin-top: 5px;
    }
    .inner {
      display: flex;
      justify-content: space-around;
      span {
        cursor: pointer;
      }
    }
  }
  .add {
    width: 100%;
    text-align: right;
    margin-top: 10px;
  }
}
.inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
::v-deep .el-card__body {
  padding: 10px !important;
}
::v-deep .el-input__inner {
  width: 400px;
}
::v-deep .el-textarea__inner {
  width: 400px;
}
::v-deep .el-form-item {
  margin-bottom: 10px !important;
  display: flex;
  align-items: center;
}
::v-deep .el-dialog__header {
  display: none !important;
}
::v-deep .el-menu-item {
  padding-right: 0px !important;
}
</style>