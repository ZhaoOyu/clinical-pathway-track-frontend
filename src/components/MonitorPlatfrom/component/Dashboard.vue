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
    <div class="list-box">
      <chart-template :options="chartOptions_2" title="住院统计" width="30%" />
      <div class="trans-list">
        <div class="title">指标</div>
        <div class="list">
          <div class="list-title">
            <div class="indicator">指标名称</div>
            <div class="value">当前值</div>
            <div class="reference">参考范围</div>
            <div class="status">状态</div>
          </div>
          <div class="list-item" v-for="(item, index) in list" :key="index">
            <div class="indicator">{{ item.indicator }}</div>
            <div class="value">
              {{ item.value }}
            </div>
            <div class="reference">
              {{ item.reference }}
            </div>
            <div class="status">{{ item.status }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartTemplate from "./ChartTemplate.vue";
export default {
  name: "Dashboard",
  components: { ChartTemplate },
  data() {
    return {
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
.trans-list {
  width: 30%;
  background-color: #091629;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  .title {
    color: #117fbe;
    font-size: 16px;
    font-weight: bold;
  }
  .list {
    background-color: #091629;
    padding-left: 10px;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;

    color: rgb(255, 255, 255);
    margin-top: 10px;
    .title {
      color: #168ce3 !important;
      font-weight: 600;
    }
    .list-title {
      display: flex;
      border-bottom: 1px solid gray;
      // height: 12.5%;
      padding: 10px 20px 10px 0;
      align-items: center;
      div {
        flex: 1;
      }
      .indicator {
        color: #168ce3;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 13px;
      }
      .value {
        color: #168ce3;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 13px;
      }
      .reference {
        color: #168ce3;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 13px;
      }
      .status {
        color: #168ce3;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 13px;
      }

      .dutyDirectorToday {
        text-align: center;
        color: #168ce3;

        font-size: 13px;
      }
      .numberOfEmployeesToday {
        text-align: center;
        font-size: 13px;
        color: #168ce3;
      }
      .overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* &:nth-child(odd) {
        background: #f2f2f2;
      }
      &:nth-child(even) {
        background: white;
      } */
      &.gray {
        color: gray;
      }
    }
    .list-item {
      display: flex;
      // border-bottom: 1px solid gray;
      // height: 12.5%;
      padding: 6px 20px 6px 0;
      align-items: center;
      div {
        flex: 1;
      }
      .indicator {
        color: #74fbf5;
        // flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 10px;
      }
      .value {
        color: #74fbf5;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 10px;
      }
      .reference {
        color: #74fbf5;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 10px;
      }
      .status {
        color: #74fbf5;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 10px;
      }

      .numberOfEmployeesToday {
        text-align: center;
        font-size: 10px;
        color: #74fbf5;
      }
    }
  }
}
.list-box {
  display: flex;
  justify-content: space-between;
}
</style>