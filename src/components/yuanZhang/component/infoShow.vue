<template>
  <div class="productProcess">
    <div class="success_info_body" v-show="showFlag">
      
      <div class="title">DRG预警信息</div>
 
      <!-- 参数名称、列数根据实际情况调整 -->
      <div class="table_body">
        <div class="table_th">
          <div class="tr1 th_style">科室名称</div>
          <div class="tr2 th_style">预警类型</div>
          <div class="tr3 th_style">时间</div>
          <div class="tr4 th_style">详细描述</div>
        </div>

        <div class="table_main_body">
          <vue-seamless-scroll :data="tableList" class="table_inner_body">
            <div class="table_tr" v-for="(item,index) in tableList" :key="index">
                <div class="tr1 tr">{{item.department}}</div>
                <div class="tr2 tr">{{item.type}}</div>
                <div class="tr3 tr">{{item.date}}</div>
                <div class="tr4 tr">{{item.description}}</div>
              </div>
          </vue-seamless-scroll>
        </div>

        
      </div>
    </div>
  </div>
</template>

<script>

import vueSeamlessScroll from 'vue-seamless-scroll';

export default {
  components: {
		vueSeamlessScroll
	 },
  data() {
    return {
      showFlag: true,
      tableList: [
        {
          "department": "内科",
          "type": "费用",
          "date": "2022-06-07",
          "description": "药品费用超出"
        },{
          "department": "外科",
          "type": "临床路径",
          "date": "2022-06-05",
          "description": "诊断出错"
        },{
          "department": "耳鼻喉科",
          "type": "费用",
          "date": "2022-06-01",
          "description": "检查费用超出"
        },        {
          "department": "骨科",
          "type": "住院",
          "date": "2022-05-15",
          "description": "住院天数超出"
        },        {
          "department": "骨科",
          "type": "住院",
          "date": "2022-05-15",
          "description": "住院天数超出"
        },        {
          "department": "骨科",
          "type": "住院",
          "date": "2022-05-15",
          "description": "住院天数超出"
        },        {
          "department": "骨科",
          "type": "住院",
          "date": "2022-05-15",
          "description": "住院天数超出"
        },        {
          "department": "骨科",
          "type": "住院",
          "date": "2022-05-15",
          "description": "住院天数超出"
        },        {
          "department": "内科",
          "type": "费用",
          "date": "2022-06-07",
          "description": "药品费用超出"
        },        {
          "department": "外科",
          "type": "临床路径",
          "date": "2022-06-05",
          "description": "诊断出错"
        },        {
          "department": "耳鼻喉科",
          "type": "费用",
          "date": "2022-06-01",
          "description": "检查费用超出"
        },        {
          "department": "骨科",
          "type": "住院",
          "date": "2022-05-15",
          "description": "住院天数超出"
        },        {
          "department": "骨科",
          "type": "住院",
          "date": "2022-05-15",
          "description": "住院天数超出"
        },        {
          "department": "骨科",
          "type": "住院",
          "date": "2022-05-15",
          "description": "住院天数超出"
        },        {
          "department": "骨科",
          "type": "住院",
          "date": "2022-05-15",
          "description": "住院天数超出"
        },        {
          "department": "骨科",
          "type": "住院",
          "date": "2022-05-15",
          "description": "住院天数超出"
        }
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
  .title {
    color: #117fbe;
    font-size: 16px;
    font-weight: bold;
  }
  .productProcess {
    width: 550px;
    height: 415px;
  }
  .table_body {
    width: 90%;
    margin-top: 8px;
  }
  .table_th {
    width: 100%;
    display: flex;
    height: 30px;
    line-height: 40px;
    border-bottom: 1px solid gray;
    padding: 10px 20px 10px 0;
  }
  .tr {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
    padding: 0 5px;
    text-align: center;
    font-size: 10px;
  }
  .tr1 {
    width: 20%;
  }
  .tr2 {
    width: 20%;
  }
  .tr3 {
    width: 25%;
  }
  
  .tr4 {
    flex: 1;
  }
  
  .th_style {
    color: #168ce3;
    font-weight: bold;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
    padding: 0 5px;
    text-align: center;
  }
  .table_main_body {
    width: 100%;
    //height: 294px;
    height:250px;
    overflow: hidden;
    position: relative;
  }
  .table_inner_body {
    width: 100%;
    position: absolute;
    left: 0;
  }
  .table_tr {
    display: flex;
    height: 30px;
    line-height: 30px;
    color: #eee;
    font-size: 10px;
    margin-top: 0px;
    
  }
</style>