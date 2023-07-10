<template>
  <div class="backforward">
    <div class="title">
      <el-button type="primary" size="mini" @click="$router.back()" :style="{marginLeft:'40px'}">返回</el-button>
      <span>临床路径溯源记录</span>
      <el-button type="danger" size="mini" @click="backStep" :style="{marginRight:'40px'}">溯源</el-button>
    </div>
    <div class="time-line">
      <el-timeline>
        <el-timeline-item
          v-for="item in historys"
          :timestamp="item.content"
          :key="item.id"
          placement="top"
        >
          <div>
            <!-- <el-tag type="info overflow">{{item.updateUsername}}</el-tag> -->
            <el-popover placement="top-start" trigger="hover" :content="item.content">
              <el-tag type="info overflow" slot="reference">{{item.content}}</el-tag>
            </el-popover>

            <el-tag type="info overflow">每天使用{{item.everyUse}}</el-tag>
            <el-tag type="info overflow">交易号:{{`${random()}`}}</el-tag>
            <el-tag type="info overflow">区块号:{{`${random()}`}}</el-tag>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
 
<script>
import { traceCurrent, traceBack } from '@/api/trace'
import { Message } from 'element-ui'
export default {
  methods: {
    random () {
      return Math.random().toString().slice(2, 14)
    },
    formatDate (date) {
      let str = new Date(date).toLocaleString()
      let index = new Date(date).toLocaleString().indexOf('午')
      return str.slice(0, index - 1)
    },
    backStep () {
      traceBack(this.adviceId).then(res => {
        console.log('back', res);
        this.historys = [...this.historys, res]
      })
    }
  },
  data () {
    return {
      title: '',
      color: '#1b60ec',
      historys: [],
      adviceId: ""
    }
  },

  mounted () {
    this.id = this.$route.query.patientId
    traceCurrent(this.id).then(res => {
      console.log('trace', res);
      this.historys = [res]
      this.adviceId = res.id
    })
  }
}
</script>
 
<style lang="scss" scoped>
.backforward {
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  .title {
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    font-size: 18px;
  }
  .time-line {
    padding-top: 100px;
  }
  .el-tag {
    margin-right: 10px;
    width: 160px;
    cursor: pointer;
    text-align: center;
  }
}
</style>
<style>
.overflow {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  white-space: nowrap;
}
</style>

