<template >
  <div class="container">
    <div class="charts-container">
      <!-- 门诊次均费用增幅 -->
      <chart-template
        :options="chartOptions_1"
        title="门诊次均费用增幅"
        width="45%"
      />
      <!-- 住院次均费用增幅 -->
      <chart-template
        :options="chartOptions_2"
        title="住院次均费用增幅"
        width="45%"
      />
      <!-- 医疗服务收入占比 -->
      <chart-template
        :options="chartOptions_3"
        title="医疗服务收入占比"
        width="45%"
      />
      <!-- 按病种付费比例 -->
      <chart-template
        :options="chartOptions_4"
        title="按病种付费比例"
        width="45%"
      />
      <!-- 成本结构 -->
      <chart-template :options="chartOptions_5" title="成本结构" width="45%" />
      <!-- 无基本建设和设备购置非流动负债的公立医院占比 -->
      <chart-template
        :options="chartOptions_6"
        title="无基本建设和设备购置非流动负债的公立医院占比"
        width="45%"
      />
      <!-- 门诊人次数与出院人次数比 -->
      <chart-template
        :options="chartOptions_7"
        title="门诊人次数与出院人次数比"
        width="45%"
      />
      <!-- 三级环形图 -->
      <chart-template
        :options="chartOptions_8"
        title="三级环形图"
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
      chartOptions_3: {
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
      chartOptions_4: {
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
      chartOptions_5: {
        // 饼图的配置选项
        series: [
          {
            type: "pie",
            radius: "50%",
            title: "c",
            center: ["50%", "50%"],
            data: [
              { name: "人员费用", value: 50 },
              { name: "管理费用", value: 10 },
              { name: "其他费用", value: 40 },
            ],
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
      chartOptions_6: {
        // 饼图的配置选项
        series: [
          {
            type: "pie",
            radius: "50%",
            title: "c",
            center: ["50%", "50%"],
            data: [
              { name: "符合条件医院", value: 50 },
              { name: "其他医院", value: 10 },
            ],
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
      chartOptions_7: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["门诊人次数", "出院人次数"],
          top: 0,
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
      chartOptions_8: {
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
            center: ["50%", "50%"],
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
            center: ["50%", "50%"],
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
            center: ["50%", "50%"],
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