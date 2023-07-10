<template>
  <div class="evaluate">
    <div class="header">评估</div>
    <div class="main">
      <el-form>
        <el-form-item label="时间进度:">
          <el-radio v-model="schedule" :label="0">正常进入下一天</el-radio>
          <el-radio v-model="schedule" :label="1">下一阶段提前至今天</el-radio>
          <el-radio v-model="schedule" :label="2">下一阶段提前至明天</el-radio>
          <el-radio v-model="schedule" :label="-1">下一天的阶段延后</el-radio>
        </el-form-item>
        <el-form-item label="总体结果:">
          <el-radio v-model="result" :label="1">正常</el-radio>
          <el-radio v-model="result" :label="-1">变异后继续</el-radio>
          <el-radio v-model="result" :label="-2">变异后退出</el-radio>
          <el-radio v-model="result" :label="2">提前完成</el-radio>
        </el-form-item>
        <el-form-item label="评估说明:">
          <el-input v-model="description"></el-input>
        </el-form-item>
        <el-form-item label="变异原因:">
          <el-input v-model="variationReason"></el-input>
        </el-form-item>
        <el-form-item label="变异说明:">
          <el-input v-model="variationDesc"></el-input>
        </el-form-item>
        <el-form-item label="评估人:">
          <el-select v-model="evaluatePerson">
            <el-option label="王医生" value="1"></el-option>
            <el-option label="赵医生" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirm">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      schedule: 0,
      result: 1,
      evaluatePerson: '王医生',
      variationDesc: "其他",
      description: "",
      variationReason: "并发症",
      description: ""
    }
  },
  methods: {
    confirm () {
      this.$emit('confirm', {
        result: this.result,
        evaluatePerson: this.evaluatePerson,
        variationDesc: this.variationDesc,
        description: this.description,
        variationReason: this.variationReason,
        schedule: this.schedule,
        evaluatePerson: this.evaluatePerson

      })
    }
  }
}
</script>
 
<style lang="scss" scoped>
.evaluate {
  width: 100%;
  height: 100%;
  .header {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 18px;
    background: #3981ee;
  }
  .main {
    margin-top: 20px;
    width: 99%;
    margin-left: 1%;
  }
}

::v-deep .el-form-item {
  display: flex;
  align-items: center;
}
::v-deep .el-form-item__label {
  width: 80px;
}
</style>