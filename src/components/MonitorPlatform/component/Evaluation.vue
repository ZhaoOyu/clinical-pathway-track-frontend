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
import {
  getSuperviseFeedback,
  getSuperviseSatisfaction,
  getSuperviseSatisfactionRatio,
} from "../../../api/monitorPlatform";
export default {
  name: "Evaluation",
  components: {
    ChartTemplate,
  },
  data() {
    return {
      pageSize: 5,
      currentPage: 1,
      chartOptions_1: {},
      chartOptions_2: {},
      surveyResults: [],
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
  mounted() {
    getSuperviseFeedback().then((res) => {
      this.surveyResults = res;
    });

    getSuperviseSatisfaction().then((res) => {
      const arr = res;
      const indicator = [];
      const value = [];
      for (let i = 0; i < arr.length; i++) {
        indicator.push({ name: arr[i].item, max: 10 });
        value.push(arr[i].score);
      }
      const charts_2 = {
        resize: true,
        color: "yellow",
        label: {
          show: true,
          formatter: "{c}",
        },
        radar: {
          indicator,
        },
        series: [
          {
            name: "满意度评分",
            type: "radar",
            data: [
              {
                value,
                // name: "满意度评分",
              },
            ],
          },
        ],
      };
      this.chartOptions_2 = charts_2;
    });
    getSuperviseSatisfactionRatio().then((res) => {
      const data1 = [res[0].ratio * 100, res[3].ratio * 100];
      const data2 = [res[1].ratio * 100, res[4].ratio * 100];
      const data3 = [res[2].ratio * 100, res[5].ratio * 100];
      const charts = {
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
            data: data1,
          },
          {
            name: "一般",
            type: "bar",
            data: data2,
          },
          {
            name: "差评",
            type: "bar",
            data: data3,
          },
        ],
      };
      this.chartOptions_1 = charts;
    });
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