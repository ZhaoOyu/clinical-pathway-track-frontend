<template>
  <div class="add-order">
    <div slot="header" class="head">
      <span class="title">新增医嘱</span>
    </div>
    <div class="wrapper">
      <div class="left">
        <choose-template></choose-template>
      </div>
      <div class="right">
        <order-detail from="orderInfo"></order-detail>
      </div>
    </div>
  </div>
</template>
 
<script>
import ChooseTemplate from './ChooseTemplate.vue'
import OrderDetail from './OrderDetail.vue'
export default {
  components: { ChooseTemplate, OrderDetail },
  data () {

    return {
    }
  }
}
</script>
 
<style lang="scss" scoped>
.add-order {
  width: 100%;

  .head {
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    background: #3981ee;
    height: 30px;
    color: white;
  }
  .wrapper {
    display: flex;
    .left {
      width: 240px;
      height: 100%;
      margin-right: 10px;
    }
    .right {
      width: calc(100% - 240px);
    }
  }
}
</style>