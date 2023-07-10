<template>
  <div class="add-new">
    <el-card class="head">
      <div class="wrapper">
        <div class="left">
          <div class="first">
            <el-form :inline="true">
              <el-form-item label="对应病种">
                <el-select v-model="template.applyDiagnosisId" size="mini">
                  <el-option
                    v-for="item in dias"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="标准费用">
                <el-input v-model="template.standardPrice" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="平均模板费用">
                <el-input v-model="template.averageMoney" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="对应科室">
                <el-select v-model="template.deptId" size="mini">
                  <el-option
                    v-for="item in departments"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="second">
            <el-form :inline="true">
              <el-form-item label="标准住院日">
                <el-input-number v-model="template.standardDay" :min="1" :max="50" size="mini"></el-input-number>
              </el-form-item>
              <el-form-item label="变异系数">
                <el-input-number v-model="template.variationNum" :min="0" :max="10" size="mini"></el-input-number>
              </el-form-item>
              <el-form-item label="确诊天数">
                <el-input-number v-model="template.quezhenDays" :min="0" :max="10" size="mini"></el-input-number>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="right">
          <el-button type="primary" @click="submit">提交</el-button>
        </div>
      </div>
    </el-card>
    <cp-template :id="id"></cp-template>
  </div>
</template>
 
<script>
import CpTemplate from './CpTemplate.vue'
import { addCpTempBasicInfo, getAllDia } from '@/api/cp-template.js'
import { getAllDept } from '@/api/my-template.js'
export default {
  components: { CpTemplate },
  data () {
    return {
      id: 0,
      template: {

        applyDiagnosisId: 1,
        deptId: 1,
        standardPrice: "",
        averageMoney: "",
        drgMoney: "",
        deptName: "",
        standardDay: 12,
        variationNum: 4,
        quezhenDays: 8
      },
      dias: [],
      departments: []
    }
  },
  computed: {

  },
  methods: {
    submit () {
      let { code, name } = this.dias.filter(item => item.id === this.template.applyDiagnosisId)[0]

      let data = {
        cpTemplate: {
          ...this.template,
          name: `[${code}]${name}`
        },
        cpVersion: {
          ...this.template
        },
        creator: "王医生",
        reviewer: "王医生"
      }
      addCpTempBasicInfo(data).then(res => {
        this.id = res.id
        console.log('add', res);
        this.sMessage('新增模板成功')
        this.$emit('refresh')
      })
    }
  },
  mounted () {
    getAllDia().then(dias => {
      console.log('dias', dias);
      this.dias = dias
    })
    getAllDept().then(res => {
      this.departments = res
    })
  }
}
</script>
 
<style lang="scss" scoped>
.add-new {
  width: 100%;
  height: 100%;
  .head {
    height: 95px;
    .wrapper {
      height: 95px;

      display: flex;
      width: 100%;
      height: 100%;
      font-size: 10px;
      .left {
        width: 100%;
        .first,
        .second {
          height: 30px;
        }
        .first {
        }
        .second {
          margin-top: 10px;
        }
        .el-form-item {
          margin-left: 20px;
        }
      }
      .right {
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
::v-deep .el-form-item__label {
  font-size: 10px !important;
  /* font-weight: bold; */
}
::v-deep .el-input__inner {
  width: 120px !important;
}
</style>