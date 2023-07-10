<template>
  <div class="all-file">
    <div class="title">全部文件</div>
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
    <div class="main">
      <el-card v-for="(file,index) in list" :key="index">
        <div class="wrapper">
          <div class="top">
            <div class="icon">
              <i class="el-icon-document-copy"></i>
            </div>
            <div class="base">
              <div class="filename">{{file.fileName}}</div>
              <div class="disease">病种:{{file.disease}}</div>
              <div class="intr" v-if="type === '病例文件'">
                <div class="patentName">病人情况: {{file.patentName}}</div>
                <div class="sex">，{{file.sex}}</div>

                <div class="age">, {{file.age}}</div>
                <div class="count" style="marginLeft:4px">
                  <span class="appleColor">
                    <i class="iconfont icon-pingguo" style="color:#E64C65;fontSize:12px"></i>

                    <span class="appleColor" :style="{fontSize:'12px'}">{{file.count}}</span>
                  </span>
                </div>
                <div class="inner1" style="display:flex;alignItems:Center;marginLeft:4px">
                  <img :src="imgSrc" alt />
                  <span style="marginLeft:2px">{{file.score}}</span>
                </div>
              </div>
              <div class="intr" v-if="type === '路径模板' ">
                <div class="patent-name">第{{file.no}}版</div>
                <div class="patent-name">,共{{file.days}}天</div>
                <div class="patent-name">,共{{file.stage}}阶段</div>
                <div class="count" style="marginLeft:4px">
                  <span class="appleColor">
                    <i class="iconfont icon-pingguo" style="color:#E64C65;fontSize:12px"></i>

                    <span class="appleColor" :style="{fontSize:'12px'}">{{file.count}}</span>
                  </span>
                </div>
                <div class="inner1" style="display:flex;alignItems:Center;marginLeft:4px">
                  <img :src="imgSrc" alt />
                  <span style="marginLeft:2px">{{file.score}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="inner">
            <div class="tab">预览</div>
            <div class="tab">购买</div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      type: "病例文件",
      imgSrc: require('../../../public/img/all.png'),

      uploadFiles: [
        { fileName: "病例文件2456", patentName: "张三", age: 26, sex: "男", disease: "脊柱骨折", time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, count: 2, score: 4.0 },
        { fileName: "病例文件3456", patentName: "张三", age: 26, sex: "男", disease: "脊柱骨折", time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 50, count: 6, score: 4.8 },
        { fileName: "病例文件6556", patentName: "张三", age: 26, sex: "男", disease: "脊柱骨折", time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, count: 8, score: 3.2 },
        { fileName: "病例文件6556", patentName: "张三", age: 26, sex: "男", disease: "脊柱骨折", time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 30, count: 3, score: 5.0 },
        { fileName: "病例文件6556", patentName: "张三", age: 26, sex: "男", disease: "脊柱骨折", time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 50, count: 9, score: 3.5 },
        { fileName: "病例文件6556", patentName: "张三", age: 26, sex: "男", disease: "脊柱骨折", time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, count: 4, score: 2.8 },
      ],
      uploadTemplates: [
        { fileName: '高血糖通用临床路径模板', department: "内科", disease: "高血糖", uploader: "王先生", count: 5, no: 3, days: 10, stage: 4, time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, score: 4.0 },
        { fileName: '模板2_脊柱骨折内置固定_高血压', department: "脊柱一科", disease: "脊柱骨折", uploader: "王先生", count: 8, no: 2, days: 9, stage: 5, time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, score: 3.0 },
        { fileName: '模板3_脊柱骨折内置固定_静脉血栓', department: "脊柱二科", disease: "脊柱骨折", uploader: "王先生", count: 2, no: 1, days: 12, stage: 5, time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 30, score: 3.2 },
        { fileName: '模板3_脊柱骨折内置固定_静脉血栓', department: "脊柱二科", disease: "脊柱骨折", uploader: "王先生", count: 2, no: 1, days: 12, stage: 5, time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 50, score: 4.2 },
        { fileName: '模板3_脊柱骨折内置固定_静脉血栓', department: "脊柱二科", disease: "脊柱骨折", uploader: "王先生", count: 2, no: 1, days: 12, stage: 5, time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, score: 2.6 },
        { fileName: '模板3_脊柱骨折内置固定_静脉血栓', department: "脊柱二科", disease: "脊柱骨折", uploader: "王先生", count: 2, no: 1, days: 12, stage: 5, time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, score: 3.4 },

      ],
      list: []

    }
  },
  methods: {
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
.all-file {
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
  .main {
    display: flex;
    flex-wrap: wrap;
    .el-card {
      width: 300px;
      margin-right: 20px;
      margin-top: 20px;
      .wrapper {
        .top {
          display: flex;
          align-items: center;
          color: gray;
          font-size: 14px;
          height: 90px;
          .icon {
            font-size: 32px;
            color: #409eff;
            margin-right: 15px;
          }
          .intr {
            display: flex;
            font-size: 12px;
            align-items: center;
          }
          .disease {
            font-size: 12px;
          }
          .filename {
            color: black;
            font-weight: bold;
            margin-bottom: 10px;
          }
        }

        .inner {
          display: flex;
          font-size: 14px;
          margin-top: 10px;
          .tab {
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            font-weight: 600;
            cursor: pointer;
            &:nth-child(1) {
              border-right: 1px solid black;
            }
          }
        }
      }
    }
  }
}
::v-deep .el-card__body {
  padding-bottom: 10px !important;
}
img {
  width: 12px;
  height: 12px;
}
</style>