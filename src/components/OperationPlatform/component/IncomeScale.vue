<template >
  <div class="container">
    <div class="charts-container">
      <!-- 门诊次均费用增幅 -->
      <chart-template
        :options="chartOptions_1"
        title="门诊/住院次均费用增幅"
        width="45%"
      />
      <!-- 医院人员薪酬中稳定收入占比 -->
      <chart-template
        :options="chartOptions_2"
        title="医院人员薪酬中稳定收入占比"
        width="45%"
      />
    </div>
  </div>
</template>

<script>
import ChartTemplate from "./ChartTemplate.vue";
export default {
  components: { ChartTemplate },
  name: "IncomeScale",
  data() {
    return {
      chartOptions_1: {
        tooltip: {
          trigger: "axis",
        },
        color: ["orange", "green"],
        legend: {
          data: ["门诊次均费用增幅", "住院次均费用增幅"],
          top: "5%",
          textStyle: {
            color: ["white", "white"],
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
          axisLabel: {
            textStyle: {
              color: "white",
            },
          },
          axisLine: {
            lineStyle: {
              color: "red",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}%",
            textStyle: {
              color: "white",
            },
          },
          axisLine: {
            lineStyle: {
              color: "white", // 纵轴线颜色
            },
          },
        },
        series: [
          {
            name: "门诊次均费用增幅",
            type: "line",
            stack: "Total",
            data: [5, -2, 8, 6, 2, 0, -1],
          },
          {
            name: "住院次均费用增幅",
            type: "line",
            stack: "Total",
            data: [8, 1, 2, 3, 2, 0, -1],
          },
        ],
      },
      chartOptions_2: {
        // 饼图的配置选项
        color: ["#6699FF", "#6666CC"],
        series: [
          {
            type: "pie",
            radius: "50%",
            title: "c",
            center: ["50%", "50%"],
            data: [
              { name: "稳定收入", value: 3000 },
              { name: "福利津贴", value: 1000 },
            ],
            animationDuration: 2000,
            label: {
              // 标签配置
              formatter: "{b}：{d}%", // 标签内容格式化，包含百分比和对应数据项值
              fontSize: "18",
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