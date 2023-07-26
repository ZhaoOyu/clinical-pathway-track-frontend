<template>
  <div>
    <chart-template :options="chartOptions_1" title="满意度" width="45%" />
    <chart-template
      :options="chartOptions_2"
      title="满意度雷达图"
      width="50%"
    />
    <h2 class="list-title">患者满意度调查结果</h2>
    <el-table :data="currentPageData" border style="width: 100%">
      <el-table-column prop="name" label="患者姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="gender" label="性别"></el-table-column>
      <el-table-column prop="satisfaction" label="满意度评分"></el-table-column>
      <el-table-column prop="feedback" label="意见反馈"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10]"
      :page-size="pageSize"
      :total="surveyResults.length"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
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
      pageSize: 5,
      currentPage: 1,
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
      surveyResults: [
        {
          name: "张三",
          age: 30,
          gender: "男",
          satisfaction: 8,
          feedback: "医生态度很好，诊断准确，非常满意！",
        },
        {
          name: "李四",
          age: 25,
          gender: "女",
          satisfaction: 6,
          feedback: "等待时间稍长，但医护人员服务还不错。",
        },
        {
          name: "王五",
          age: 40,
          gender: "男",
          satisfaction: 10,
          feedback: "非常满意，治疗效果很好，感谢医生和护士们。",
        },
        {
          name: "张三",
          age: 30,
          gender: "男",
          satisfaction: 8,
          feedback: "医生态度很好，诊断准确，非常满意！",
        },
        {
          name: "李四",
          age: 25,
          gender: "女",
          satisfaction: 6,
          feedback: "等待时间稍长，但医护人员服务还不错。",
        },
        {
          name: "王五",
          age: 40,
          gender: "男",
          satisfaction: 10,
          feedback: "非常满意，治疗效果很好，感谢医生和护士们。",
        },
        {
          name: "张三",
          age: 30,
          gender: "男",
          satisfaction: 8,
          feedback: "医生态度很好，诊断准确，非常满意！",
        },
        {
          name: "李四",
          age: 25,
          gender: "女",
          satisfaction: 6,
          feedback: "等待时间稍长，但医护人员服务还不错。",
        },
        {
          name: "王五",
          age: 40,
          gender: "男",
          satisfaction: 10,
          feedback: "非常满意，治疗效果很好，感谢医生和护士们。",
        },
      ],
    };
  },
  computed: {
    // 根据当前页码和每页显示的记录数进行分页
    currentPageData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.surveyResults.slice(startIndex, endIndex);
    },
  },
  methods: {
    // 处理每页显示记录数改变事件
    handleSizeChange(newSize) {
      this.pageSize = newSize;
    },
    // 处理页码改变事件
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
    },
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

.list-title {
  color: #00ffff;
}
</style>