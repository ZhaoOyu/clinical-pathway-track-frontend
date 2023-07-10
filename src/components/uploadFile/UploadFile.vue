<template>
  <div class="upload">
    <el-card>
      <div class="top">
        <div class="mydou">
          <div class="title">我的平安果</div>
          <div class="count">319</div>
        </div>
        <div class="myTask">
          <div class="title">我的任务</div>
          <div class="count">18</div>
        </div>
        <div class="weekTask">
          <div class="title">累计收益</div>

          <div class="count">
            <i class="iconfont icon-pingguo" style="color:#E64C65"></i>
            1920
          </div>
        </div>
      </div>
    </el-card>
    <el-card>
      <div class="main">
        <div class="title">
          <div class="list-title">{{type}}列表</div>
          <div class="wrapper">
            <div class="radio">
              <el-radio-group v-model="type" size="mini" @change="radioChange">
                <el-radio-button label="病例文件"></el-radio-button>
                <el-radio-button label="路径模板"></el-radio-button>
              </el-radio-group>
            </div>
            <div class="input">
              <el-input size="mini" placeholder="文件名" suffix-icon="el-icon-search"></el-input>
            </div>
          </div>
        </div>
        <div class="upload-file">
          <el-upload class="avatar-uploader" action :show-file-list="false">
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <span>上传文件</span>
          </el-upload>
        </div>
        <div class="list">
          <div class="list-item" v-for="(file,index) in list" :key="index">
            <div class="wrapper">
              <div class="img">Task</div>
              <div class="intr">
                <div class="file-name">{{file.fileName}}</div>
                <div class="base" v-if="type === '病例文件' ">
                  <div class="patent-name">姓名:{{file.patentName}}</div>
                  <div class="patent-name">性别:{{file.sex}}</div>
                  <div class="patent-name">年龄:{{file.age}}岁</div>
                  <div class="patent-name">主要病症:{{file.disease}}</div>
                </div>
                <div class="base" v-if="type === '路径模板' ">
                  <div class="patent-name">版本:第{{file.no}}版</div>
                  <div class="patent-name">天数:{{file.days}}</div>
                  <div class="patent-name">阶段数:{{file.stage}}岁</div>
                  <div class="patent-name">主要病症:{{file.disease}}</div>
                </div>
              </div>
            </div>

            <div class="uploader">
              <div class="owner">Owner</div>
              <div class="name">王医生</div>
            </div>
            <div class="time">
              <div class="begin">开始时间</div>
              <div class="begin-time">{{file.time}}</div>
            </div>
            <div class="percentage">
              <el-progress :percentage="100" status="success" v-if="file.percentage === 100"></el-progress>
              <!-- <el-progress :percentage="50" v-if="file.percentage === 50"></el-progress> -->
              <!-- <el-progress :percentage="30" status="exception" v-if="file.percentage === 30"></el-progress> -->
              <el-progress :percentage="file.percentage" v-else></el-progress>
            </div>
            <div class="uploader">
              <div class="owner">下载量:{{file.downloadNumber}}</div>
              <div class="name">已收益:{{file.downloadNumber * file.count}}</div>
            </div>
            <div class="jindou">
              <span class="appleColor">
                <i class="iconfont icon-pingguo" style="color:#E64C65;fontSize:18px"></i>

                <span class="appleColor" :style="{fontSize:'18px',marginLeft:'2px'}">{{file.count}}</span>
              </span>
            </div>

            <div class="inner1" style="display:flex;alignItems:Center">
              <img :src="imgSrc" alt />
              <span style="marginLeft:2px">{{file.score}}</span>
            </div>
            <div class="operation">
              <div class="edit">编辑</div>
              <div class="more">更多</div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      action: '',
      imgSrc: require('../../../public/img/all.png'),

      type: "病例文件",
      uploadFiles: [
        { fileName: "病例文件2456", patentName: "张三", age: 26, sex: "男", disease: "脊柱骨折", time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 50, count: 2, downloadNumber: 0, score: 3.5 },
        { fileName: "病例文件3456", patentName: "张三", age: 26, sex: "男", disease: "脊柱骨折", time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, count: 6, downloadNumber: 17, score: 3.6 },
        { fileName: "病例文件6556", patentName: "张三", age: 26, sex: "男", disease: "脊柱骨折", time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, count: 8, downloadNumber: 19, score: '4.0' },
        { fileName: "病例文件6556", patentName: "张三", age: 26, sex: "男", disease: "脊柱骨折", time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, count: 3, downloadNumber: 4, score: 2.8 },
        { fileName: "病例文件6556", patentName: "张三", age: 26, sex: "男", disease: "脊柱骨折", time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, count: 9, downloadNumber: 102, score: '3.0' },
        { fileName: "病例文件6556", patentName: "张三", age: 26, sex: "男", disease: "脊柱骨折", time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, count: 4, downloadNumber: 73, score: 4.2 },
      ],
      uploadTemplates: [
        { fileName: '高血糖通用临床路径模板', department: "内科", disease: "高血糖", uploader: "王先生", count: 10, downloadNumber: 0, no: 3, days: 10, stage: 4, time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 50, score: '5.0' },
        { fileName: '模板2_脊柱骨折内置固定_高血压', department: "脊柱一科", disease: "脊柱骨折", uploader: "王先生", count: 10, downloadNumber: 0, no: 2, days: 9, stage: 5, time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 80, score: 4.8 },
        { fileName: '模板3_脊柱骨折内置固定_静脉血栓', department: "脊柱二科", disease: "脊柱骨折", uploader: "王先生", count: 10, downloadNumber: 9, no: 1, days: 12, stage: 5, time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, score: 1.6 },
        { fileName: '模板3_脊柱骨折内置固定_静脉血栓', department: "脊柱二科", disease: "脊柱骨折", uploader: "王先生", count: 10, downloadNumber: 18, no: 1, days: 12, stage: 5, time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, score: 3.6 },
        { fileName: '模板3_脊柱骨折内置固定_静脉血栓', department: "脊柱二科", disease: "脊柱骨折", uploader: "王先生", count: 10, downloadNumber: 73, no: 1, days: 12, stage: 5, time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, score: 4.8 },
        { fileName: '模板3_脊柱骨折内置固定_静脉血栓', department: "脊柱二科", disease: "脊柱骨折", uploader: "王先生", count: 10, downloadNumber: 85, no: 1, days: 12, stage: 5, time: new Date().format('yyyy-MM-dd hh:mm'), percentage: 100, score: '5.0' },

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
.upload {
  padding: 10px;
  width: 90%;
  margin: auto;
  .el-card {
    width: 100%;
    margin-top: 10px;
    .top {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80px;
      .mydou,
      .myTask,
      .weekTask {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-right: 1px solid gray;
        .count {
          margin-top: 10px;
        }
      }
      .weekTask {
        border-right: 0px solid gray;
      }
    }
    .main {
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .list-title {
          font-weight: bold;
        }
        .wrapper {
          display: flex;
          align-items: center;
          .el-input {
            margin-left: 10px;
          }
        }
      }
      .upload-file {
        width: 100%;
        margin-top: 10px;
      }
      .list {
        margin-top: 10px;
        .list-item {
          display: flex;
          justify-content: space-between;
          height: 60px;
          align-items: center;
          font-size: 14px;
          color: gray;
          .wrapper {
            display: flex;
            align-items: center;
            .img {
              font-size: 14px;
              &:nth-child(odd) {
                background-color: #409eff;
              }

              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              width: 48px;
              height: 48px;
            }
            .intr {
              margin-left: 10px;
              width: 320px;
              .file-name {
                font-weight: bold;
                color: black;
              }
              .base {
                display: flex;
                margin-top: 10px;
                div {
                  margin-right: 2px;
                }
              }
            }
          }

          .uploader {
            width: 120px;
            .name {
              margin-top: 10px;
            }
          }
          .time {
            .begin-time {
              margin-top: 10px;
            }
          }
          .percentage {
            width: 200px;
          }
          .operation {
            display: flex;
            align-items: center;
            color: #409eff;
            /* .edit,
            .more {
              width: 40px;
            } */
            .edit {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;

  font-size: 12px;
}
img {
  width: 18px;
  height: 18px;
}
::v-deep .el-upload {
  height: 40px !important;
  font-size: 12px !important;
}
</style>