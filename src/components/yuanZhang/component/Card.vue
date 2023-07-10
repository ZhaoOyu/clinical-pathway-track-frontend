<template>
  <el-card shadow="never">
    <div class="wrapper">
      <div class="icon">
        <i :class="['iconfont',iconClass]"></i>
      </div>

      <div class="info">
        <div class="word">{{word}}</div>
        <div class="desc">{{desc}}</div>
        <div class="number">{{number}}</div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: ['iconClass', 'number', 'word', 'desc' ],

  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {

  background: #081326;
  width: 100%;
  .wrapper {
    display: flex;
    align-items: center;
    font-size: 14px;
    .iconfont {
      color: #339c9c;
      font-size: 36px;
    }
    .icon{
      width: 20%;
    }
    .info {
      margin-left: 5px;
      color: white;
      .word{
        font-size: 15px;
        font-weight: bold;
        margin-top: 4%;
      }
      .desc{
        font-size: 10px;
        font-weight: lighter;
        margin-top: 4%;
      }
      .number{
        font-size: 30px;
        font-weight: bold;
        margin-top: 4%;
      }
    }
  }
}
</style>
