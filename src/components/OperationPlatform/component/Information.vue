<template >
  <div class="container">
    <div class="charts-container">
      <!-- 门诊人次数与出院人次数比 -->
      <chart-template
        :options="chartOptions_1"
        title="门诊人次数与出院人次数比"
        width="45%"
      />
      <!-- 三级环形图 -->
      <chart-template :options="chartOptions_2" title="统计数据" width="45%" />
    </div>
  </div>
</template>

<script>
import ChartTemplate from "./ChartTemplate.vue";
export default {
  components: { ChartTemplate },
  name: "Information",
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
            color: ["#3a77e6", "#FF4500"],
            data: [
              { name: "门诊人次数", value: 2000 },
              { name: "住院人次数", value: 100 },
            ],
            animationDuration: 2000,
            label: {
              // 标签配置
              formatter: "{b}：{c} ({d}%)", // 标签内容格式化，包含百分比和对应数据项值
              fontSize: "15",
              position: "outer",
              alignTo: "edge",
              margin: 0,
            },
          },
        ],
      },
      chartOptions_2: {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
        },
        series: [
          {
            name: "一级分类",
            type: "pie",
            selectedMode: "single",
            radius: [0, "20%"],
            center: ["50%", "50%"],
            label: {
              // formatter: "{b}:{c} ({d}%)",
              position: "inner",
            },
            data: [
              { value: 335, name: "住院量" },
              { value: 679, name: "其他" },
            ],
          },
          {
            name: "二级分类",
            type: "pie",
            radius: ["30%", "45%"],
            center: ["50%", "50%"],
            label: {
              // formatter: "{b}:{c} ({d}%)",
              position: "inside",
            },
            data: [
              { value: 335, name: "基层医疗卫生\n机构诊疗量" },
              { value: 310, name: "其他" },
            ],
          },
          {
            name: "三级分类",
            type: "pie",
            radius: ["55%", "70%"],
            center: ["50%", "50%"],
            label: {
              // formatter: "{b}:{c} ({d}%)",
              position: "inside",
            },
            data: [
              { value: 335, name: "出院患者\n四级手术比例" },
              { value: 135, name: "其他" },
            ],
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