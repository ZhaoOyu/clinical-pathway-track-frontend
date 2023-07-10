<template>
  <div class="inner-wrapper">
    <div class="wrapper">
      <div class="error-status">
        <div class="content-wrapper">
          <div class="selects">
            <div class="input-wrapper">
              <el-input v-model="name" size="mini" placeholder="姓名" clearable></el-input>

              <el-button
                type="primary"
                icon="el-icon-search"
                size="mini"
                @click="search"
                :style="{marginLeft:'10px'}"
              >搜索</el-button>
            </div>
            <div class="radio">
              <el-radio-group v-model="type" @change="radioChange" size="mini">
                <el-radio-button label="患者"></el-radio-button>
                <el-radio-button label="医生"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="list" v-if="type==='患者'">
            <div class="list-item gray">
              <div class="txId">姓名</div>
              <div class="date">性别</div>

              <div class="user">医院账号</div>
              <div class="status">状态</div>
            </div>
            <div
              class="list-item"
              v-for="(item,index) in list"
              :key="index"
              @click="handleClick(item)"
            >
              <div class="txId overflow">{{item.name}}</div>
              <div class="date overflow">{{item.gender}}</div>
              <div class="user overflow">{{item.hospitalNo}}</div>
              <div class="status overflow">
                <el-tag
                  size="mini"
                  :type="item.status === '就诊中'?'warning': 'primary'"
                  effect="dark"
                >{{item.status}}</el-tag>
              </div>
            </div>
          </div>
          <div class="list" v-if="type==='医生'">
            <div class="list-item gray">
              <div class="txId">姓名</div>
              <div class="date">性别</div>

              <div class="user">平安果数</div>
              <div class="status">状态</div>
            </div>
            <div
              class="list-item"
              v-for="(item,index) in doctors"
              :key="index"
              @click="handleClickDoctor(item)"
            >
              <div class="txId overflow">{{item.name}}</div>
              <div class="date overflow">{{item.gender}}</div>
              <div class="user overflow">
                <i
                  class="el-icon-orange orange"
                  :style="{marginRight:'2px',fontSize:'12px',marginLeft:'4px'}"
                ></i>
                <span class="orange" :style="{marginRight:'6px',fontSize:'12px'}">{{item.count}}</span>
              </div>
              <div class="status overflow">
                <el-tag
                  size="mini"
                  :type="item.status === '在门诊部'?'warning': item.status === '在住院部'?'primary':'danger'"
                  effect="dark"
                >{{item.status}}</el-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="paper-detail">
        <doctor-detail :doctor="doctor" v-if="clickItem==='医生'"></doctor-detail>
        <department-detail v-if="clickItem===''"></department-detail>
        <patent-detail :patent="patent" v-if="clickItem==='患者'"></patent-detail>
      </div>
    </div>
  </div>
</template>
 
<script>
import patentDetail from './PatentDetail.vue'

// import { getErrorDetailData } from '@/service/api'
import { patentData, doctors } from '../mock.js'
import DepartmentDetail from './DepartmentDetail.vue'
import DoctorDetail from './DoctorDetail.vue'

export default {
  components: {
    patentDetail,
    DepartmentDetail,
    DoctorDetail
  },
  data () {
    return {
      name: "",
      chartOptions: {},
      paperId: 0,
      value: '',
      list: [],
      patent: null,
      canInterval: true,
      department: '',
      errorType: "",
      type: "患者",
      clickItem: "",
      doctor: null,
      doctors: []
    }
  },
  methods: {

    handleClick (patent) {
      this.patent = patent
      this.clickItem = '患者'
    },
    handleClickDoctor (doctor) {
      this.doctor = doctor
      this.clickItem = '医生'

    },
    formateDate (date) {
      console.log('date', date);
      return date.toLocaleString('en-GB', { timeZone: 'UTC' })
    },
    radioChange (e) {
      if (e === "患者") {
        this.getData()
        this.patent = this.list[0]
        this.clickItem = '患者'

      } else {
        this.doctors = doctors
        this.clickItem = '医生'
        this.doctor = this.doctors[0]
      }
    },
    search () {
      if (this.name !== '') {
        this.list = patentData.filter(item => {

          return item.name === this.name
        })
      } else {
        this.list = patentData
      }

    },
    async getData () {
      this.list = patentData.slice(0, 10)
    }
  },

  async mounted () {
    const department = this.$route.query.department || '外科'
    this.department = department

    this.list = patentData.slice(0, 10)
    this.patent = this.list[0]



  }



}
</script>
 
<style lang="scss" scoped>
.inner-wrapper {
  width: 100%;
  height: 100%;
  background: #0f1c39;
  .title {
    margin-left: 40px;
    padding-left: 20px;
    box-sizing: border-box;
    font-size: 20px;
    color: white;
    width: 240px;
    height: 10%;
    display: flex;
    align-items: center;
  }
  .wrapper {
    display: flex;
    height: 90%;
    display: flex;
    padding-top: 10px;
    box-sizing: border-box;
    .error-status {
      width: 50%;
      margin-left: 40px;
      padding-left: 20px;
      padding-right: 20px;
      box-sizing: border-box;

      background: rgb(15, 28, 54);
      height: calc(100% - 20px);
      /*  height: 100%; */
      .content-wrapper {
        padding-top: 0px;
        padding-left: 0px;
        .selects {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .input-wrapper {
            display: flex;
          }
        }
        .list {
          background-color: #0f1c39;
          padding-left: 10px;
          box-sizing: border-box;
          height: 80%;
          color: gray;
          margin-top: 10px;
          .list-item {
            display: flex;
            border-bottom: 1px solid gray;
            height: 10%;
            box-sizing: border-box;
            padding: 16px 20px 16px 0;
            align-items: center;
            .txId,
            .user,
            .date,
            .status {
              color: white;
              //flex: 1;
              // height: 12.5%;

              text-align: center;
              font-size: 14px;
              width: 20%;
            }
            .txId {
              width: 20%;
            }
            .status {
              width: 20%;
            }
            .user {
              width: 40%;
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
          }
        }
      }
    }
    .paper-detail {
      width: 50%;

      margin-left: 1%;
      padding-left: 20px;
      margin-right: 20px;
      padding-right: 20px;
      box-sizing: border-box;

      background: #0f1c39;
      height: calc(100% - 20px);
      /* height: 100%; */
    }
  }

  .echarts {
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang="scss" scoped>
.el-date-editor {
  background-color: #3e495d;
}
::v-deep .el-range-input {
  background-color: #3e495d !important;
  border: none;
}

::v-deep .el-range-separator {
  color: #c0c4cc;
}
::v-deep .el-input__inner {
  background-color: #3e495d;
  color: white;
  border: none;
}
::v-deep .el-radio-button__inner {
  background-color: #3e495d;
  border: none;
  color: #c0c4cc;
}
::v-deep.el-radio-button__inner {
  border-left: none !important;
}
::v-deep.el-input__inner {
  color: white;
  /* width: 140px; */
}
::v-deep .el-dialog__body {
  height: 400px;
}
</style>