<template>
  <div class="user-center">
    <div class="top">
      <div class="left" @click="dialogVisible = true">
        <el-card>
          <div class="wrapper">
            <div class="user-left">
              <div class="pic">
                <img :src="doctorInfo[0].picture" class="avatual" v-if="doctorInfo[0].picture" />
                <input type="file" class="upload" accept="image/*" @change="uploadHead" @click.stop />
              </div>
              <div class="chinese-name" v-if="doctorInfo[0].doctorName">{{ doctorInfo[0].doctorName }}</div>
              <div class="english-name" v-if="doctorInfo[0].duty">职务:{{ doctorInfo[0].duty }}</div>
              <div class="english-name" v-if="doctorInfo[0].department">所属科室:{{ doctorInfo[0].department }}</div>
              <div class="english-name" v-if="doctorInfo[0].phone">联系方式:{{ doctorInfo[0].phone }}</div>
              <div class="english-name" v-if="doctorInfo[0].company">所属单位:{{ doctorInfo[0].company }}</div>
            </div>
            <div class="user-right">
              <div class="head">
                <div class="head-left">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiangbei-" />
                  </svg>
                  <span class="title">个人荣誉</span>
                </div>
                <div class="head-right">
                  <span class="more">更多></span>
                </div>
              </div>
              <div class="list">
                <div class="list-title">
                  <div class="department">荣誉名称</div>
                  <div class="earlyWarningMonthly">获得时间</div>
                  <div class="earlyWarningNumberToday">贡献情况</div>
                </div>
                <div class="list-item" v-for="(item, index) in doctorHonor" :key="index">
                  <div class="department">{{ item.honorName }}</div>
                  <div class="earlyWarningMonthly overflow">
                    {{ item.time }}
                  </div>
                  <div class="earlyWarningNumberToday overflow">
                    <i class="iconfont icon-erweima"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="right">
        <el-card>
          <div class="wrapper" :style="{ color: '#67C23A' }">
            <div class="card-left">
              <div class="title">用户等级</div>
              <div class="number">{{ doctorInfo[0].grade }}</div>
            </div>
            <div class="card-right">
              <i class="iconfont icon-211yonghu_dengji2"></i>
            </div>
          </div>
        </el-card>
        <el-card>
          <div class="wrapper" :style="{ color: '#E64C65' }">
            <div class="card-left">
              <div class="title">平安果数量</div>
              <div class="number">{{ doctorInfo[0].apple }}</div>
            </div>
            <div class="card-right">
              <i class="iconfont icon-pingguo"></i>
            </div>
          </div>
        </el-card>
        <el-card>
          <div class="wrapper" :style="{ color: '#ffc20e' }">
            <div class="card-left">
              <div class="title">预警数量</div>
              <div class="number">{{ doctorInfo[0].warning }}</div>
            </div>
            <div class="card-right">
              <i class="iconfont icon-kucunyujing"></i>
            </div>
          </div>
        </el-card>
        <el-card>
          <div class="wrapper" :style="{ color: '#FF3A30' }">
            <div class="card-left">
              <div class="title">
                <span>分享文件热度</span>
                <el-popover placement="right" width="100" trigger="hover">
                  <div>近七天文件下载量</div>
                  <i class="el-icon-warning-outline" style="marginleft: 4px; fontsize: 16px; cursor: pointer"
                    slot="reference"></i>
                </el-popover>
              </div>
              <div class="number">{{ doctorInfo[0].file }}</div>
            </div>
            <div class="card-right">
              <i class="iconfont icon-redu"></i>
            </div>
          </div>
        </el-card>
        <el-card>
          <div class="wrapper" :style="{ color: '#E38c09' }">
            <div class="card-left">
              <div class="title">DRG低/高倍率</div>
              <div class="number">{{ doctorInfo[0].drg }}%</div>
            </div>
            <div class="card-right">
              <i class="iconfont icon-weigui"></i>
            </div>
          </div>
        </el-card>
        <el-card>
          <div class="wrapper" :style="{ color: '#409EFF' }">
            <div class="card-left">
              <div class="title">绩效得分</div>
              <div class="number">{{ doctorInfo[0].performance }}</div>
            </div>
            <div class="card-right">
              <i class="iconfont icon-jixiao"></i>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <div class="middle">
      <div class="lchart">
        <div class="first">
          <el-card class="all-rate-wrapper">
            <all-rate></all-rate>
          </el-card>
          <el-card class="drg-wrapper">
            <drg-money></drg-money>
          </el-card>
        </div>
        <div class="second">
          <el-card class="file-share">
            <!-- <file-share></file-share> -->
            <new-file-share></new-file-share>
          </el-card>
          <el-card class="error">
            <error-warning></error-warning>
          </el-card>
        </div>
      </div>
      <div class="rchart">
        <el-card class="list2">
          <div class="wrapper">
            <div class="title">平安果收支情况</div>
            <div class="radio">
              <el-radio-group v-model="type" size="mini" @change="handleChangeType">
                <el-radio-button label="全部"></el-radio-button>
                <el-radio-button label="文件共享"></el-radio-button>
                <el-radio-button label="DRG控费"></el-radio-button>
                <el-radio-button label="异常预警"></el-radio-button>
              </el-radio-group>
            </div>
            <div class="list-title">
              <div class="department">事件名称</div>
              <div class="department">数量变化</div>
              <div class="earlyWarningMonthly">发生时间</div>
            </div>
            <div class="list-item" v-for="(item, index) in records" :key="index">
              <div class="department">{{ item.name }}</div>
              <div class="earlyWarningMonthly overflow">{{ item.count }}</div>
              <div class="earlyWarningNumberToday overflow">
                {{ item.time }}
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
 
