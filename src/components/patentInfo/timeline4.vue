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
          <div class="deparment">患者:{{activity.patient}}</div>
          <div class="doctor">DRG:{{activity.DRG}}</div>
          <div class="free">费用使用率:{{activity.freeRate}}</div>
          <div class="free">盈亏:{{activity.free}}</div>
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
          timestamp: '听诊(平安果+5) 2021.10.25  10:59:01',
          patient: "张患者",
          department: "康复科",
          free: "+620",
          freeRate: "63%",
          DRG: "脊柱手术"
        },
        {
          timestamp: '听诊(平安果+5) 2021.10.25  10:59:01',
          patient: "张患者",
          department: "康复科",
          free: "+620",
          freeRate: "63%",
          DRG: "脊柱手术"
        },
        {
          timestamp: '听诊(平安果+5) 2021.10.25  10:59:01',
          patient: "张患者",
          department: "康复科",
          free: "+620",
          freeRate: "63%",
          DRG: "脊柱手术"
        },
        {
          timestamp: '听诊(平安果+5) 2021.10.25  10:59:01',
          patient: "张患者",
          department: "康复科",
          free: "+620",
          freeRate: "63%",
          DRG: "脊柱手术"
        },
        {
          timestamp: '听诊(平安果+5) 2021.10.25  10:59:01',
          patient: "张患者",
          department: "康复科",
          free: "+620",
          freeRate: "63%",
          DRG: "脊柱手术"
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