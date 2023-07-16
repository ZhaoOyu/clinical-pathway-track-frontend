<template>
  <div>
    <chart-template :options="chartOptions_1" title="满意度" width="45%" />
    <chart-template
      :options="chartOptions_2"
      title="满意度雷达图"
      width="45%"
    />
  </div>
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
      chartOptions_2: {
        resize: true,
        color: "yellow",
        label: {
          show: true,
          formatter: "{c}",
        },
        radar: {
          indicator: [
            { name: "医疗服务", max: 10 },
            { name: "就诊体验", max: 10 },
            { name: "护理服务", max: 10 },
            { name: "院内设施", max: 10 },
            { name: "病友关系", max: 10 },
            { name: "医疗费用", max: 10 },
            { name: "医疗信息", max: 10 },
          ],
        },
        series: [
          {
            name: "满意度评分",
            type: "radar",
            data: [
              {
                value: [8.5, 9.0, 8.0, 7.0, 7.5, 8.5, 9.5],
                // name: "满意度评分",
              },
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
  /*width: 80%;*/
  height: 100%;
  /*margin: auto;*/
  display: flex;
  justify-content: space-between;
}
div {
  overflow-x: hidden; /* 隐藏水平滚动条 */
  touch-action: pan-y; /* 禁用左右滑动操作 */
}
</style>