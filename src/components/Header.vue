<template>
  <div class="header">
    <div class="wrapper">
      <div class="title">
        <div class="text">智慧医疗平台</div>
      </div>
      <div class="nav-list" @click="navJump">
        <div
          class="nav-item"
          :class="['nav-item',navIndex === -1?'green':'']"
          data-item="-1"
          v-if="type==='0'"
        >个人中心</div>
        <div
          class="nav-item"
          :class="['nav-item',navIndex === 0?'green':'']"
          data-item="0"
          v-if="type==='0'"
        >病人入院</div>
        <div
          class="nav-item"
          :class="['nav-item',navIndex === 1?'green':'']"
          data-item="1"
          v-if="type==='0'"
        >临床路径</div>
        <div class="nav-item" :style="{marginRight:'0px'}" v-if="type==='0'">
          <el-dropdown @command="navJump3">
            <span
              class="el-dropdown-link"
              :style="{color:'white'}"
              :class="['nav-item',navIndex === 2?'green':'']"
              data-item="2"
            >
              模板管理
              <i class="el-icon-arrow-down el-icon--right" :style="{marginLeft:'0px'}"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus" command="2-1">路径模板</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus" command="2-2">医嘱模板</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div
          class="nav-item"
          :class="['nav-item',navIndex === 4?'green':'']"
          data-item="4"
          v-if="type==='1'"
        >异常提醒</div>

        <div
          class="nav-item"
          :class="['nav-item',navIndex === 5?'green':'']"
          data-item="5"
          v-if="type==='1'"
        >患者/医生详情</div>

        <div class="nav-item" :style="{marginRight:'0px'}" v-if="type==='0'">
          <el-dropdown @command="navJump2">
            <span
              class="el-dropdown-link"
              :style="{color:'white'}"
              :class="['nav-item',navIndex === 6?'green':'']"
              data-item="6"
            >
              平安果
              <i class="el-icon-arrow-down el-icon--right" :style="{marginLeft:'0px'}"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-upload" command="6-1">上传文件</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus" command="6-2">所有文件</el-dropdown-item>
              <el-dropdown-item icon="el-icon-plus" command="6-3">已购文件</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div
          class="nav-item"
          :class="['nav-item',navIndex === 7?'green':'']"
          data-item="7"
          v-if="type==='1'"
        >院长视角</div>
        <div
          class="nav-item"
          :class="['nav-item',navIndex === 11?'green':'']"
          data-item="11"
          v-if="type==='1'"
        >违规行为</div>
        <div
          class="nav-item"
          :class="['nav-item',navIndex === 8?'green':'']"
          data-item="8"
          v-if="type==='2'"
        >监管平台</div>
        <div
          class="nav-item"
          :class="['nav-item',navIndex === 9?'green':'']"
          data-item="9"
          v-if="type==='0'"
        >drg管理</div>
      </div>
    </div>

    <div class="btn">
      <!-- <i class="iconfont icon-search"></i> -->
      <!-- <i class="iconfont icon-xian-lingdang"></i> -->
      <!-- <i class="iconfont icon-pingguo" style="color:#E64C65;fontSize:16px"></i> -->
      <i class="iconfont icon-pingguo" ></i>
      <span class="appleColor" :style="{marginRight:'6px',fontSize:'18px'}">{{apple}}</span>

      <img :src="imgSrc" class="img" />
      <span>王医生</span>
    </div>
  </div>
</template>
 
