<template>
  <div class="charts-container"></div>
</template>

<script>
export default {
  name: "Quality",
  data() {
    return {
      options_1: {
        // 饼图的配置选项
        title: {
          text: "医疗服务收入占比", // 标题文本
          textStyle: {
            fontSize: 20, // 标题字体大小
            fontWeight: "bold", // 标题字体粗细
            color: "#ffffff",
          },
          left: "center", // 标题水平居中对齐
          top: 20, // 标题距离容器顶部的距离
        },
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
            animationDuration: 2000,
            label: {
              // 标签配置
              position: "outer", // 标签位置设为外部
              alignTo: "labelLine", // 标签对齐线
              formatter: "{b}：{d}%", // 标签内容格式化，包含百分比和对应数据项值
              fontSize: "15",
            },
          },
        ],
      },
      options_2: {
        // 饼图的配置选项
        title: {
          text: "按病种付费比例", // 标题文本
          textStyle: {
            fontSize: 20, // 标题字体大小
            fontWeight: "bold", // 标题字体粗细
            color: "#ffffff",
          },
          left: "center", // 标题水平居中对齐
          top: 20, // 标题距离容器顶部的距离
        },
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
              position: "outer", // 标签位置设为外部
              alignTo: "labelLine", // 标签对齐线
              formatter: "{b}：{d}%", // 标签内容格式化，包含百分比和对应数据项值
              fontSize: "15",
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
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: space-around;
}
</style>