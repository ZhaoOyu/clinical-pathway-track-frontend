<template>
  <div class="timeline" :style="styled">
    <el-collapse v-model="activeNames" @change="handleChange" :style="styled">
      <el-collapse-item title="阶段一" name="0" :style="styled">
        <template slot="title">
          <div class="inner">
            <i
              class="el-icon-circle-check"
              :style="{color:'#0bbd87',fontSize:'20px',marginRight:'8px'}"
            ></i>
            <span :style="{marginRight:'8px'}">阶段一</span>
            <span :style="{marginRight:'8px'}">2021-11-05 09:34:49 - 2021-11-05 09:35:56</span>
            <el-tag type="success" effect="dark" size="mini">已完成</el-tag>
          </div>
        </template>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp"
          >{{activity.content}}</el-timeline-item>
        </el-timeline>
      </el-collapse-item>
      <el-collapse-item name="1" :style="styled">
        <template slot="title">
          <div class="inner">
            <i
              class="el-icon-circle-check"
              :style="{color:'#0bbd87',fontSize:'20px',marginRight:'8px'}"
            ></i>
            <span :style="{marginRight:'8px'}">阶段二</span>
            <span :style="{marginRight:'8px'}">2021-11-05 09:35:56 - 2021-11-05 09:36:45</span>
            <el-tag type="success" effect="dark" size="mini">已完成</el-tag>
          </div>
        </template>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp"
          >{{activity.content}}</el-timeline-item>
        </el-timeline>
      </el-collapse-item>
      <el-collapse-item name="2" :style="styled">
        <template slot="title">
          <i class="el-icon-more" :style="{color:'#2CC2F7',fontSize:'20px',marginRight:'8px'}"></i>
          <span :style="{marginRight:'8px'}">阶段三</span>
          <span :style="{marginRight:'8px'}">2021-11-05 09:35:56 - 至今</span>
          <el-tag type="primary" effect="dark" size="mini">正在进行</el-tag>
        </template>
        <el-timeline>
           <el-timeline-item
            v-for="(activity, index) in activitiesError"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp"
          >
          
           <div :class='activity.class'>{{activity.content}}</div> 
          
          </el-timeline-item>
        </el-timeline>
        </el-timeline>
      </el-collapse-item>
      <el-collapse-item name="3" :style="styled">
        <template slot="title">
          <div class="inner">
            <i
              class="el-icon-edit-outline"
              :style="{color:'rgb(144,147,153)',fontSize:'20px',marginRight:'8px'}"
            ></i>
            <span :style="{marginRight:'8px'}">阶段四</span>
            <el-tag type="info" effect="dark" size="mini">未开始</el-tag>
          </div>
        </template>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp"
          >{{activity.content}}</el-timeline-item>
        </el-timeline>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
 
<script>
export default {
  props: {
    background: String
  },
  data () {
    return {
      activities: [{
        content: '主要诊疗工作-完成病历书写   2021-11-12 20:46',
        timestamp: '',
        size: 'large',
        icon: "el-icon-star-on",
        type: 'primary'
      }, {
        content: '长期医嘱   2021-11-13 20:46',
        timestamp: '',
        size: 'large',
        icon: "el-icon-collection",
        type: 'primary'

      }, {
        content: '  二级护理   2021-11-14 20:46',
        timestamp: '',
        size: 'normal'
      }, {
        content: `饮食   2021-11-15 20:46`,
        timestamp: '清淡饮食',
        size: 'normal'
      }, {
        content: '临时医嘱   2021-11-16 20:46',
        timestamp: '',
        size: 'large',
        icon: "el-icon-reading",
        type: 'primary'

      }, {
        content: '  乙肝二对半   2021-11-17 20:46',
        timestamp: '',
        size: 'normal'
      }, {
        content: '  输血（有指征时）等支持对症治疗 2021-11-18 20:46',
        timestamp: '',
        size: 'normal'
      }, {
        content: '主要护理工作   2021-11-20 20:46',
        timestamp: '',
        size: 'large',
        icon: "el-icon-female",
        type: 'primary'

      }, {
        content: '介绍病房环境、设施和设备   2021-11-20 20:46',
        timestamp: '',
        size: 'normal'
      }, {
        content: '  入院护理评估   2021-11-20 20:46',
        timestamp: '',
        size: 'normal'
      }, {
        content: '  宣教   2021-11-21 20:46',
        timestamp: '',
        size: 'normal'
      }],
      activitiesError: [{
        content: '血液出库流程   2021-11-13 20:46',
        timestamp: '',
        size: 'large',
        icon: "el-icon-collection",
        type: 'primary'

      }, {
        content: '  从贮血冰箱内取出所需要的血液 2021-11-14 20:46 ',
        timestamp: '',
        size: 'normal',
        class: "error"

      }, {
        content: '  在血站电脑管理系统上确认出库 2021-11-15 20:46 ',
        timestamp: '',
        size: 'normal',

      }, {
        content: ' 医生开取血凭单   2021-11-16 20:46',
        timestamp: '',
        size: 'normal',
        class: "error"

      }, {
        content: '  核对所发放血液信息   2021-11-17 20:46',
        timestamp: '',
        size: 'normal',
        class: "normal"
      }],
      activeNames: ['2'],
    }
  },
  computed: {
    styled () {
      if (!this.background) return ``
      else return { background: `${this.background}` }
    }

  },
  methods: {
    handleChange (e) {

    }
  }
}
</script>
 
<style lang="scss" scoped>
.timeline {
  padding: 20px;
  padding-bottom: 0px !important;
  box-sizing: border-box;
  height: 100%;
  color: white;
  .el-collapse {
    overflow: auto;
    height: 100%;
    background: #0f1c39;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
::v-deep .el-collapse-item__content {
  background: #0f1c39 !important;
}
::v-deep .el-timeline-item__content {
  color: white;
}
::v-deep .el-timeline-item__timestamp {
  color: white;
}
::v-deep .el-collapse-item__header {
  width: 100%;
  background: #0f1c39;
  color: white;
}
::v-deep .error {
  
  color: #F56C6C;
}
</style>