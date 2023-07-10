<template>
  <div class="order-search">
    <el-autocomplete
      v-model="order"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
      @change="handleChange"
      suffix-icon="el-icon-search"
      size="mini"
    ></el-autocomplete>
  </div>
</template>

<script>
export default {
  data () {
    return {
      order: ""
    }
  },
  methods: {
    querySearchAsync (queryString, cb) {
      console.log('word', queryString)
      this.$emit('search', queryString, cb)

    },
    handleChange (word) {

      this.$emit('search', word)
    }
  }
}
</script>

<style lang="scss" scoped>
.order-search {
  width: 100% !important;
  .el-autocomplete {
    width: 100%;
  }
}
::v-deep .el-input__inner {
  width: 100% !important;
}
</style>
