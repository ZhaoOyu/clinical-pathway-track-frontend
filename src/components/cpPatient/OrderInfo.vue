<template>
  <div class="order-info">
    <div class="nav">
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal" size="mini">
        <el-menu-item index="1">长期临调</el-menu-item>

        <el-menu-item index="2">长期医嘱</el-menu-item>
        <el-menu-item index="3">临时医嘱</el-menu-item>
        <el-menu-item index="4">报告</el-menu-item>
      </el-menu>
    </div>
    <div class="checkbox">
      <div class="radio">
        <el-radio v-model="orderType" label="在用医嘱" size="mini">在用医嘱</el-radio>
        <el-radio v-model="orderType" label="所有医嘱" size="mini">所有医嘱</el-radio>
      </div>
      <div class="report">
        <el-checkbox-group v-model="orderReport" size="mini">
          <el-checkbox label="重整后"></el-checkbox>
          <el-checkbox label="需要报告"></el-checkbox>
          <el-checkbox label="不需要报告"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="add">
        <el-input size="mini" v-model="queryString" placeholder="医嘱过滤" prefix-icon="el-icon-search"></el-input>
        <el-button size="mini" type="primary" @click="orderDia=true">新增医嘱</el-button>
      </div>
    </div>
    <div class="table">
      <!-- <el-table :data="orderInfos" border style="width: 100%" size="mini">
        <el-table-column prop="type" label="期次"></el-table-column>
        <el-table-column prop="label" label="内容" width="260"></el-table-column>
        <el-table-column prop="allCount" label="总量"></el-table-column>
        <el-table-column prop="singeCount" label="单量"></el-table-column>
        <el-table-column prop="fre" label="频率"></el-table-column>
        <el-table-column prop="use" label="用法" width="160"></el-table-column>
        <el-table-column prop="word" label="医生嘱托"></el-table-column>
        <el-table-column prop="department" label="执行科室"></el-table-column>
        <el-table-column prop="status" label="执行性质"></el-table-column>
        <el-table-column prop="plan" label="时间方案"></el-table-column>
        <el-table-column prop="startTime" label="开始时间"></el-table-column>
        <el-table-column prop="endTime" label="结束时间"></el-table-column>
      </el-table>-->
      <el-table :data="orderInfos" border style="width: 100%" size="mini">
        <el-table-column prop="name" label="名称" width="200"></el-table-column>
        <!-- <el-table-column prop="content" label="内容" width="200"></el-table-column> -->

        <el-table-column prop="timeType" label="期效">
          <template slot-scope="scope">
            <span>{{scope.row && scope.row.timeType===0?"长期医嘱":"临时医嘱"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="execFreq" label="频率">
          <template slot-scope="scope">
            <span>{{scope.row.execFreq?scope.row.execFreq:"/"}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="everyUse" label="单量"></el-table-column>
        <el-table-column prop="totalUse" label="总量"></el-table-column>
        <!-- <el-table-column prop="word" label="医生嘱托"></el-table-column> -->
        <el-table-column prop="deptId" label="执行科室">
          <span>内分泌科</span>
        </el-table-column>

        <el-table-column prop="execTimeScheme" label="时间方案" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.execTimeScheme?scope.row.execTimeScheme:"/"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="startExecTime" label="开始时间" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.startExecTime?new Date(scope.row.startExecTime).format('yyyy-MM-dd'):"/"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="endExecTime" label="结束时间" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.startExecTime?new Date(scope.row.endExecTime).format('yyyy-MM-dd'):"/"}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="orderDia" width="90%">
      <add-order></add-order>
    </el-dialog>
  </div>
</template>
 
<script>
import AddOrder from './AddOrder.vue'
import { getPatientAdvice } from "@/api/patient"
export default {
  components: { AddOrder },
  props: ["patientId"],
  data () {
    return {
      queryString: "",
      orderDia: false,
      orderType: '在用医嘱',
      orderReport: ['需要报告', '不需要报告'],
      orderInfos: [
        {
          type: "长期",
          label: "葡萄糖注射5% 1000ml；5g（5%）",
          allCount: '',
          singleCount: '100ml',
          fre: "每天一次",
          use: "静脉输液,25-30滴/分",
          word: '',
          department: '住院药房',
          status: "正常",
          plan: '第1-4日',
          startTime: '第1日',
          endTime: '第4日',
        },
        {
          type: "长期",
          label: "葡萄糖注射5% 1000ml；5g（5%）",
          allCount: '',
          singleCount: '100ml',
          fre: "每天一次",
          use: "静脉输液,25-30滴/分",
          word: '',
          department: '住院药房',
          status: "正常",
          plan: '第1-4日',
          startTime: '第1日',
          endTime: '第4日',
        },
        {
          type: "长期",
          label: "血液病护理常规",
          allCount: '',
          singleCount: '100ml',
          fre: "每天一次",
          use: "静脉输液,25-30滴/分",
          word: '',
          department: '住院药房',
          status: "正常",
          plan: '第1-4日',
          startTime: '第1日',
          endTime: '第4日',
        },
        {
          type: "长期",
          label: "静电检查",
          allCount: '',
          singleCount: '100ml',
          fre: "每天一次",
          use: "静脉输液,25-30滴/分",
          word: '',
          department: '住院药房',
          status: "正常",
          plan: '第1-4日',
          startTime: '第1日',
          endTime: '第4日',
        },
        {
          type: "长期",
          label: "乙肝二对半",
          allCount: '',
          singleCount: '100ml',
          fre: "每天一次",
          use: "静脉输液,25-30滴/分",
          word: '',
          department: '住院药房',
          status: "正常",
          plan: '第1-4日',
          startTime: '第1日',
          endTime: '第4日',
        },
        {
          type: "长期",
          label: "静电检查",
          allCount: '',
          singleCount: '100ml',
          fre: "每天一次",
          use: "静脉输液,25-30滴/分",
          word: '',
          department: '住院药房',
          status: "正常",
          plan: '第1-4日',
          startTime: '第1日',
          endTime: '第4日',
        },
        {
          type: "长期",
          label: "输血（有指征时）等支持对症治疗",
          allCount: '',
          singleCount: '100ml',
          fre: "每天一次",
          use: "静脉输液,25-30滴/分",
          word: '',
          department: '住院药房',
          status: "正常",
          plan: '第1-4日',
          startTime: '第1日',
          endTime: '第4日',
        },
      ]
    }
  },
  methods: {
    getData () {
      getPatientAdvice(this.patientId).then(orders => {
        console.log('orders', orders);
        this.orderInfos = orders.map(item => ({ ...item.treatment, ...item.advice })).map(item => {
          console.log('item.name', item.name);
          if (!item.name) {
            item.name = item.content
          }
          if (!item.content) {
            item.content = item.name
          }
          return item
        })
      })
    },
    closeDia () {
      this.orderDia = false,
        this.orderInfos.push({
          type: "长期",
          label: "血细胞分析",
          allCount: '',
          singleCount: '100ml',
          fre: "每天一次",
          use: "静脉输液,25-30滴/分",
          word: '',
          department: '住院药房',
          status: "正常",
          plan: '第1-4日',
          startTime: '第1日',
          endTime: '第4日',
        })
      this.orderInfos.push({
        type: "长期",
        label: "胸腔穿刺",
        allCount: '',
        singleCount: '100ml',
        fre: "每天一次",
        use: "静脉输液,25-30滴/分",
        word: '',
        department: '住院药房',
        status: "正常",
        plan: '第1-4日',
        startTime: '第1日',
        endTime: '第4日',
      })
      this.orderInfos.push({
        type: "长期",
        label: "抗病毒治疗",
        allCount: '',
        singleCount: '100ml',
        fre: "每天一次",
        use: "静脉输液,25-30滴/分",
        word: '',
        department: '住院药房',
        status: "正常",
        plan: '第1-4日',
        startTime: '第1日',
        endTime: '第4日',
      })
    }
  },
  mounted () {
    this.getData()
    this.$notify.error({
      title: '警告',
      dangerouslyUseHTMLString: true,

      message: "当前医嘱 <span class='red'>葡萄糖注射 </span> 重复检查",
      offset: 140
    });
    this.$notify.error({
      title: '警告',
      dangerouslyUseHTMLString: true,

      message: "当前医嘱葡萄糖注射 <span class='red'>已超出 </span> 指定量",
      offset: 220
    });
  },
  watch: {
    patientId () {
      this.getData()
    }
  }
}
</script>
 
<style lang="scss" scoped>
.order-info {
  padding-left: 4px;
  box-sizing: border-box;
  .checkbox {
    display: flex;
    align-items: center;
    height: 40px;
    .radio {
      height: 40px;
      display: flex;
      align-items: center;
    }
    .report {
      height: 40px;
      margin-left: 20px;
      display: flex;
      align-items: center;
    }
    .add {
      margin-left: 20px;
      display: flex;
      align-items: center;
      .el-button {
        margin-left: 10px;
      }
    }
  }
}
::v-deep .el-menu-item {
  height: 48px;
  font-size: 12px;
}
::v-deep .el-radio__label {
  font-size: 12px;
}
::v-deep .el-checkbox__label {
  font-size: 12px;
}
</style>