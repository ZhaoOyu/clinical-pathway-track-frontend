<template>
  <div class="error-help">
    <div class="head">
      <div class="title">变异</div>
      <div class="info">标准路径中定义的项目不能满足病人实际需求，但有不至于由于这些因素的影响而退出路径，可以进行变异以增加其他项目</div>
    </div>

    <div class="error">
      <div class="left">
        <el-form :model="errorForm" class="demo-form-inline" size="mini">
          <el-form-item label="选择变异原因">
            <el-input size="mini" clearable v-model="errorForm.reason"></el-input>
          </el-form-item>
          <el-form-item label="变异说明">
            <el-input type="textarea" :rows="3" placeholder="变异说明" v-model="errorForm.info"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <div class="title">标签选择</div>
        <div class="tags">
          <el-tag
            v-for="item in tags"
            :key="item.label"
            :type="item.type"
            effect="dark"
            @click="handleClickTag(item)"
          >{{ item.label }}</el-tag>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="relate-order">
        <div class="title">相关医嘱</div>
        <div class="list" v-show="relateShow">
          <el-card v-for="item in orders" :key="item.label">
            <div class="inner" @click="handleClickRecommand(item)">
              <span>{{item.label}}</span>
              <div class="wrapper">
                <el-progress :percentage="item.percentage" :color="customColor"></el-progress>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div class="order-list">
        <div class="title">医嘱列表</div>
        <div class="search">
          <order-search></order-search>
        </div>
        <div class="list">
          <el-table :data="orderInfos" border size="mini">
            <el-table-column prop="type" label="期次"></el-table-column>
            <el-table-column prop="label" label="内容" width="110"></el-table-column>
            <el-table-column prop="allCount" label="总量"></el-table-column>
            <el-table-column prop="singeCount" label="单量"></el-table-column>
            <el-table-column prop="fre" label="频率"></el-table-column>
            <el-table-column prop="use" label="用法"></el-table-column>
            <el-table-column prop="word" label="医生嘱托"></el-table-column>
            <el-table-column prop="department" label="执行科室"></el-table-column>
            <el-table-column prop="startTime" label="开始时间"></el-table-column>
            <el-table-column prop="endTime" label="结束时间"></el-table-column>
          </el-table>
        </div>

        <el-card class="detail">
          <div class="inner">
            <div class="left">
              <el-form size="mini">
                <el-form-item label="期效">
                  <el-select v-model="formDetail.type" size="mini">
                    <el-option label="临时医嘱" value="1"></el-option>
                    <el-option label="长期医嘱" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="生成人">
                  <el-select v-model="formDetail.addPerson" size="mini">
                    <el-option label="医生" value="1"></el-option>
                    <el-option label="护士" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="内容">
                  <el-input v-model="errorForm.label"></el-input>
                </el-form-item>
                <el-form-item label="总量">
                  <el-select v-model="formDetail.allCount" size="mini">
                    <el-option label="一次" value="1"></el-option>
                    <el-option label="两次" value="2"></el-option>
                    <el-option label="三次及以上" value="3"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="单量">
                  <el-select v-model="formDetail.singleCount" size="mini">
                    <el-option label="一次" value="1"></el-option>
                    <el-option label="两次" value="2"></el-option>
                    <el-option label="三次及以上" value="3"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="频率">
                  <el-select v-model="formDetail.fre" size="mini">
                    <el-option label="一次性" value="1"></el-option>
                    <el-option label="每天使用" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="用法">
                  <el-select v-model="formDetail.use" size="mini">
                    <el-option label="静脉采血" value="1"></el-option>
                    <el-option label="食用" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="医生嘱托">
                  <el-input type="textarea" :rows="2" placeholder="变异说明" v-model="formDetail.info"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="right">
              <el-form size="mini">
                <el-form-item label="执行方式">
                  <el-select v-model="formDetail.workType" size="mini">
                    <el-option label="必要时执行" value="1"></el-option>
                    <el-option label="立即执行" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="执行人">
                  <el-select v-model="formDetail.workPerson" size="mini">
                    <el-option label="医生" value="1"></el-option>
                    <el-option label="护士" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="执行结果">
                  <el-select v-model="formDetail.workResult" size="mini">
                    <el-option label="已经执行" value="1"></el-option>
                    <el-option label="未执行" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="执行科室">
                  <el-select v-model="formDetail.department" size="mini">
                    <el-option label="检验科" value="1"></el-option>
                    <el-option label="骨科" value="2"></el-option>
                    <el-option label="脊柱科" value="3"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="执行性质">
                  <el-select v-model="formDetail.xingzhi" size="mini">
                    <el-option label value="1"></el-option>
                    <el-option label value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="时间方案">
                  <el-select v-model="formDetail.plan" size="mini">
                    <el-option label="每天" value="1"></el-option>
                    <el-option label="每周" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="开始时间">
                  <el-date-picker v-model="formDetail.startTime" type="date" placeholder="开始时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                  <el-date-picker v-model="formDetail.endTime" type="date" placeholder="结束时间"></el-date-picker>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <el-button type="primary" size="mini" :style="{float:'right'}">添加</el-button>
        </el-card>
        <div class="xishu">
          <div class="wrapper">
            <span>
              变异系数:
              <span class="red">8</span>
            </span>
            <span>
              已发生变异:
              <span class="red">4</span>
            </span>
            <span>
              该阶段变异数:
              <span class="red">4</span>
            </span>
            <el-button type="primary" size="mini" :style="{float:'right'}" @click="handleClick">确认</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import OrderSearch from './OrderSearch.vue'

