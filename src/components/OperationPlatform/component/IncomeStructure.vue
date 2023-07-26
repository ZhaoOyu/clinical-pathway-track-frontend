<template >
  <div class="container">
    <div class="charts-container">
      <!-- 医疗服务收入占比 -->
      <chart-template
        :options="chartOptions_1"
        title="医疗服务收入占比"
        width="45%"
      />
      <!-- 按病种付费比例 -->
      <chart-template
        :options="chartOptions_2"
        title="按病种付费比例"
        width="45%"
      />
    </div>
  </div>
</template>

<script>
import ChartTemplate from "./ChartTemplate.vue";
export default {
  components: { ChartTemplate },
  name: "Efficiency",
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
              { name: "医疗服务收入", value: 30 },
              { name: "其他收入", value: 70 },
            ],
            itemStyle: {
              normal: {
                color: function (params) {
                  const colorList = ["#c23531", "#1E90FF"];
                  return colorList[params.dataIndex];
                },
              },
            },
            animationDuration: 1000,
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
              { name: "按病种付费", value: 60 },
              { name: "其他付费方式", value: 30 },
            ],
            itemStyle: {
              normal: {
                color: function (params) {
                  const colorList = ["#c23531", "#1E90FF"];
                  return colorList[params.dataIndex];
                },
              },
            },
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