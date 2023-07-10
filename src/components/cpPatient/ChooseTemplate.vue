<template>
  <el-card class="left">
    <el-card class="template">
      <el-input placeholder="请选择模板" suffix-icon="el-icon-search"></el-input>
      <el-menu default-active="0" class="el-menu-vertical-demo">
        <el-menu-item
          v-for="(template,index) in templates"
          :key="template.name"
          :index="`${index}`"
          @click="handleClickTemplate(template)"
        >{{template.name}}</el-menu-item>
      </el-menu>
    </el-card>
    <div class="detail">
      <div class="head">
        <span :style="{fontWeight:'bold'}">模板详细信息</span>
      </div>
      <div class="name" style="marginTop:4px">
        <span class="bold">名称:</span>
        <span>{{templateName}}</span>
      </div>
      <div class="list">
        <div class="title bold" style="marginBottom:4px">医嘱模板信息:</div>
        <div class="wrapper">
          <el-checkbox-group v-model="checkList">
            <el-checkbox
              class="list-item"
              v-for="(item,index) in advices"
              :key="index"
              v-model="item.checked"
              @change="value=>handleChangeItem(value,item,index)"
              :label="item"
            >
              <span>{{item.name}}</span>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="note">
        <div class="title bold">医嘱使用备注: {{note}}</div>
      </div>
    </div>
    <div class="apply">
      <el-button type="primary" @click="useTemplate">使用该模板</el-button>
    </div>
  </el-card>
</template>
 
<script>
import { getAllTemplate, getAdviceTemplate, getAdviceById } from '@/api/my-template.js'
export default {
  data () {
    return {
      templateName: '',
      checkList: [],
      templates: [
        '模板1_脊柱骨折内置固定_体温升高',
        '模板2_脊柱骨折内置固定_高血压',
        '模板3_脊柱骨折内置固定_静脉血栓'
      ],
      advices: [],
      checkAdvices: [],
      note: ""
    }
  },
  methods: {
    handleChangeItem (value, item, index) {
      if (value) {
        this.$store.commit('setMyAdvice', { ...item.adTempDetail, name: item.name })
      } else {
        //!取消某一项
        this.$store.commit('setMyAdvice', null)
      }
    },

    handleClickTemplate (template) {
      this.templateName = template.name
      this.note = template.note
      this.getAdviceTemplate(template.id)
    },
    useTemplate () {
      const advices = this.checkList.map(item => {
        return {
          ...this.$store.state.adviceMap[item.adTempDetail.id],

        }
      })
      console.log('advices', advices);
      this.$store.commit('setMyAdvices', advices)
      this.$store.commit('setTodoOrders')
      this.$emit('judgeVar')
    },
    getAdviceTemplate (id) {
      getAdviceTemplate(id).then(info => {
        console.log('info', info);
        this.advices = info.map(item => {

          return {
            ...item,
            checked: false,
          }
        })
        this.initDetail()
      })
    },
    getAllTemplate () {
      getAllTemplate().then(templates => {
        console.log('templates', templates);
        this.templateName = templates[0].name
        this.note = templates[0].note
        this.templates = templates
        this.getAdviceTemplate(this.templates[0].id)
      })
    },
    initDetail () {
      console.log('this.advices', this.advices);
      this.advices.map(item => {
        getAdviceById(item.adTempDetail.id).then(detail => {
          this.$store.commit('setAdviceMap', { id: item.adTempDetail.id, detail: { ...detail, name: item.name } })
        })
      })
    }
  },
  mounted () {
    this.getAllTemplate()
  }
}
</script>
 
<style lang="scss" scoped>
.left {
  width: 100%;
  height: 100%;
  .template {
    height: 30%;
    .el-menu-item {
      font-size: 12px;
      padding-left: 4px !important;
    }
  }
  .detail {
    margin-top: 10px;
    font-size: 12px;
    height: 48vh;

    .head {
      background: #3981ee;
      display: flex;
      justify-content: center;
      color: white;
      height: 28px;
      align-items: center;
      font-size: 14px;
    }
    .list {
      margin-top: 10px;

      .wrapper {
        height: 35vh;
        overflow-y: auto;
        &::-webkit-scrollbar {
          display: none;
        }

        .list-item {
          height: 24px;
        }
      }
    }
  }
  .apply {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
}
::v-deep .el-checkbox__label {
  font-size: 12px;
}
/* .errorP {
  background: #f29308;
} */
</style>