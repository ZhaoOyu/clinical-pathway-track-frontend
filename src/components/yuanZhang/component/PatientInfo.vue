<template>
  <div class="charts-container">
    <v-chart ref="chart" :options="options_1" style="height: 200px"></v-chart>
    <v-chart ref="chart" :options="options_2"></v-chart>
    <v-chart ref="chart" :options="options_3"></v-chart>
  </div>
</template>

<script>
export default {
  name: "PatientInfo",
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.$refs.chart.resize(); // 调用图表实例的resize方法重新渲染图表
    },
  },
  data() {
    return {
      options_1: {
        title: {
          text: "门诊人次数与出院人次数比",
          textStyle: {
            fontSize: 16,
            fontWeight: "bold",
            color: "white",
          },
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["门诊人次数", "出院人次数"],
          bottom: 0,
        },
        grid: {
          top: "10%",
          left: "3%",
          right: "4%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          axisLabel: {
            color: "white",
            formatter: "{value}%", // 刻度标签格式化
          },
        },
        yAxis: {
          type: "category",
          data: [""],
          axisLabel: {
            color: "#333", // 字体颜色
          },
        },
        series: [
          {
            name: "门诊人次数",
            type: "bar",
            data: [2000],
            emphasis: {
              focus: "series",
            },
          },
          {
            name: "出院人次数",
            type: "bar",
            data: [100],
            emphasis: {
              focus: "series",
            },
          },
        ],
      },
      options_2: {
        title: {
          //   text: "三级环形图",
          textStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
          left: "center",
        },
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
            center: ["42%", "50%"],
            label: {
              position: "inner",
            },
            label: {
              formatter: "{b}:{c} ({d}%)",
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
            center: ["42%", "50%"],
            label: {
              formatter: "{b}:{c} ({d}%)",
              position: "inside",
            },
            data: [
              { value: 335, name: "基层医疗卫生机构诊疗量" },
              { value: 310, name: "其他" },
            ],
          },
          {
            name: "三级分类",
            type: "pie",
            radius: ["55%", "70%"],
            center: ["42%", "50%"],
            label: {
              formatter: "{b}:{c} ({d}%)",
              position: "inside",
            },
            data: [
              { value: 335, name: "出院患者四级手术比例" },
              { value: 135, name: "其他" },
            ],
          },
        ],
      },
      options_3: {
        title: {
          text: "患者满意度",
          textStyle: {
            fontSize: 16,
            fontWeight: "bold",
            color: "white",
          },
          left: "center",
          top: "20",
        },
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
          right: "0",
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