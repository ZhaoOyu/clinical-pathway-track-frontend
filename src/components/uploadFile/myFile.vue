<template>
  <div class="my-file">
    <div class="title">我的文件</div>
    <div class="radio">
      <el-radio-group v-model="type" @change="radioChange" size="mini">
        <el-radio-button label="病例文件"></el-radio-button>
        <el-radio-button label="路径模板"></el-radio-button>
      </el-radio-group>
      <div class="head">
        <el-input placeholder="文件名" size="mini"></el-input>
        <el-input placeholder="病种" size="mini"></el-input>
        <el-button type="primary" size="mini">搜索</el-button>
      </div>
    </div>
    <div class="btns">
      <el-button type="primary" size="mini">下载</el-button>
      <el-button type="success" size="mini">评价</el-button>
      <el-button type="warning" size="mini">预览</el-button>
      <el-button size="mini">批量操作</el-button>
      <el-button size="mini">更多操作</el-button>
    </div>
    <div class="main">
      <el-table size="mini" :data="list" v-if="type==='病例文件'">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="fileName" label="文件名" width="240"></el-table-column>
        <el-table-column prop="disease" label="病种类别"></el-table-column>
        <el-table-column prop="patentName" label="患者姓名"></el-table-column>
        <el-table-column prop="age" label="患者年龄"></el-table-column>
        <el-table-column prop="sex" label="患者性别"></el-table-column>
        <el-table-column prop="count" label="平安果">
          <template slot-scope="scope">
            <span class="appleColor">
              <i class="iconfont icon-pingguo" style="color:#E64C65;fontSize:14px"></i>

              <span
                class="appleColor"
                :style="{fontSize:'14px',marginLeft:'2px'}"
              >{{scope.row.count}}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="评分">
          <template slot-scope="scope">
            <div class="inner" style="display:flex;alignItems:Center">
              <img :src="imgSrc" alt />
              <span style="marginLeft:2px">{{scope.row.score}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary">下载</el-button>
            <el-button size="mini" type="success" @click="evaluate(scope.row.fileName)">评价</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table size="mini" :data="list" v-if="type==='路径模板'">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="fileName" label="文件名" width="240"></el-table-column>
        <el-table-column prop="disease" label="病种类别"></el-table-column>
        <el-table-column prop="no" label="版本"></el-table-column>
        <el-table-column prop="days" label="总天数"></el-table-column>
        <el-table-column prop="stage" label="总阶段数"></el-table-column>
        <el-table-column prop="count" label="平安果">
          <template slot-scope="scope">
            <span class="appleColor">
              <i class="iconfont icon-pingguo" style="color:#E64C65;fontSize:14px"></i>

              <span
                class="appleColor"
                :style="{fontSize:'14px',marginLeft:'2px'}"
              >{{scope.row.count}}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="评分">
          <template slot-scope="scope">
            <div class="inner" style="display:flex;alignItems:Center">
              <img :src="imgSrc" alt />
              <span style="marginLeft:2px">{{scope.row.score}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary">下载</el-button>
            <el-button size="mini" type="success" @click="evaluate(scope.row.fileName)">评价</el-button>
            <!-- <el-button size="mini" type="danger">评价</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="发表评价" :visible.sync="evaluateShow">
      <div class="inner">
        <div class="head" style="fontSize:18px;fontWeight:600">文件名: {{fileName}}</div>
        <star></star>
        <el-form style="marginTop:10px">
          <el-form-item label="评价">
            <el-input type="textarea" placeholder="请输入评价" v-model="evaludateInfo" :rows="5"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn" style="width:100%;textAlign:right">
          <el-button type="primary" @click="evaluateShow=false">提交</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
import Star from './Star.vue'
import { evaluate } from '@/api/patient.js';
export default {
  components: { Star },
  data () {
    return {
      type: "病例文件",
      evaluateShow: false,
      evaludateInfo: "",
      fileName: "",
      imgSrc: require('../../../public/img/all.png'),

      uploadFiles: [
        { fileName: "病例文件2456", patentName: "张三", age: 26, sex: "男", disease: "脊柱骨折", time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, count: 2, score: 4.0 },
        { fileName: "病例文件3456", patentName: "张三", age: 26, sex: "男", disease: "脊柱骨折", time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 50, count: 6, score: 3.5 },
        { fileName: "病例文件6556", patentName: "张三", age: 26, sex: "男", disease: "脊柱骨折", time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, count: 8, score: 4.5 },
        { fileName: "病例文件6556", patentName: "张三", age: 26, sex: "男", disease: "脊柱骨折", time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 30, count: 3, score: 3.5 },
        { fileName: "病例文件6556", patentName: "张三", age: 26, sex: "男", disease: "脊柱骨折", time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 50, count: 9, score: 2.5 },
        { fileName: "病例文件6556", patentName: "张三", age: 26, sex: "男", disease: "脊柱骨折", time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, count: 4, score: 3.0 },
      ],
      uploadTemplates: [
        { fileName: '高血糖通用临床路径模板', department: "内科", disease: "高血糖", uploader: "王先生", count: 5, no: 3, days: 10, stage: 4, time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, score: 3.5 },
        { fileName: '模板2_脊柱骨折内置固定_高血压', department: "脊柱一科", disease: "脊柱骨折", uploader: "王先生", count: 8, no: 2, days: 9, stage: 5, time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, score: 3.0 },
        { fileName: '模板3_脊柱骨折内置固定_静脉血栓', department: "脊柱二科", disease: "脊柱骨折", uploader: "王先生", count: 2, no: 1, days: 12, stage: 5, time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 30, score: 2.5 },
        { fileName: '模板3_脊柱骨折内置固定_静脉血栓', department: "脊柱二科", disease: "脊柱骨折", uploader: "王先生", count: 2, no: 1, days: 12, stage: 5, time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 50, score: 5.0 },
        { fileName: '模板3_脊柱骨折内置固定_静脉血栓', department: "脊柱二科", disease: "脊柱骨折", uploader: "王先生", count: 2, no: 1, days: 12, stage: 5, time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, score: 4.5 },
        { fileName: '模板3_脊柱骨折内置固定_静脉血栓', department: "脊柱二科", disease: "脊柱骨折", uploader: "王先生", count: 2, no: 1, days: 12, stage: 5, time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, score: 3.5 },

      ],
      list: []

    }
  },
  methods: {
    evaluate (fileName) {
      this.fileName = fileName
      this.evaluateShow = true
    },
    uploadFile (param) {

    },
    radioChange (e) {
      if (e === '病例文件') {
        this.list = this.uploadFiles
      } else {
        this.list = this.uploadTemplates
      }
    }
  },
  mounted () {
    this.list = this.uploadFiles
  }
}
</script>
 
<style lang="scss" scoped>
.my-file {
  padding: 10px;
  box-sizing: border-box;
  .title {
    font-size: 24px;
    font-weight: bold;
  }
  .radio {
    display: flex;
    margin-top: 10px;

    justify-content: space-between;
    .head {
      display: flex;
      .el-input {
        margin-right: 10px;
      }
    }
  }
  .btns {
    margin-top: 10px;
  }
  .main {
    margin-top: 10px;
  }
}
.el-textarea {
  width: 90%;
}
img {
  width: 16px;
  height: 16px;
}
</style>