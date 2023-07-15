<template>
  <div class="charts-container">
    <v-chart
      :options="chartOptions_1"
      style="width: 90%; height: 400px"
    ></v-chart>
    <v-chart
      :options="chartOptions_2"
      style="width: 90%; height: 400px"
    ></v-chart>
  </div>
</template>

<script>
export default {
  name: "IncomeScale",
  data() {
    return {
      chartOptions_1: {
        title: {
          text: "门诊次均费用增幅",
          textStyle: {
            fontWeight: "bold",
            fontSize: "20",
            color: "white",
          },
          left: "center",
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
          name: "增幅 %",
          axisLine: {
            lineStyle: {
              color: "white", // 纵轴线颜色
            },
          },
        },
        series: [
          {
            data: [5, -2, 8, 6, 2, 0, -1],
            type: "line",
            color: "#00ffff",
          },
        ],
      },
      chartOptions_2: {
        title: {
          text: "住院次均费用增幅",
          textStyle: {
            fontWeight: "bold",
            fontSize: "20",
            color: "white",
          },
          left: "center",
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
          name: "增幅 %",
          axisLine: {
            lineStyle: {
              color: "white", // 纵轴线颜色
            },
          },
        },
        series: [
          {
            data: [8, 1, 2, 3, 2, 0, -1],
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
  height: auto;
  display: flex;
  margin: auto;
}
</style>