<script>
import AllRate from "./AllRate.vue";
import DrgMoney from "./DrgMoney.vue";
import FileShare from "./FileShare.vue";
import ErrorWarning from "./ErrorWarning.vue";
import NewFileShare from "./NewFileShare.vue";
import {getDoctorInfo,getDoctorHonor,getDoctorApple,getDoctorWarning} from "./../../api/center.js"
export default {
  components: {
    AllRate,
    DrgMoney,
    FileShare,
    NewFileShare,
    ErrorWarning,
  },
  data() {
    return {
      doctorInfo: [],
      doctorHonor: [],
      doctorApple: [],
      doctorWarning: [],
      records: [],
      type: "全部",
      list: [
        { name: "案例优秀奖", time: "2022-06-25", src: "" },
        { name: "案例卓越奖", time: "2022-06-27", src: "" },
        { name: "质量安全奖", time: "2022-06-29", src: "" },
        // { name: "质量安全奖", time: "2022-06-29", src: "" },
        // { name: "质量安全奖", time: "2022-06-29", src: "" },
      ],
    };
  },
  methods: {
    uploadHead(e) {
      //TODO:上传图片
    },
    addGroup() { },
    deleteGroup(index) { },
    handleUpdate() { },
    handleChangeType(type) {//生成在不同状态下的平安果收支情况内容
      this.records = []
      if (type === "全部") {
        for (let i = 0; i < this.doctorApple.length; i++) {
            this.records.push({name: this.doctorApple[i].type,count: this.doctorApple[i].number,time: this.doctorApple[i].time});
        }
      } else if (type === "文件共享") {
        for (let i = 0; i < this.doctorApple.length; i++) {
          if (this.doctorApple[i].type === "文件共享") {
            this.records.push({name: this.doctorApple[i].type,count: this.doctorApple[i].number,time: this.doctorApple[i].time});


          }
        }
      } else if (type === "DRG控费") {
        for (let i = 0; i < this.doctorApple.length; i++) {
          if (this.doctorApple[i].type === "DRG控费") {
            this.records.push({name: this.doctorApple[i].type,count: this.doctorApple[i].number,time: this.doctorApple[i].time});


          }
        }
      } else if (type === "异常预警") {
        for (let i = 0; i < this.doctorApple.length; i++) {
          if (this.doctorApple[i].type === "异常预警") {
            this.records.push({name: this.doctorApple[i].type,count: this.doctorApple[i].number,time: this.doctorApple[i].time});


          }
        }
      }
    }
  },
  watch:{
    doctorApple:{//在doctorApple取得后，渲染
      handler(){
        this.handleChangeType(this.type)
      }
    }
  },
  //mounted() {
  created() {
    //获取医生信息
    //医生数据
    getDoctorInfo("王医生").then(res=>{
      this.doctorInfo = res
    }
    )
    //医生荣誉数据
    getDoctorHonor("王医生").then(res=>{
      this.doctorHonor = res
    }
    )
    //医生平安果情况
    getDoctorApple("王医生").then(res=>{
      this.doctorApple = res
    }
    )
    //医生预警
    getDoctorWarning("王医生").then(res=>{
      this.doctorWarning = res
    }
    )
    //records数据的获取
    
  },
};
</script>
 