<script>
import { getApple } from '@/api/patient'
export default {
  data () {
    return {
      apple: 6,
      navIndex: -1,
      imgSrc: require('./head.jpg'),
      type: '-1'
    }
  },
  methods: {
    //TODO:跳转路由扩展优化
    navJump (e) {
      // 输出目标
      //alert(e.target.dataset.item)
      if (e.target.dataset.item === '-1') {
        this.$router.push('/center')
      }
      else if (e.target.dataset.item === '0') {
        this.$router.push('/enterHospital')
      } else if (e.target.dataset.item === '1') {
        this.$router.push('/CpPatient')
      }
      // else if (e.target.dataset.item === '2') {
      //   this.$router.push('/cpManagement')
      // }
      else if (e.target.dataset.item === '3') {
        this.$router.push('/orderTemplate')
      } else if (e.target.dataset.item === '4') {
        this.$router.push('/dataError')

      }

      else if (e.target.dataset.item === '5') {
        this.$router.push('/patentInfo')
      }
      // else if (e.target.dataset.item === '6') {
      //   this.$router.push('/uploadFile')
      // }
      else if (e.target.dataset.item === '7') {
        this.$router.push('/yuanZhang')
      }
      else if (e.target.dataset.item === '8') {
        window.location.href = 'http://82.157.160.85:84'

      }
      else if (e.target.dataset.item === '9') {
        this.$router.push('/drg')
      }
      else if (e.target.dataset.item === '10') {
        this.$router.push('/drgManagement')
      }
      else if (e.target.dataset.item === '11') {
        this.$router.push('/feixing')
      }



    },
    navJump2 (e) {
      if (e === '6-1') {

        this.$router.push('/uploadFile')
      }
      else if (e === '6-2') {

        this.$router.push('/allFile')
      }
      else if (e === '6-3') {

        this.$router.push('/myfile')
      }
    },

    navJump3 (e) {
      if (e === '2-1') {

        this.$router.push('/cpManagement')
      }
      else if (e === '2-2') {

        this.$router.push('/orderTemplate')
      }

    }

  },
  watch: {
    //TODO:跳由监听待优化
    $route: {
      handler: function (newV) {
        console.log('newV', newV);
        if (newV.name === 'enterHospital') {
          this.navIndex = 0
        } else if (newV.name === 'cpPatient') {
          this.navIndex = 1

        } else if (newV.name === 'cpManagement') {
          this.navIndex = 2

        } else if (newV.name === 'orderTemplate') {
          this.navIndex = 2

        }
        else if (newV.name === 'dataError') {
          this.navIndex = 4

        }
        else if (newV.name === 'patentInfo') {
          this.navIndex = 5

        }
        else if (newV.name === 'uploadFile') {
          this.navIndex = 6

        }
        else if (newV.name === 'allFile') {
          this.navIndex = 6

        }
        else if (newV.name === 'myFile') {
          this.navIndex = 6

        }
        else if (newV.name === 'yuanZhang') {
          this.navIndex = 7

        }
        else if (newV.name === 'drg') {
          this.navIndex = 9

        }
        else if (newV.name === 'drgManagement') {
          this.navIndex = 10

        }
        else if (newV.name === 'center') {
          this.navIndex = -1

        }

      }



    },
    immediate: true
  },
  mounted () {
    this.type = localStorage.getItem('type') || '0'
    const userId = localStorage.getItem('userId') || '1'
    getApple(+userId).then(res => {
      console.log('apple', res);
      this.apple = res
    })
  }

}

</script>
 
<style lang="scss" scoped>
.header {
  height: 60px;
  background: #001529;
  display: flex;
  align-items: center;
  color: white;
  width: 100%;
  justify-content: space-between;
  .wrapper {
    display: flex;
    align-items: center;
    margin-left: 2%;

    .title {
      display: flex;
      align-items: center;
      font-size: 18px;
      letter-spacing: 1px;
      // .point {
      //   margin-left: 20px;

      //   width: 6px;
      //   border-radius: 50%;
      //   height: 6px;
      //   background: white;
      // }
      .text {
        margin-left: 20px;
      }
    }
    .nav-list {
      margin-left: 80px;
      display: flex;
      font-size: 14px;
      align-items: center;
      .nav-item {
        margin-right: 40px;
        cursor: pointer;
        &.green {
          color: #0be9f0;
        }
      }
    }
  }
  .btn {
    margin-right: 20px;
    display: flex;
    align-items: center;
    .img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 5px;
    }
    i {
      margin-right: 6px;
    }
  }
}
// .green {
//   color: #0be9f0 !important;
// }
::v-deep .iconfont {
  color:#E64C65;
  font-size: 24px !important;
}
</style>