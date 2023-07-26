<template>
  <div class="charts-container">
    <chart-template
      :options="chartOptions_1"
      title="医疗质量雷达图"
      width="100%"
    />
  </div>
</template>

<script>
import ChartTemplate from "./ChartTemplate.vue";

export default {
  name: "Quality",
  components: {
    ChartTemplate,
  },
  data() {
    return {
      chartOptions_1: {
        label: {
          show: true,
          formatter: "{c}",
        },
        radar: {
          indicator: [
            { name: "治疗成果", max: 10 },
            { name: "医疗技术", max: 10 },
            { name: "医护人员素质", max: 10 },
            { name: "诊断准确性", max: 10 },
            { name: "医疗安全", max: 10 },
            { name: "住院环境", max: 10 },
            { name: "医患沟通", max: 10 },
            { name: "医疗费用", max: 10 },
          ],
        },
        series: [
          {
            type: "radar",
            data: [
              {
                value: [8.5, 9.0, 8.0, 7.5, 8.5, 7.5, 8.0, 7.0],
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
</style>