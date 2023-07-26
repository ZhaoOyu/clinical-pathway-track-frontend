<template>
  <div>
    <div class="charts-container">
      <div class="box" v-for="(item, index) in itemList" :key="index">
        <div :class="item.iconName" class="icon" size="50px"></div>
        <div class="title">{{ item.title }}</div>
        <div class="Etitle">{{ item.Etitle }}</div>
        <div class="score">{{ item.score }}</div>
      </div>
    </div>
    <el-row>
      <el-col :span="11">
        <!-- <div class="indicator"> -->
        <h2 class="list-title">{{ currentDate }}医疗服务指标</h2>
        <el-table
          :data="medicalServiceIndicators"
          style="width: 100%"
          :row-style="setRowStyle"
          :header-row-style="setHeaderRowStyle"
        >
          <el-table-column prop="name" label="指标名称"></el-table-column>
          <el-table-column prop="value" label="数值">
            <template slot-scope="scope">
              {{ scope.row.value }}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="11" :offset="2">
        <h2 class="list-title">全院综合指标得分</h2>
        <el-table
          :data="medicalQualityScores"
          style="width: 100%"
          :row-style="setRowStyle"
          class="custom-table"
        >
          <el-table-column prop="name" label="指标名称"></el-table-column>
          <el-table-column prop="value" label="得分">
            <template slot-scope="scope">
              {{ scope.row.value }}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="11">
        <h2 class="list-title">质量认证和评级情况</h2>
        <el-table
          :data="qualityCertifications"
          style="width: 100%"
          :row-style="setRowStyle"
        >
          <el-table-column prop="name" label="认证/评级名称"></el-table-column>
          <el-table-column prop="level" label="级别"></el-table-column>
          <el-table-column prop="date" label="认证/评级日期"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="11" :offset="2">
        <h2 class="list-title">患者安全指标</h2>
        <el-table
          :data="patientSafetyIndicator"
          style="width: 100%"
          :row-style="setRowStyle"
        >
          >
          <el-table-column prop="name" label="指标名称"></el-table-column>
          <el-table-column prop="value" label="得分">
            <template slot-scope="scope">
              {{ scope.row.value }}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartTemplate from "./ChartTemplate.vue";
export default {
  name: "Dashboard",
  components: { ChartTemplate },
  data() {
    return {
      currentDate: "",
      list: [
        {
          id: 1,
          indicator: "治疗成果",
          value: 80,
          reference: "70 - 90",
          status: "正常",
        },
        {
          id: 2,
          indicator: "医疗技术",
          value: 85,
          reference: "80 - 95",
          status: "正常",
        },
        {
          id: 3,
          indicator: "医护人员素质",
          value: 78,
          reference: "75 - 85",
          status: "正常",
        },
        // 添加更多的指标数据
      ],
      qualityCertifications: [
        { name: "国家卫生认证", level: "三级甲等", date: "2022-06-15" },
        { name: "国际JCI认证", level: "金标准", date: "2021-02-10" },
        { name: "中国医院品质价值指数", level: "卓越", date: "2020-02-10" },
        // 其他认证和评级信息...
      ],
      medicalQualityScores: [
        { name: "治疗质量", value: "8.9" },
        { name: "手术质量", value: "7.8" },
        { name: "诊断质量", value: "8.4" },
        { name: "医疗安全", value: "9.5" },
        { name: "重返质量", value: "8.9" },
      ],
      itemList: [
        {
          title: "综合医疗质量",
          Etitle: "Medical Quality Score",
          score: 9.3,
          iconName: "el-icon-first-aid-kit",
        },
        {
          title: "综合满意度",
          Etitle: "Satisfaction Score",
          score: 8.3,
          iconName: "el-icon-edit-outline",
        },
      ],
      medicalServiceIndicators: [
        { name: "门诊和住院患者数", value: 1200 },
        { name: "住院平均住院日", value: 6.5 },
        { name: "平均门诊等待时间", value: 20 },
        { name: "手术数量", value: 150 },
        { name: "手术成功率", value: "95%" },
      ],
      patientSafetyIndicator: [
        { name: "医院感染率", value: "2.5%" },
        { name: "药物错误率", value: "0.2%" },
        { name: "不良事件报告数", value: 3 },
      ],
      chartOptions_1: {
        tooltip: {},
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
            name: "医院A",
            type: "radar",
            data: [
              {
                value: [8.5, 9.0, 8.0, 7.5, 8.5, 7.5, 8.0, 7.0],
                name: "医院A",
              },
            ],
          },
        ],
      },
      chartOptions_2: {
        xAxis: {
          type: "category",
          data: ["今日入院", "今日出院", "今日手术", "转院"],
          axisLine: {
            lineStyle: {
              color: "white", // 横轴线颜色
            },
          },
          axisLabel: {
            color: "white", // 横轴标签颜色
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "white", // 横轴线颜色
            },
          },
          axisLabel: {
            color: "white", // 横轴标签颜色
          },
        },
        series: [
          {
            name: "数据",
            type: "bar",
            data: [60, 12, 34, 18],
            label: {
              show: true,
              color: "aqua",
              position: "top", // 在柱状图顶部显示数据
              formatter: "{c}", // 显示数据值
            },
          },
        ],
      },
    };
  },
  methods: {
    setRowStyle({ row, rowIndex }) {
      if (rowIndex % 2) {
        return { backgroundColor: "#081326", color: "#00ffff" };
      }
      return { backgroundColor: "#081326", color: "#ffffff" };
    },
    setHeaderRowStyle({ row, rowIndex }) {
      return { backgroundColor: "transparent", fontWeight: "bold" };
    },
    getStatusClass(value, reference) {
      const [min, max] = reference.split(" - ");
      value = parseFloat(value);
      if (value >= parseFloat(min) && value <= parseFloat(max)) {
        return "normal";
      } else {
        return "abnormal";
      }
    },
    getStatusText(value, reference) {
      const [min, max] = reference.split(" - ");
      value = parseFloat(value);
      if (value >= parseFloat(min) && value <= parseFloat(max)) {
        return "正常";
      } else {
        return "异常";
      }
    },
  },
  mounted() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    this.currentDate = `${year}-${month}-${day}`;
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
.box {
  color: white;

  .title {
    padding-left: 70px;
    font-size: 30px;
    font-weight: bold;
  }
  .Etitle {
    padding-left: 70px;
    font-size: 15px;
  }

  .score {
    padding-left: 70px;
    font-size: 40px;
    font-weight: 900;
    color: aqua;
  }
  .icon {
    padding-top: 30px;
    float: left;
    opacity: 0.5;
    font-size: 50px;
    color: aqua;
  }
}

.list-title {
  color: #00ffff;
}
</style>