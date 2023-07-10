// 引入 Vue 核心库：export interface Vue {...}
import Vue from 'vue'
// 引入当前目录下名字为 App.vue 的组件 export default {...} ，作为 App 的文件对象
import App from './App.vue'
// 引入 css 文件
import 'element-ui/lib/theme-chalk/index.css';
import './assets/font/iconfont.css'
import './assets/font/iconfont.js'

//------------------引入插件相关------------------------
// 引入 element-ui 插件
import ElementUI from 'element-ui';
import { Message } from 'element-ui';
// 引入 vue-router 插件
import VueRouter from 'vue-router'
// 引入 vue-echarts 组件配置
import VueECharts from 'vue-echarts'
import 'echarts'
// 引入 v-charts 插件
import VCharts from 'v-charts'

//------------------引入router和store模块---------------
// 引入 store 下的 index.js 文件
import store from './store/index'
// 引入 router 下的 index.js 文件
import router from './router/index'

//------------------插件注册----------------------------
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VCharts)

// 全局注册组件
Vue.component('v-chart', VueECharts)

// Vue 的prototype原型的全局挂载
// 1. time 字符串格式化 yyyy-MM-dd 
Vue.prototype.formateTime=(time)=>{
  return new Date(time).format('yyyy-MM-dd')
}
// 2. Element 成功的消息提示的全局挂载
Vue.prototype.sMessage=(message)=>{
  Message({
    message: message,
    duration:3000,
    type:'success'
  })
}
// 3. Element 失败的消息提示的全局挂载
Vue.prototype.eMessage=(message)=>{
  Message({
    message: message,
    duration:3000,
    type:'error'
  })
}

// 是否要在生产环境中给予提示功能，推荐 false
Vue.config.productionTip = false
// Date日期类上进行的方法扩展
Date.prototype.format = function(fmt){
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };

  if(/(y+)/.test(fmt)){
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }

  for(var k in o){
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(
        RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }

  return fmt;
}

// 生成一个 Vue 实例，根据 App.vue 的配置
new Vue({
  render: h => h(App), // 渲染函数，将组件 APP 渲染到挂载到挂载的元素上
  router, // router 模块
  store // store 模块
}).$mount('#app')

