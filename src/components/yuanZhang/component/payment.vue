<template>
  <div class="trans-list rangle">
    <div class="title">2021各科室收入支出情况</div>
    <div class="list">
      <div class="list-title">
        <div class="department">科室名称</div>
        <div class="income">总收入</div>
        <div class="payment">总支出</div>
        <div class="time">统计时间</div>
      </div>
      <div class="list-item" v-for="(item,index) in list" :key="index" @click="handleClick(index)">
        <div class="department">{{item.department}}</div>
        <div class="income overflow">{{item.income}}</div>
        <div class="payment  overflow">{{item.payment}}</div>
        <div class="time overflow">{{item.time}}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    data () {
        return {
            list: [
                {
                    'department': '皮肤科',
                    'income': '492.36万',
                    'payment': '324.88万',
                    'time':'2021-11-15 00:00:00'
                },
                {
                    'department': '妇科',
                    'income': '312.12万',
                    'payment': '285.73万',
                    'time':'2021-11-15 00:00:00'
                },
                {
                    'department': '口腔科',
                    'income': '318.79万',
                    'payment': '276.42万',
                    'time':'2021-11-15 00:00:00'
                },
                {
                    'department': '内科',
                    'income': '301.23万',
                    'payment': '253.73万',
                    'time':'2021-11-15 00:00:00'
                },
                {
                    'department': '五官科',
                    'income': '462.63万',
                    'payment': '371.82万',
                    'time':'2021-11-15 00:00:00'
                },
                {
                    'department': '外科',
                    'income': '538.49万',
                    'payment': '489.61万',
                    'time':'2021-11-15 00:00:00'
                },
                {
                    'department': '内分泌科',
                    'income': '172.32万',
                    'payment': '93.31万',
                    'time':'2021-11-15 00:00:00'
                },
                {
                    'department': '中医科',
                    'income': '253.79万',
                    'payment': '123.38万',
                    'time':'2021-11-15 00:00:00'
                },
                {
                    'department': '眼科',
                    'income': '163.51万',
                    'payment': '137.63万',
                    'time':'2021-11-15 00:00:00'
                },
                {
                    'department': '脑科',
                    'income': '271.72万',
                    'payment': '218.63万',
                    'time':'2021-11-15 00:00:00'
                }
            ]
        }
    },
    methods: {
        handleClick(index){
            console.log('click')
        }
    }
}
</script>
<style lang="scss" scoped>
.trans-list {
//   margin-left: 10px;
//   margin-right: 10px;
//   overflow-y: hidden;
//   overflow: hidden;
  background-color: #091629;
  height: 100%;
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  .title {
    color: #117fbe;
    font-size: 16px;
    font-weight: bold;
  }
  .list {
    background-color: #091629;
    padding-left: 10px;
    box-sizing: border-box;
    height: 90%;
    overflow: hidden;

    color: gray;
    margin-top: 10px;
    .list-title {
      display: flex;
      border-bottom: 1px solid gray;
      // height: 12.5%;
      padding: 6px 20px 6px 0;
      align-items: center;
      .department {
        color: #168CE3;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 13px;
        width: 20%;
      }
      .income {
        color: #168CE3;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 13px;
        width: 20%;
      }
      .payment {
        color: #168CE3;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 13px;
        width: 20%;
      }
      .time {
        color: #168CE3;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 13px;
        width: 40%;
      }

      .date {
        width: 50%;
      }
      .overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .list-item {
      display: flex;
    //   border-bottom: 1px solid gray;
      // height: 12.5%;
      padding: 6px 20px 6px 0;
      align-items: center;
      .department {
        color: #74fbf5;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 12px;
        width: 20%;
      }
      .income {
        color: #74fbf5;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 12px;
        width: 20%;
      }
      .payment {
        color: #74fbf5;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 12px;
        width: 20%;
      }
      .time {
        color: #74fbf5;
        //flex: 1;
        // height: 12.5%;

        text-align: center;
        font-size: 12px;
        width: 40%;
      }

      .date {
        width: 50%;
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
</style>