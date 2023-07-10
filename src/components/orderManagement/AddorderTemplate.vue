<template>
  <div class="add-order">
    <div class="head">
      <div class="title" v-if="addNoUpdate">增加医嘱</div>
      <div class="title" v-else>更新医嘱</div>
    </div>
    <div class="main">
      <div class="left">
        <div class="orders">
          <div class="nav">
            <order-search @search="handleSeach"></order-search>

            <el-menu default-active="1" class="el-menu-vertical-demo">
              <el-menu-item v-for="(item,index) in orderTypes" :key="index" :index="`${index}`">
                <i :class="item.icon"></i>
                <span slot="title">{{item.label}}</span>
              </el-menu-item>
            </el-menu>
          </div>
          <div class="list" ref="list">
            <div
              class="list-item"
              v-for="(item,index) in orderLists"
              :key="index"
              @click="e=>handleClickItem(e,index)"
            >{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="right">
        <el-card class="detail">
          <div class="inner">
            <div class="left">
              <el-form size="mini">
                <el-form-item label="期效">
                  <el-select v-model="formDetail.timeType" size="mini">
                    <el-option label="临时医嘱" :value="0"></el-option>
                    <el-option label="长期医嘱" :value="1"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="内容">
                  <el-input v-model="formDetail.content"></el-input>
                </el-form-item>
                <el-form-item label="总量">
                  <!-- <el-select v-model="formDetail.allCount" size="mini">
                    <el-option label="一次" value="1"></el-option>
                    <el-option label="两次" value="2"></el-option>
                    <el-option label="三次及以上" value="3"></el-option>
                  </el-select>-->
                  <el-input size="mini" v-model="formDetail.totalUse"></el-input>
                </el-form-item>
                <el-form-item label="单量">
                  <el-input size="mini" v-model="formDetail.everyUse"></el-input>
                </el-form-item>
                <el-form-item label="频率">
                  <el-select v-model="formDetail.execFreq" size="mini">
                    <el-option label="每天两次" value="每天两次"></el-option>
                    <el-option label="每天三次" value="每天三次"></el-option>
                    <el-option label="每天四次" value="每天四次"></el-option>
                    <el-option label="每天清晨" value="每天清晨"></el-option>
                    <el-option label="每天上午一次" value="每天上午一次"></el-option>
                    <el-option label="每天上午一次" value="每天上午一次"></el-option>
                    <el-option label="每天晚上一次" value="每天晚上一次"></el-option>
                    <el-option label="隔日一次" value="隔日一次"></el-option>
                    <el-option label="三天一次" value="三天一次"></el-option>
                    <el-option label="每周一次" value="每周一次"></el-option>
                    <el-option label="每周二次" value="每周二次"></el-option>
                    <el-option label="每周三次" value="每周三次"></el-option>
                    <el-option label="每小时一次" value="每小时一次"></el-option>
                    <el-option label="每2小时一次" value="每2小时一次"></el-option>
                    <el-option label="每3小时一次" value="每3小时一次"></el-option>
                    <el-option label="每4小时一次" value="每4小时一次"></el-option>
                    <el-option label="每6小时一次" value="每6小时一次"></el-option>
                    <el-option label="每8小时一次" value="每8小时一次"></el-option>
                    <el-option label="每12小时一次" value="每12小时一次"></el-option>
                    <el-option label="每24小时一次" value="每24小时一次"></el-option>
                    <el-option label="每48小时一次" value="每48小时一次"></el-option>
                    <el-option label="每天一剂" value="每天一剂"></el-option>
                    <el-option label="隔日一剂" value="隔日一剂"></el-option>
                    <el-option label="每周一剂" value="每周一剂"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="用法">
                  <el-input v-model="formDetail.checkMethod" size="mini"></el-input>
                </el-form-item>

                <!-- <el-form-item label="执行方式">
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
                </el-form-item>-->
                <el-form-item label="执行结果">
                  <el-select v-model="formDetail.workResult" size="mini">
                    <el-option label="已经执行" value="1"></el-option>
                    <el-option label="未执行" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="执行科室">
                  <el-select v-model="formDetail.execDeptId" size="mini">
                    <!-- <el-option label="检验科" value="1"></el-option>
                    <el-option label="骨科" value="2"></el-option>
                    <el-option label="脊柱科" value="3"></el-option>-->
                    <el-option
                      v-for="item in departments"
                      :label="item.name"
                      :value="item.id"
                      :key="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="执行性质">
                  <el-select v-model="formDetail.execNature" size="mini">
                    <el-option label="无执行的叮嘱" :value="0"></el-option>
                    <el-option label="病人所在科室" :value="1"></el-option>
                    <el-option label="病人所在病区" :value="2"></el-option>
                    <el-option label="开单人所在科室" :value="3"></el-option>
                    <el-option label="制定科室" :value="4"></el-option>
                    <el-option label="院外执行" :value="5"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="时间方案">
                  <!-- <el-select v-model="formDetail.exec_time_scheme" size="mini">
                    <el-option label="每天" value="1"></el-option>
                    <el-option label="每周" value="2"></el-option>
                  </el-select>-->
                  <el-input v-model="formDetail.execTimeScheme" size="mini"></el-input>
                </el-form-item>
                <!-- <el-form-item label="开始时间">
                  <el-date-picker v-model="formDetail.startTime" type="date" placeholder="开始时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                  <el-date-picker v-model="formDetail.endTime" type="date" placeholder="结束时间"></el-date-picker>
                </el-form-item>-->
                <el-form-item label="医生嘱托">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="变异说明"
                    v-model="formDetail.entrust"
                  ></el-input>
                </el-form-item>
                <div
                  class="btn-wrapper"
                  :style="{width:'100%',display:'flex',justifyContent:'flex-end'}"
                >
                  <el-button type="primary" size="mini" @click="addItem" v-if="addNoUpdate">添加</el-button>
                  <el-button type="primary" size="mini" @click="updateItem" v-else>更新</el-button>
                </div>
              </el-form>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import OrderSearch from '../cpPatient/OrderSearch.vue'
import { getAllTreatments, addAdvice, getAllDept, updateAdvice, getAdviceById } from '@/api/my-template.js';
export default {
  components: { OrderSearch },
  props: {
    addNoUpdate: Boolean,
    addStatus: Boolean
  },
  data () {
    return {
      activeEle: null,
      activeOrder: null,
      departments: [],

      formDetail: {
        timeType: 0,
        temp: [],
        addPerson: "医生",
        label: "",
        content: "",
        totalUse: 20,
        everyUse: 2,
        execFreq: "每天三次",
        checkMethod: "静脉采血",
        entrust: "",
        workResult: "已经执行",
        execDeptId: 1,
        execNature: 0,
        execTimeScheme: "每天",

      },
      orderTypes: [
        { label: '全部', icon: 'el-icon-s-grid' },
        { label: '西成药', icon: 'el-icon-s-grid' },
        { label: '中成药', icon: 'el-icon-s-grid' },
        { label: '中草药', icon: 'el-icon-s-grid' },
        { label: '成套', icon: 'el-icon-s-grid' },
        { label: '检验', icon: 'el-icon-s-grid' },
        { label: '检查', icon: 'el-icon-s-grid' },
        { label: '治疗', icon: 'el-icon-s-grid' },
        { label: '手术', icon: 'el-icon-s-grid' },
        { label: '其他', icon: 'el-icon-s-grid' },
        { label: '卫材', icon: 'el-icon-s-grid' },
      ],
      orderLists: [
        // '血细胞分析（五分类）（血液）',
        // '粪便常规+粪寄生虫镜检（粪便）',
        // '尿液分析+沉渣镜检定量（尿）',
        // '新型冠状病毒核酸检测（咽分泌物））',
        // '新型冠状病毒抗体二项（血液）',
        // '静电治疗',
        // '雾化治疗',
        // '猪苓',
        // '消化系统肿瘤标志物',
        // '呼吸肿瘤检查',
        // '半枝莲',
        // '艾司唑仑片',
        // '胃镜检查（无痛）',
        // '根管治疗',
        // '持续静电治疗',
        // '肾肿瘤栓塞',
      ]
    }
  },
  methods: {
    handleSeach (word, cb) {
      if (word == '') {
        this.orderLists = this.temp
        if (cb) {
          cb([])
        }
        return
      }
      let init = []
      for (let i = 0; i < this.orderLists.length; i++) {
        if (this.orderLists[i].name.includes(word)) {
          init.push(this.orderLists[i])
        }
      }
      console.log(init)
      this.orderLists = init
      if (cb) {
        cb(this.orderLists.map(item => ({ ...item, value: item.name })))
      }
    },
    refresh () {
      if (this.orderLists) {
        if (this.activeEle) {
          this.activeEle.classList.remove('blueItem')
        }
        const name = this.$store.state.treatmentName
        console.log('name', name);
        this.activeOrder = this.orderLists.filter(item => {
          return item.name === name
        })[0]
        this.$nextTick(function () {
          const children = this.$refs.list.children
          for (let el of children) {
            if (el.innerText === name) {
              this.activeEle = el
              el.classList.add('blueItem')
            }
          }
        })
        if (!this.addNoUpdate) {
          const id = this.$store.state.rowId
          getAdviceById(id).then(res => {
            console.log('order', res);
            this.formDetail = res
          })
        } else {
          this.formDetail = {
            timeType: 0,
            addPerson: "医生",
            label: "",
            content: "",
            totalUse: 20,
            everyUse: 2,
            execFreq: "每天三次",
            checkMethod: "静脉采血",
            entrust: "",
            workResult: "已经执行",
            execDeptId: 1,
            execNature: 0,
            execTimeScheme: "每天",


          }
        }
      }

    },
    addItem () {
      console.log('this.formDetail', this.formDetail);

      this.$emit('addItem', {

        treatmentId: this.activeOrder ? this.activeOrder.id : 1,
        ...this.formDetail
      }, this.activeOrder)

    },
    updateItem () {

      this.$emit('updateItem', {
        treatmentId: this.activeOrder ? this.activeOrder.id : 1,
        ...this.formDetail
      })

    },
    handleClickItem (e, index) {
      if (this.activeEle) {
        this.activeEle.classList.remove('blueItem')
      }
      e.target.classList.add('blueItem')
      this.activeEle = e.target

      this.activeOrder = this.orderLists[index]
    }
  },
  mounted () {

    getAllTreatments().then(res => {
      this.orderLists = res
      this.temp = res
      const name = this.$store.state.treatmentName

      this.activeOrder = this.orderLists.filter(item => {
        return item.name === name
      })[0]
      this.$nextTick(function () {
        const children = this.$refs.list.children
        for (let el of children) {
          if (el.innerText === name) {
            this.activeEle = el
            el.classList.add('blueItem')
          }
        }
      })



    })
    getAllDept().then(res => {
      this.departments = res
    })

    if (!this.addNoUpdate) {
      const id = this.$store.state.rowId
      getAdviceById(id).then(res => {
        console.log('order', res);
        this.formDetail = res
      })
    }
  },

}
</script>

<style lang="scss" scoped>
.blueItem {
  background-color: #ecf5ff;
  color: #409eff;
}
.add-order {
  width: 100%;
  height: 100%;
  .head {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: #3981ee;
    height: 40px;
    justify-content: center;
    color: white;
    .title {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .main {
    margin-top: 20px;
    display: flex;
    width: 100%;
    align-items: flex-start;
    .left {
      height: 510px;

      margin-right: 10px;
      width: 68%;
      margin-right: 2%;
      display: flex;
      .orders {
        height: 510px;

        width: 100%;
        display: flex;
        .nav {
          width: 50%;
        }
        .list {
          width: 50%;
          margin-left: 4px;
          height: 40px;
          line-height: 40px;
          height: 480px;
          overflow: auto;
          &::-webkit-scrollbar {
            display: none;
          }
          div:nth-child(odd) {
            background: #f2f2f2;
          }
          .list-item {
            cursor: pointer;
            &:hover {
              background-color: #ecf5ff;
              color: #409eff;
            }
          }
        }
      }
    }
    .right {
      width: 30%;
      height: 510px;

      .detail {
        width: 100%;
        height: 510px;

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
    }
  }
}
::v-deep .el-menu-item {
  height: 40px;
  line-height: 40px;
}
::v-deep .el-form-item {
  margin-bottom: 0px !important;
  display: flex;
  align-items: center;
}
::v-deep .detail .el-form-item {
  margin-bottom: 5px !important;
  display: flex;
  align-items: center;
}
::v-deep .detail .el-form-item__label {
  display: inline-block;
  width: 80px;
}
::v-deep .el-form-item .el-input__inner {
  width: 240px !important;
}
::v-deep .el-textarea__inner {
  width: 240px !important;
}
</style>
