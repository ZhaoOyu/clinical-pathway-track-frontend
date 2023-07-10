<template>
  <div class="user-center">
    <div class="top">
      <div class="left" @click="dialogVisible = true">
        <el-card>
          <div class="wrapper">
            <div class="user-left">
              <div class="pic">
                <img :src="imgSrc" class="avatual" />
                <input
                  type="file"
                  class="upload"
                  accept="image/*"
                  @change="uploadHead"
                  @click.stop
                />
              </div>
              <div class="chinese-name">{{ chineseName }}</div>
              <div class="english-name">职务:{{ work }}</div>
              <div class="english-name">所属科室:{{ department }}</div>
              <div class="english-name">联系方式:{{ telephone }}</div>
              <div class="english-name">所属单位:{{ organzation }}</div>
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
                <div
                  class="list-item"
                  v-for="(item, index) in list"
                  :key="index"
                >
                  <div class="department">{{ item.name }}</div>
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
              <div class="number">钻石</div>
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
              <div class="number">64</div>
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
              <div class="number">12</div>
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
                  <i
                    class="el-icon-warning-outline"
                    style="marginleft: 4px; fontsize: 16px; cursor: pointer"
                    slot="reference"
                  ></i>
                </el-popover>
              </div>
              <div class="number">63</div>
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
              <div class="number">5.6%</div>
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
              <div class="number">93</div>
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
              <el-radio-group
                v-model="type"
                size="mini"
                @change="handleChangeType"
              >
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
            <div
              class="list-item"
              v-for="(item, index) in records"
              :key="index"
            >
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
      records: [],
      type: "全部",
      list: [
        { name: "案例优秀奖", time: "2022-06-25", src: "" },
        { name: "案例卓越奖", time: "2022-06-27", src: "" },
        { name: "质量安全奖", time: "2022-06-29", src: "" },
        // { name: "质量安全奖", time: "2022-06-29", src: "" },
        // { name: "质量安全奖", time: "2022-06-29", src: "" },
      ],
      imgSrc: require("../head.jpg"),
      chineseName: "王医生",
      work: "主任医师",
      department: "外科",
      email: "577486671@qq.com",
      telephone: "1865230045",
      organzation: "湖北六七二骨科医院",
      achvCount: 29,
      exceptionCount: 6,
      huiyiCount: 6,
      patentCount: 1,
      qikanCount: 4,
      softwareCount: 2,
    };
  },
  methods: {
    uploadHead(e) {
      //TODO:上传图片
    },
    addGroup() {},
    deleteGroup(index) {},
    handleUpdate() {},
    handleChangeType(type) {
      if (type === "全部") {
        this.records = [
          { name: "每日签到", count: "64(+1)", time: "2022-06-30" },
          { name: "共享病例文件4", count: "63(+14)", time: "2022-06-30" },
          { name: "DRG费用超标", count: "49(-10)", time: "2022-06-30" },
          { name: "路径数据异常", count: "55(-20)", time: "2022-06-30" },
          { name: "邀请好友", count: "67(+20)", time: "2022-06-30" },
          { name: "DRG费用达标", count: "47(+10)", time: "2022-06-30" },
          { name: "共享临床路径1", count: "42(+12)", time: "2022-06-30" },
          { name: "每日签到", count: "40(+1)", time: "2022-06-30" },
          { name: "路径顺序异常", count: "39(-20)", time: "2022-06-30" },
          { name: "每日签到", count: "53(+1)", time: "2022-06-30" },
          { name: "路径数据异常", count: "55(-20)", time: "2022-06-30" },
          { name: "邀请好友", count: "67(+20)", time: "2022-06-30" },
          { name: "DRG费用盈利", count: "47(+10)", time: "2022-06-30" },
          { name: "共享临床路径3", count: "42(+12)", time: "2022-06-30" },
          { name: "路径数据异常", count: "55(-20)", time: "2022-06-30" },
          { name: "邀请好友", count: "67(+20)", time: "2022-06-30" },
          { name: "DRG费用盈利", count: "47(+10)", time: "2022-06-30" },
          { name: "共享临床路径0", count: "42(+21)", time: "2022-06-30" },
          { name: "DRG费用盈利", count: "47(+10)", time: "2022-06-30" },
          { name: "共享临床路径3", count: "42(+24)", time: "2022-06-30" },
          { name: "路径数据异常", count: "55(-20)", time: "2022-06-30" },
          { name: "邀请好友", count: "67(+20)", time: "2022-06-30" },
          { name: "DRG费用盈利", count: "47(+10)", time: "2022-06-30" },
          { name: "共享临床路径7", count: "42(+19)", time: "2022-06-30" },
          { name: "DRG费用盈利", count: "47(+10)", time: "2022-06-30" },
          { name: "共享临床路径4", count: "42(+14)", time: "2022-06-30" },
          { name: "路径数据异常", count: "55(-20)", time: "2022-06-30" },
          { name: "邀请好友", count: "67(+20)", time: "2022-06-30" },
          { name: "DRG费用盈利", count: "47(+10)", time: "2022-06-30" },
          { name: "共享临床路径2", count: "42(+22)", time: "2022-06-30" },
        ];
      } else if (type === "文件共享") {
        this.records = [
          { name: "共享病例文件4", count: "63(+14)", time: "2022-06-30" },
          { name: "共享病例文件3", count: "15(+12)", time: "2022-06-29" },
          { name: "共享病例文件2", count: "46(+16)", time: "2022-06-27" },
          { name: "共享病例文件4", count: "13(+21)", time: "2022-06-26" },
          { name: "共享路径模板3", count: "49(+16)", time: "2022-06-24" },
          { name: "共享路径模板1", count: "46(+26)", time: "2022-06-22" },
          { name: "共享路径模板2", count: "15(+49)", time: "2022-06-28" },
          { name: "共享病例文件5", count: "46(+89)", time: "2022-06-27" },
          { name: "共享路径模板3", count: "8(+46)", time: "2022-06-27" },
          { name: "共享路径模板10", count: "46(+26)", time: "2022-06-26" },
          { name: "共享病例文件1", count: "79(+23)", time: "2022-06-26" },
          { name: "共享路径模板3", count: "15(+14)", time: "2022-06-29" },
          { name: "共享病例文件6", count: "47(+16)", time: "2022-06-29" },
          { name: "共享路径模板8", count: "49(+18)", time: "2022-06-28" },
          { name: "共享病例文件6", count: "46(+24)", time: "2022-06-28" },
          { name: "共享病例文件2", count: "23(+26)", time: "2022-06-24" },
          { name: "共享路径模板11", count: "28(+32)", time: "2022-06-23" },
        ];
      } else if (type === "DRG控费") {
        this.records = [
          { name: "DRG费用超标", count: "49(-10)", time: "2022-06-29" },
          { name: "DRG费用达标", count: "42(+10)", time: "2022-06-29" },
          { name: "DRG费用达标", count: "36(+10)", time: "2022-06-29" },
          { name: "DRG费用超标", count: "38(-10)", time: "2022-06-29" },
          { name: "DRG费用超标", count: "24(-10)", time: "2022-06-29" },
        ];
      } else if (type === "异常预警") {
        this.records = [
          { name: "路径数据异常", count: "55(-50)", time: "2022-06-29" },
          { name: "费用异常", count: "49(-20)", time: "2022-06-27" },
          { name: "开单异常", count: "36(-5)", time: "2022-06-27" },
          { name: "路径顺序异常", count: "47(-20)", time: "2022-06-26" },
          { name: "路径数据异常", count: "32(-20)", time: "2022-06-24" },
          { name: "时间异常", count: "26(-10)", time: "2022-06-29" },
        ];
      }
    },
  },
  //mounted() {
  created() {
    //获取医生信息
    
    //records数据的获取
    this.records = [
      { name: "每日签到", count: "64(+1)", time: "2022-06-29" },
      { name: "共享病例文件4", count: "63(+14)", time: "2022-06-29" },
      { name: "DRG费用超标", count: "49(-6)", time: "2022-06-29" },
      { name: "路径数据异常", count: "55(-12)", time: "2022-06-29" },
      { name: "邀请好友", count: "67(+20)", time: "2022-06-29" },
      { name: "DRG费用盈利", count: "47(+5)", time: "2022-06-29" },
      { name: "共享临床路径1", count: "42(+2)", time: "2022-06-29" },
      { name: "每日签到", count: "40(+1)", time: "2022-06-28" },
      { name: "路径顺序不当", count: "39(-14)", time: "2022-06-28" },
      { name: "每日签到", count: "53(+1)", time: "2022-06-27" },
      { name: "路径数据异常", count: "55(-12)", time: "2022-06-27" },
      { name: "邀请好友", count: "67(+20)", time: "2022-06-27" },
      { name: "DRG费用盈利", count: "47(+5)", time: "2022-06-27" },
      { name: "共享临床路径3", count: "42(+2)", time: "2022-06-27" },
      { name: "路径数据异常", count: "55(-12)", time: "2022-06-26" },
      { name: "邀请好友", count: "67(+20)", time: "2022-06-26" },
      { name: "DRG费用盈利", count: "47(+5)", time: "2022-06-26" },
      { name: "共享临床路径0", count: "42(+2)", time: "2022-06-26" },
      { name: "DRG费用盈利", count: "47(+5)", time: "2022-06-25" },
      { name: "共享临床路径3", count: "42(+2)", time: "2022-06-25" },
      { name: "路径数据异常", count: "55(-12)", time: "2022-06-25" },
      { name: "邀请好友", count: "67(+20)", time: "2022-06-25" },
      { name: "DRG费用盈利", count: "47(+5)", time: "2022-06-24" },
      { name: "共享临床路径7", count: "42(+2)", time: "2022-06-24" },
      { name: "DRG费用盈利", count: "47(+5)", time: "2022-06-24" },
      { name: "共享临床路径4", count: "42(+2)", time: "2022-06-23" },
      { name: "路径数据异常", count: "55(-12)", time: "2022-06-23" },
      { name: "邀请好友", count: "67(+20)", time: "2022-06-23" },
      { name: "DRG费用盈利", count: "47(+5)", time: "2022-06-22" },
      { name: "共享临床路径2", count: "42(+2)", time: "2022-06-21" },
    ];
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
          padding: 10px ;
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
            .title {
            }
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