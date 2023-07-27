<template>
  <div class="trans-list rangle">
    <div class="title">2021各科室预警情况</div>
    <div class="list">
      <div class="list-title">
        <div class="department">科室名称</div>
        <div class="earlyWarningMonthly">预警比例</div>
        <div class="earlyWarningNumberToday">预警数量</div>
        <div class="timeUpdate">更新时间</div>
        <div class="dutyDirectorToday">值班主任</div>
        <div class="numberOfEmployeesToday">在职人数</div>
      </div>
      <div
        class="list-item"
        v-for="(item,index) in list"
        :class="{red:item.department === department}"
        :key="index"
        @click="handleClick(index)"
      >
        <div class="department">{{item.department}}</div>
        <div class="earlyWarningMonthly overflow">{{item.earlyWarningMonthly}}</div>
        <div class="earlyWarningNumberToday overflow">{{item.earlyWarningNumberToday}}</div>
        <div class="timeUpdate overflow">{{item.timeUpdate}}</div>
        <div class="dutyDirectorToday overflow">{{item.dutyDirectorToday}}</div>
        <div class="numberOfEmployeesToday overflow">{{item.numberOfEmployeesToday}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDailyCost } from "@/api/drg-management"
import { getPresidentTotal, getPresidentGuokao, getPresidentDrgWarning, getPresidentDrgInfo, getPresidentDepartmentWarnings, getPresidentAppleRankDoctor, getPresidentAppleRankDepartment, getPresidentAppleNumber } from "./../../../api/yuanZhang.js"

export default {
  computed: {
    department () {
      return this.$store.state.yuanZhang.department
    }
  },
  data () {
    return {
      list: [],
      PresidentDepartmentWarnings: [],
      
    }
  },
  methods: {
    handleClick (index) {
      this.$router.push({
        path: "/dataerror",
        query: {
          department: this.list[index].department
        }
      })
    },
    getList(){
      for (let i = 0; i < this.PresidentDepartmentWarnings.length; i++) {
        var obj = {
          'department': this.PresidentDepartmentWarnings[i].department,
          'earlyWarningMonthly': this.PresidentDepartmentWarnings[i].warningProportion,
          'earlyWarningNumberToday': this.PresidentDepartmentWarnings[i].warningNumber,
          'timeUpdate': this.PresidentDepartmentWarnings[i].time,
          'dutyDirectorToday': this.PresidentDepartmentWarnings[i].doctorName,
          'numberOfEmployeesToday': this.PresidentDepartmentWarnings[i].number
        }

        this.list.push(obj)
      }
    }
  },
  watch:{
    PresidentDepartmentWarnings:{
      handler(){
        this.getList()
      }
    }
  },
  created() {
    getPresidentDepartmentWarnings().then(res => {
      this.PresidentDepartmentWarnings = res
    })
  },
}
</script>
<style lang="scss" scoped>
.trans-list {
  //   margin-left: 10px;
  //   margin-right: 10px;
  //   overflow-y: hidden;
  //   overflow: hidden;
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
      .department {
        color: #168ce3;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 13px;
      }
      .earlyWarningMonthly {
        color: #168ce3;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 13px;
      }
      .earlyWarningNumberToday {
        color: #168ce3;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 13px;
      }
      .timeUpdate {
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
      .department {
        color: #74fbf5;
        // flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 10px;
      }
      .earlyWarningMonthly {
        color: #74fbf5;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 10px;
      }
      .earlyWarningNumberToday {
        color: #74fbf5;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 10px;
      }
      .timeUpdate {
        color: #74fbf5;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 10px;
      }

      .dutyDirectorToday {
        text-align: center;
        color: #74fbf5;

        font-size: 10px;
      }
      .numberOfEmployeesToday {
        text-align: center;
        font-size: 10px;
        color: #74fbf5;
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
  }
}
.red {
  div {
    color: #ec3333 !important;
  }
}
</style>