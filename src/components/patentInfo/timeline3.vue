<template>
  <div class="timeline">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp"
        placement="top"
      >
        <div class="content">
          <div class="deparment">科室:{{activity.department}}</div>
          <div class="doctor">操作方:{{activity.doctor}}</div>
          <div class="free">费用:{{activity.free}}</div>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      activities: [
        {
          timestamp: '取药 2021.10.25  10:59:01',
          doctor: "王医生",
          department: "康复科",
          free: "-"

        },
        {
          timestamp: '缴费 2021.10.25  10:40:32',
          doctor: "自助机",
          department: "-",
          free: "78.00"

        },
        {
          timestamp: '开药单 2021.10.25  10:31:45',
          doctor: "陈医生",
          department: "康复科",
          free: "-"

        },
        {
          timestamp: '取验血报告 2021.10.25  10:25:26',
          doctor: "自助机",
          department: "-",
          free: "-"

        },
        {
          timestamp: '抽血检查 2021.10.25  09:31:09',
          doctor: "李医生",
          department: "康复科",
          free: "-"

        },
        {
          timestamp: '开检查单 2021.10.25  09:12:08',
          doctor: "陈医生",
          department: "康复科",
          free: "-"

        },
        {
          timestamp: '门诊就诊 2021.10.25  09:12:08',
          doctor: "陈医生",
          department: "康复科",
          free: "-"

        },
        {
          timestamp: '挂号  2021.10.25  08:30:30',
          doctor: "-",
          department: "自助机",
          free: "20.00"

        },
      ],
    }
  }
}
</script>
 
<style lang="scss" scoped>
.timeline {
  padding-top: 10px;
  padding-left: 10px;
  box-sizing: border-box;
  color: white;
  height: 100%;

  overflow: auto;
  height: 100%;
  background: #0f1c39;
  &::-webkit-scrollbar {
    display: none;
  }
  .content {
    font-size: 12px;
    color: white;
    display: flex;
    align-items: center;
    div {
      margin-left: 20px;
      width: 100px;
    }
  }
}
::v-deep .el-timeline-item__content {
  color: white;
}
::v-deep .el-timeline-item__timestamp {
  color: white;
}
</style>