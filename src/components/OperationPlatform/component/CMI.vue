<template >
  <div class="container">
    <div class="charts-container">
      <chart-template
        :options="chartOptions_1"
        title="医院病例组合指数月度数据(CMI值)"
        width="45%"
      />
      <chart-template
        :options="chartOptions_2"
        title="医院病例组合指数月度变化(CMI值)"
        width="45%"
      />
    </div>
  </div>
</template>

<script>
let cmi = [1.26, 0.96, 1.43, 1.01, 1.33, 1.51, 1.55];
let cmiFormer = 1.11;
let cmiVariation = [];
cmiVariation.push((((cmi[0] - cmiFormer) / cmiFormer) * 100).toFixed(2));
for (let i = 1; i < cmi.length; i++) {
  cmiVariation.push((((cmi[i] - cmi[i - 1]) / cmi[i - 1]) * 100).toFixed(2));
}
import ChartTemplate from "./ChartTemplate.vue";
export default {
  components: { ChartTemplate },
  name: "CMI",
  data() {
    return {
      chartOptions_1: {
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
          axisLine: {
            lineStyle: {
              color: "white", // 横轴线颜色
            },
          },
          axisLabel: {
            color: "white", // 横轴标签颜色
          },
        },
        yAxis: {
          type: "value",
          name: "CMI",
          axisLine: {
            lineStyle: {
              color: "white", // 纵轴线颜色
            },
          },
        },
        series: [
          {
            data: cmi,
            type: "line",
            color: "#00ffff",
          },
        ],
      },
      chartOptions_2: {
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
          axisLine: {
            lineStyle: {
              color: "red", // 横轴线颜色
            },
          },
          axisLabel: {
            color: "white", // 横轴标签颜色
          },
        },
        yAxis: {
          type: "value",
          name: "CMI",
          axisLabel: {
            formatter: "{value}%",
          },
          axisLine: {
            lineStyle: {
              color: "white", // 纵轴线颜色
            },
          },
        },
        series: [
          {
            data: cmiVariation,
            type: "line",
            color: "#00ffff",
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