<template>
  <div>
    <h2 class="list-title">公众投诉与意见反馈列表</h2>
    <el-table :data="filteredFeedbackList" border style="width: 100%">
      <el-table-column prop="id" label="投诉ID" width="100"></el-table-column>
      <el-table-column prop="content" label="投诉内容"></el-table-column>
      <el-table-column
        prop="date"
        label="投诉日期"
        width="150"
      ></el-table-column>
      <el-table-column prop="status" label="处理状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="getStatusTagType(scope.row.status)">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10]"
      :page-size="pageSize"
      :total="feedbackList.length"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getSuperviseComplain } from "../../../api/monitorPlatform";
export default {
  data() {
    return {
      feedbackList: [],
      pageSize: 5, // 每页显示的记录数
      currentPage: 1, // 当前页码
    };
  },
  computed: {
    // 根据当前页码和每页显示的记录数进行分页
    filteredFeedbackList() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.feedbackList.slice(startIndex, endIndex);
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
    getStatusTagType(status) {
      return status === "已处理" ? "success" : "danger";
    },
  },
  mounted() {
    getSuperviseComplain().then((res) => {
      this.feedbackList = res;
    });
  },
};
</script>

<style>
.list-title {
  color: #00ffff;
  margin-bottom: 20px;
}
</style>
