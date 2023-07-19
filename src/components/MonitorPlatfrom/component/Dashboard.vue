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
    <div>
      <table class="realtime-table">
        <thead>
          <tr>
            <th>指标名称</th>
            <th>当前值</th>
            <th>参考范围</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in realtimeData" :key="item.id">
            <td>{{ item.indicator }}</td>
            <td>{{ item.value }}</td>
            <td>{{ item.reference }}</td>
            <td :class="getStatusClass(item.value, item.reference)">
              {{ getStatusText(item.value, item.reference) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      realtimeData: [
        { id: 1, indicator: "治疗成果", value: 80, reference: "70 - 90" },
        { id: 2, indicator: "医疗技术", value: 85, reference: "80 - 95" },
        { id: 3, indicator: "医护人员素质", value: 78, reference: "75 - 85" },
        // 添加更多的指标数据
      ],
      itemList: [
        {
          title: "医疗质量",
          Etitle: "Medical Quality Score",
          score: 9.3,
          iconName: "el-icon-first-aid-kit",
        },
        {
          title: "运营效率",
          Etitle: "Efficiency of Operation",
          score: 7.8,
          iconName: "el-icon-data-analysis",
        },
        {
          title: "综合满意度",
          Etitle: "Satisfaction Score",
          score: 8.3,
          iconName: "el-icon-edit-outline",
        },
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
    };
  },
  methods: {
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
.realtime-table {
  color: aqua;
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.realtime-table th,
.realtime-table td {
  padding: 8px;
  border: 1px solid #ddd;
}

.realtime-table th {
  background-color: #f5f5f5;
  text-align: left;
}

.realtime-table td.normal {
  color: green;
}

.realtime-table td.abnormal {
  color: red;
  font-weight: bold;
}
</style>