<style lang="scss" scoped>
.user-center {
  width: 100%;
  height: 100%;
  margin-left: 0.5%;
  margin-top: 1%;
  //margin: 1% 2% ;
  // margin-left: 2%;
  // margin-top: 20px;

  .top {
    display: flex;
    height: 36.5%;

    .left {
      width: 40%;
      // height: 200px;
      height: 95%;
      cursor: pointer;

      .el-card {
        width: 100%;
        height: 100%;
        overflow: auto;

        .el-card__body {
          padding: 10px;

          .wrapper {
            display: flex;

            .user-left {
              width: 40%;
              display: flex;
              flex-direction: column;
              align-items: center;

              .pic {
                position: relative;
                cursor: pointer;

                .avatual {
                  width: 60px;
                  height: 60px;
                  border-radius: 50%;
                }

                .upload {
                  opacity: 0;
                  position: absolute;
                  top: 0px;
                  left: 0;
                  width: 60px;
                  height: 60px;
                  border-radius: 50%;
                }
              }

              .chinese-name {
                font-size: 14px;
                margin-top: 10px;
                font-weight: bold;
              }

              .english-name {
                font-size: 12px;
                margin-top: 10px;
              }
            }

            .user-right {
              width: 60%;
              padding-left: 4px;
              box-sizing: border-box;
              font-size: 13px;

              .head {
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .icon {
                  height: 24px;
                  width: 24px;
                }

                .title {
                  font-weight: bold;
                  margin-left: 4px;
                }

                .more {
                  font-weight: bold;
                  margin-right: 20px;
                }
              }

              .list {

                //overflow: auto;
                .list-title {
                  font-weight: bold;
                }

                .list-title,
                .list-item {
                  display: flex;
                  height: 44px;

                  div {
                    width: 33%;
                    display: flex;
                    align-items: center;

                    .icon-erweima {
                      font-size: 32px;
                    }
                  }

                  .earlyWarningNumberToday {
                    align-items: center;
                    justify-content: center;
                  }
                }
              }
            }
          }
        }
      }
    }

    .right {
      margin-left: 20px;

      width: 64%;
      display: flex;
      height: 220px;
      flex-wrap: wrap;

      .el-card {
        width: 32%;
        margin-right: 8px;

        &:nth-child(1) {
          margin-bottom: 8px;
        }

        &:nth-child(2) {
          margin-bottom: 8px;
        }

        &:nth-child(3) {
          margin-bottom: 8px;
        }

        .wrapper {
          display: flex;

          .card-left {
            flex: 1 0 60%;
            text-align: center;
            font-size: 14px;

            .number {
              margin-top: 20px;
              font-size: 18px;
              font-weight: bold;
            }

            .title {}
          }

          .card-right {
            flex: 1 0 40%;
            display: flex;
            align-items: center;

            i {
              font-size: 30px;
            }
          }
        }
      }
    }
  }

  .middle {
    width: 100%;
    height: calc(100% - 240px);
    height: 800px;
    display: flex;

    .lchart {
      width: 70%;

      .first {
        width: 100%;
        display: flex;
        height: 400px;

        .all-rate-wrapper {
          width: 52%;
          height: 400px;
          margin-right: 12px;
          box-sizing: border-box;
        }

        .drg-wrapper {
          margin-left: 12px;
          box-sizing: border-box;
          width: 48%;
          height: 400px;
        }
      }

      .second {
        width: 100%;
        display: flex;
        height: 400px;
        margin-top: 20px;

        .file-share {
          width: 52%;
          height: 400px;
          margin-right: 12px;
          box-sizing: border-box;
        }

        .error {
          margin-left: 12px;
          box-sizing: border-box;
          width: 48%;
          height: 400px;
        }
      }
    }

    .rchart {
      width: 30%;
      height: 800px;
      margin-left: 10px;

      .list2 {
        width: 100%;
        height: 100%;

        .title {
          font-weight: bold;
          font-size: 18px;
          padding-left: 4px;
          align-items: center;
        }

        .radio {
          margin-top: 10px;
        }

        .list-title {
          display: flex;
          margin-top: 10px;
          border-bottom: 1px solid gray;
          // height: 12.5%;
          padding: 10px 20px 10px 0;
          align-items: center;

          div {
            flex: 1;
          }

          .department {
            color: #168ce3;
            //flex: 1;
            // height: 12.5%;

            text-align: center;
            font-size: 13px;
          }

          .earlyWarningMonthly {
            color: #168ce3;
            //flex: 1;
            // height: 12.5%;

            text-align: center;
            font-size: 13px;
          }

          .earlyWarningNumberToday {
            color: #168ce3;
            //flex: 1;
            // height: 12.5%;

            text-align: center;
            font-size: 13px;
          }

          .timeUpdate {
            color: #168ce3;
            //flex: 1;
            // height: 12.5%;

            text-align: center;
            font-size: 13px;
          }

          .dutyDirectorToday {
            text-align: center;
            color: #168ce3;

            font-size: 13px;
          }

          .numberOfEmployeesToday {
            text-align: center;
            font-size: 13px;
            color: #168ce3;
          }

          .overflow {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          /* &:nth-child(odd) {
        background: #f2f2f2;
      }
      &:nth-child(even) {
        background: white;
      } */
          &.gray {
            color: gray;
          }
        }

        .list-item {
          display: flex;
          // border-bottom: 1px solid gray;
          // height: 12.5%;
          padding: 6px 20px 6px 0;
          align-items: center;

          div {
            flex: 1;
          }

          .department {
            //flex: 1;
            // height: 12.5%;

            text-align: center;
            font-size: 10px;
          }

          .earlyWarningMonthly {
            //flex: 1;
            // height: 12.5%;

            text-align: center;
            font-size: 10px;
          }

          .earlyWarningNumberToday {
            // height: 12.5%;

            text-align: center;
            font-size: 10px;
          }

          .timeUpdate {
            //flex: 1;
            // height: 12.5%;

            text-align: center;
            font-size: 10px;
          }

          .dutyDirectorToday {
            text-align: center;

            font-size: 10px;
          }

          .numberOfEmployeesToday {
            text-align: center;
            font-size: 10px;
          }

          .overflow {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          /* &:nth-child(odd) {
        background: #f2f2f2;
      }
      &:nth-child(even) {
        background: white;
      } */
          &.gray {
            color: gray;
          }
        }
      }
    }
  }
}
</style>
<style scoped lang='scss'>
::v-deep .middle .el-card__body {
  width: 100%;
  height: 100%;
  padding: 10px !important;
}

.change-message {

  .name,
  .tel,
  .work,
  .sex {
    span {
      display: inline-block;
      width: 80px;
    }

    margin-bottom: 10px;
    display: flex;
  }
}

.work {
  .group {
    display: flex;
  }
}
</style>