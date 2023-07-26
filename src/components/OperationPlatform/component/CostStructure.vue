<template >
  <div class="container">
    <div class="charts-container">
      <!-- 成本结构 -->
      <chart-template :options="chartOptions_1" title="成本结构" width="45%" />
      <!-- 无基本建设和设备购置非流动负债的公立医院占比 -->
      <chart-template
        :options="chartOptions_2"
        title="无基本建设和设备购置非流动负债的公立医院占比"
        width="45%"
      />
    </div>
  </div>
</template>

<script>
import ChartTemplate from "./ChartTemplate.vue";
export default {
  components: { ChartTemplate },
  name: "CostStructure",
  data() {
    return {
      chartOptions_1: {
        // 饼图的配置选项
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
              formatter: "{b}：{d}%", // 标签内容格式化，包含百分比和对应数据项值
              fontSize: "15",
              position: "outer",
              alignTo: "edge",
              margin: 0,
            },
          },
        ],
      },
      chartOptions_2: {
        // 饼图的配置选项
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
              formatter: "{b}：{d}%", // 标签内容格式化，包含百分比和对应数据项值
              fontSize: "15",
              position: "outer",
              alignTo: "edge",
              margin: 0,
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
  /*height: auto;
  display: flex;
  margin: auto;*/
  overflow-x: hidden; /* 隐藏水平滚动条 */
  touch-action: pan-y; /* 禁用左右滑动操作 */
}
</style>