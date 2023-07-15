<template>
  <div class="charts-container">
    <v-chart :options="options_1"></v-chart>
    <v-chart :options="options_2"></v-chart>
    <div class="d0"></div>
    <div class="d0"></div>
    <div class="d0"></div>
    <div class="d0"></div>
    <div class="d0"></div>
    <div class="d0"></div>
    <div class="d0"></div>
    <div class="d0"></div>
    <div class="d0"></div>
  </div>
</template>

<script>
export default {
  name: "CostStructure",
  //成本结构
  data() {
    return {
      options_1: {
        // 饼图的配置选项
        title: {
          text: "成本结构", // 标题文本
          textStyle: {
            fontSize: 20, // 标题字体大小
            fontWeight: "bold", // 标题字体粗细
            color: "#ffffff",
          },
          left: "center", // 标题水平居中对齐
          top: 20, // 标题距离容器顶部的距离
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            title: "c",
            center: ["50%", "50%"],
            data: [
              { name: "人员费用", value: 50 },
              { name: "管理费用", value: 10 },
              { name: "其他费用", value: 40 },
            ],
            animationDuration: 2000,
            label: {
              // 标签配置
              position: "outer", // 标签位置设为外部
              alignTo: "labelLine", // 标签对齐线
              formatter: "{b}：{d}%", // 标签内容格式化，包含百分比和对应数据项值
              fontSize: "15",
            },
          },
        ],
      },
      options_2: {
        // 饼图的配置选项
        title: {
          text: "无基本建设和设备购置非流动负债的公立医院占比", // 标题文本
          textStyle: {
            fontSize: 20, // 标题字体大小
            fontWeight: "bold", // 标题字体粗细
            color: "#ffffff",
          },
          left: "center", // 标题水平居中对齐
          top: 20, // 标题距离容器顶部的距离
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            title: "c",
            center: ["50%", "50%"],
            data: [
              { name: "符合条件医院", value: 50 },
              { name: "其他医院", value: 10 },
            ],
            animationDuration: 2000,
            label: {
              // 标签配置
              position: "outer", // 标签位置设为外部
              alignTo: "labelLine", // 标签对齐线
              formatter: "{b}：{d}%", // 标签内容格式化，包含百分比和对应数据项值
              fontSize: "15",
            },
          },
        ],
      },
    };
  },
};
</script>
<style lang='scss' scoped>
.charts-container {
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.d0 {
  background-color: pink;
  height: 200px;
  width: 100px;
}
</style>