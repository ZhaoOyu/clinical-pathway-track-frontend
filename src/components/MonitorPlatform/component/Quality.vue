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
import { getSuperviseMedicalQuality } from "../../../api/monitorPlatform";
import ChartTemplate from "./ChartTemplate.vue";

export default {
  name: "Quality",
  components: {
    ChartTemplate,
  },
  data() {
    return {
      chartOptions_1: {},
    };
  },
  mounted() {
    getSuperviseMedicalQuality().then((res) => {
      const arr = res;
      const indicator = [];
      const value = [];
      for (let i = 0; i < arr.length; i++) {
        indicator.push({ name: arr[i].item, max: 10 });
        value.push(arr[i].score);
      }
      const charts = {
        label: {
          show: true,
          formatter: "{c}",
        },
        radar: {
          indicator: indicator,
        },
        series: [
          {
            type: "radar",
            data: [
              {
                value: value,
              },
            ],
          },
        ],
      };
      this.chartOptions_1 = charts;
    });
  },
};
</script>
<style lang='scss' scoped>
</style>