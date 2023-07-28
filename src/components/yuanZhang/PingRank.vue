<template>
  <div class="trans-list rangle">
    <div class="title">
      <span>平安果排行</span>
      <el-radio-group v-model="lidu" size="mini" style="float:right">
        <el-radio-button label="医生"></el-radio-button>
        <el-radio-button label="科室"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="list">
      <div class="list-title">
        <div class="department">排行榜名次</div>
        <div class="earlyWarningMonthly" v-if="lidu === '医生'">医生排名</div>

        <div class="earlyWarningNumberToday">所属科室</div>
        <div class="earlyWarningMonthly" v-if="lidu === '科室'">所属部门</div>
        <div class="timeUpdate">平安果数量</div>
        <div class="dutyDirectorToday">更新时间</div>
      </div>
      <div class="list-item" v-for="(item, index) in list" :key="index" @click="handleClick(index)">
        <div class="department">{{ item.rank }}</div>
        <div class="earlyWarningMonthly overflow" v-if="lidu === '医生'">{{ item.name }}</div>

        <div class="earlyWarningNumberToday overflow">{{ item.department }}</div>
        <div class="earlyWarningMonthly overflow" v-if="lidu === '科室'">{{ item.name }}</div>
        <div class="timeUpdate overflow">{{ item.count }}</div>
        <div class="dutyDirectorToday overflow">{{ item.time }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPresidentTotal, getPresidentGuokao, getPresidentDrgWarning, getPresidentDrgInfo, getPresidentDepartmentWarnings, getPresidentAppleRankDoctor, getPresidentAppleRankDepartment, getPresidentAppleNumber } from "./../../api/yuanZhang.js"

export default {

  computed: {

  },
  data() {
    return {
      presidentAppleRankDoctor: [],
      presidentAppleRankDepartment: [],
      lidu: "医生",
      list: []
    }
  },
  watch: {
    lidu(newV) {
      this.list = []
      if (newV === '医生') {
        for (let i = 0; i < this.presidentAppleRankDoctor.length; i++) {
          this.list.push({
            'rank': this.presidentAppleRankDoctor[i].place,
            'name': this.presidentAppleRankDoctor[i].doctorName,
            'department': this.presidentAppleRankDoctor[i].department,
            'count': this.presidentAppleRankDoctor[i].appleNumber,
            time: this.presidentAppleRankDoctor[i].time
          })
        }


      } else {
        for (let i = 0; i < this.presidentAppleRankDepartment.length; i++) {
          this.list.push({
            'rank': this.presidentAppleRankDepartment[i].place,
            'name': this.presidentAppleRankDepartment[i].branch,
            'department': this.presidentAppleRankDepartment[i].department,
            'count': this.presidentAppleRankDepartment[i].appleNumber,
            time: this.presidentAppleRankDepartment[i].time
          })
        }
      }
    },
    presidentAppleRankDoctor:{
      handler(){
        this.getDoctorList()
      }
    },
  },
  created() {
    getPresidentAppleRankDoctor().then(res => {
      this.presidentAppleRankDoctor = res
    })
    getPresidentAppleRankDepartment().then(res => {
      this.presidentAppleRankDepartment = res
    })
  },
  methods: {
    getDoctorList() {
      for (let i = 0; i < this.presidentAppleRankDoctor.length; i++) {
        this.list.push({
          'rank': this.presidentAppleRankDoctor[i].place,
          'name': this.presidentAppleRankDoctor[i].doctorName,
          'department': this.presidentAppleRankDoctor[i].department,
          'count': this.presidentAppleRankDoctor[i].appleNumber,
          time: this.presidentAppleRankDoctor[i].time
        })
      }
    },
    getDepartmentList() {
      for (let i = 0; i < this.presidentAppleRankDepartment.length; i++) {
        this.list.push({
          'rank': this.presidentAppleRankDepartment[i].place,
          'name': this.presidentAppleRankDepartment[i].branch,
          'department': this.presidentAppleRankDepartment[i].department,
          'count': this.presidentAppleRankDepartment[i].appleNumber,
          time: this.presidentAppleRankDepartment[i].time
        })
      }
    }
  }
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
  height: 100%;
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
        //flex: 1;
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