export default {
  components: {
    OrderSearch
  },
  data () {
    return {
      customColor: '#0D8C62',
      errorForm: {
        reason: '',
        info: ""
      },
      relateShow: false,
      tags: [
        { type: '', label: '高血压' },
        { type: 'success', label: '术后感染' },
        { type: 'info', label: '糖尿病' },
        { type: 'danger', label: '血栓阻塞' },
        { type: 'warning', label: '体温升高' }
      ],
      orders: [
        { label: '氯化钠注射液 0.9%100ml:0.9g', percentage: 99 },
        { label: '卡托普利25mg', percentage: 96 },
        { label: '苯那普利5mg', percentage: 95 },
        { label: '依那普利5mg', percentage: 90 },
        { label: '阿替洛尔50mg', percentage: 88 },
        { label: '维拉帕米（缓释）180mg', percentage: 99 },
        { label: '双肼肽嗪10mg', percentage: 85 },
        { label: '丙嗪2.0mg', percentage: 85 },
        { label: '氨苯喋啶37.5mg', percentage: 85 },
      ],
      formDetail: {
        type: "临时医嘱",
        addPerson: "医生",
        label: "",
        allCount: "一次",
        singleCount: "一次",
        fre: "一次性",
        use: "静脉采血",
        info: "",
        workType: "必要时执行",
        workPerson: "医生",
        workResult: "已经执行",
        department: "脊柱科",
        xingzhi: "",
        plan: "每天",
        startTime: new Date(),
        endTime: new Date(),
      },
      orderInfos: [
        {
          type: "长期",
          label: "葡萄糖",
          allCount: '',
          singleCount: '100ml',
          fre: "每天一次",
          use: "静脉输液",
          word: '',
          department: '住院药房',
          status: "正常",
          plan: '第1-4日',
          startTime: '第1日',
          endTime: '第4日',
        },
        // {
        //   type: "长期",
        //   label: "葡萄糖",
        //   allCount: '',
        //   singleCount: '100ml',
        //   fre: "每天一次",
        //   use: "静脉输液",
        //   word: '',
        //   department: '住院药房',
        //   status: "正常",
        //   plan: '第1-4日',
        //   startTime: '第1日',
        //   endTime: '第4日',
        // },
      ]
    }
  },
  methods: {
    handleClickRecommand (item) {
      console.log('item', item);
      this.orderInfos.push({
        type: "长期",
        label: item.label,
        allCount: '',
        singleCount: '100ml',
        fre: "每天一次",
        use: "静脉输液",
        word: '',
        department: '住院药房',
        status: "正常",
        plan: '第1-4日',
        startTime: '第1日',
        endTime: '第4日',
      })
    },
    handleClick () {
      this.$emit('close')
    },
    handleClickTag (tag) {
      this.errorForm.reason = tag.label

      this.relateShow = true
    }
  }
}
</script>
 
<style lang="scss" scoped>
.error-help {
  width: 100%;
  .head {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: #3981ee;
    height: 80px;
    justify-content: center;
    color: white;
    .title {
      font-size: 20px;
      font-weight: bold;
    }
    .info {
      margin-top: 4px;
      font-size: 14px;
    }
  }
  .error {
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    .left {
    }
    .right {
      width: 49%;
      margin-left: 20px;
      margin-top: 40px;
      font-size: 14px;
      .tags {
        margin-top: 10px;
        .el-tag {
          margin-left: 20px;
          cursor: pointer;
        }
      }
    }
  }
  .main {
    display: flex;
    padding: 20px 40px 20px 40px;
    box-sizing: border-box;
    width: 100%;

    .relate-order {
      width: 50%;
      .title {
        height: 40px;
        width: 100%;
        background: #e2e6e6;
        line-height: 40px;
        padding-left: 10px;
      }
      .list {
        width: 80%;
        margin-top: 10px;
        .el-card {
          margin-bottom: 2px;
          cursor: pointer;
          .inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
          }
        }
      }
    }
    .order-list {
      width: 49%;
      margin-left: 2%;
      .title {
        height: 40px;
        width: 100%;
        background: #e2e6e6;
        line-height: 40px;
        padding-left: 10px;
      }
      .search {
        width: 100%;
      }
      .error {
        margin-top: 10px;

        font-size: 12px;
      }

      .detail {
        margin-top: 10px;
        width: 100%;
        height: 380px;
        .inner {
          width: 100%;

          display: flex;
          align-items: flex-start;
        }

        .left {
          width: 50%;
        }
        .right {
          width: 50%;
        }
      }
      .xishu {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 10px;
        .wrapper {
          margin-right: 10px;
          span {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
::v-deep .el-form-item {
  margin-bottom: 10px !important;
  display: flex;
  align-items: center;
}
::v-deep .el-form-item__label {
  display: inline-block;
  font-weight: bold;
  width: 120px;
}
::v-deep .el-textarea__inner {
  width: 240px;
}
::v-deep .el-card__body {
  padding: 10px !important;
  height: 20px;
}
::v-deep .el-progress-bar__outer {
  width: 40px;
}
::v-deep .el-progress-bar {
  padding-right: 70px !important;
}
::v-deep .el-progress-bar__outer {
  background-color: #a62f2f !important;
}
::v-deep .el-progress__text {
  color: #0d8c62;
}
::v-deep .el-textarea__inner {
  width: 160px;
}
::v-deep .el-date-editor {
  width: 160px;
}
</style>