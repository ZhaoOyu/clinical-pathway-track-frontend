<template>
  <div class="charts-container">
    <div class="box" v-for="(item, index) in itemList" :key="index">
      <div :class="item.iconName" class="icon" size="50px"></div>
      <div class="title">{{ item.title }}</div>
      <div class="Etitle">{{ item.Etitle }}</div>
      <div class="score">{{ item.score }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      itemList: [
        {
          title: "医疗质量",
          Etitle: "Medical Quality Score",
          score: 9.3,
          iconName: "el-icon-first-aid-kit",
        },
        {
          title: "运营效率",
          Etitle: "Efficiency of Operation",
          score: 7.8,
          iconName: "el-icon-data-analysis",
        },
        {
          title: "综合满意度",
          Etitle: "Satisfaction Score",
          score: 8.3,
          iconName: "el-icon-edit-outline",
        },
      ],
    };
  },
};
</script>
<style lang='scss' scoped>
.charts-container {
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: space-around;
}
.box {
  color: white;

  .title {
    padding-left: 70px;
    font-size: 30px;
    font-weight: bold;
  }
  .Etitle {
    padding-left: 70px;
    font-size: 15px;
  }

  .score {
    padding-left: 70px;
    font-size: 40px;
    font-weight: 900;
    color: aqua;
  }
  .icon {
    padding-top: 30px;
    float: left;
    opacity: 0.5;
    font-size: 50px;
    color: aqua;
  }
}
</style>