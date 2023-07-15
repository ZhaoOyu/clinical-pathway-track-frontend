<template>
  <chart-template :options="chartOptions_1" title="满意度" width="45%" />
</template>

<script>
import ChartTemplate from "./ChartTemplate.vue";

export default {
  name: "Evaluation",
  components: {
    ChartTemplate,
  },
  data() {
    return {
      chartOptions_1: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params) {
            var tooltip = params[0].name + "<br/>";
            for (var i = 0; i < params.length; i++) {
              tooltip +=
                params[i].seriesName + ": " + params[i].value + "<br/>";
            }
            return tooltip;
          },
        },
        legend: {
          data: ["满意", "一般", "差评"],
          left: "center",
        },
        grid: {
          top: "10%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["门诊患者满意度", "住院患者满意度"],
          axisLabel: {
            color: "white", // 横轴标签颜色
          },
        },
        yAxis: {
          type: "value",
          name: "占比 %",
          axisLabel: {
            color: "white", // 纵轴轴标签颜色
          },
        },
        series: [
          {
            name: "满意",
            type: "bar",
            data: [60, 86],
          },
          {
            name: "一般",
            type: "bar",
            data: [35, 9],
          },
          {
            name: "差评",
            type: "bar",
            data: [5, 5],
          },
        ],
      },
    };
  },
};
</script>
<style lang='scss' scoped>
.charts-container {
  /*width: 80%;*/
  height: 100%;
  /*margin: auto;*/
  display: flex;
  justify-content: space-between;
}
</style>