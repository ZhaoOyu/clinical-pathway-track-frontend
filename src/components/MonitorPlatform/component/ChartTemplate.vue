<template>
  <div ref="chartContainer" class="chartContainer">
    <div class="title">{{ title }}</div>
    <v-chart style="zindex: 999" ref="chartRef" :options="options"></v-chart>
  </div>
</template>

<script>
export default {
  name: "ChartTemplate",
  props: ["options", "title", "width"],
  mounted() {
    this.$refs.chartContainer.style.width = this.width;
    this.$refs.chartContainer.style.maxWidth = "900px";
    this.adjustChartSize(); // 初始化图表大小
    window.addEventListener("resize", this.adjustChartSize); // 监听窗口大小变化
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.adjustChartSize); // 移除监听事件
  },
  methods: {
    adjustChartSize() {
      const chartContainer = this.$refs.chartContainer;
      const chartRef = this.$refs.chartRef;
      if (chartContainer && chartRef) {
        // 获取div容器的宽度和高度
        const containerWidth = chartContainer.offsetWidth;
        const containerHeight = chartContainer.offsetHeight;

        // 根据容器大小设置图表的宽度和高度
        chartRef.resize({
          width: containerWidth,
          height: containerHeight - 28,
        });
      }
    },
    // renderChart() {
    //   const chartInstance = this.$refs.chartRef.chart;
    //   chartInstance.setOption(this.options);
    // },
  },
};
</script>
<style lang='scss' scoped>
.chartContainer {
  /*padding-bottom: 75%;*/
  background: 100%;
  margin-left: 20px;
  margin-top: 20px;
  display: inline-block;
  background-color: #0e1d38;
  .title {
    font-weight: bold;
    background-color: #091629;
    color: #117fbe;
    font-size: 20px;
  }
}
</style>
