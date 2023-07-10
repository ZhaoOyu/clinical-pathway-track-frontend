import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import {yuanZhang} from '@/components/mock'

const store = new Vuex.Store({
  // state：数据状态、数据源，在这个属性中定义的数据状态，在任何一个组件中都可以访问
  state: {
    singleOrder:null,
    //模板相关
    adTempId:1,
    treatmentId:1,
    treatmentName:"血细胞分析（五分类）（血液）",
    rowId:1,
    orders:[],
    //院长页面
    yuanZhang:{
      department:"本院",
      drg:yuanZhang.drg['本院'],
      guokao:yuanZhang.guokao['本院'],
      jingdou:yuanZhang.jingdou['本院']
    },
    //cpAdd cpGenerate逻辑
    myAdvices:[],
    cpAdvices:[],
    todoOrders:[],
    adviceMap:{},
    myAdvice:null
  },
  getter: {
    // 对数据获取之前的再次编译，简单的理解为包装数据，
    // 包装数据只在数据的基础上进行包装改变，不是真正意义上的修改数据
  },
  mutations: {
    // 修改数据源，同步的修改数据源
    setAdviceMap(state,{id,detail}){
      state.adviceMap = {...state.adviceMap,[id]:detail}
    },
    setTodoOrders(state){
      state.todoOrders = [...state.myAdvices,...state.cpAdvices]
    },
    deleteCpAdvice(state,row){
      const mock = [...state.cpAdvices]
      const idOnin = mock.map(item=>{
        return `${item.cpProjId}-${item.id}`
      })
     
        let ids = `${row.cpProjId}-${row.id}`
        if(idOnin.indexOf(ids)!==-1){
          let idx = idOnin.indexOf(ids)
          console.log('idx',idx);
          mock.splice(idx,1)
        }
     
      state.cpAdvices = mock
    },
    setMyAdvice(state,myAdvice){
      state.myAdvice = myAdvice
    },
    setMyAdvices(state,payload){
      state.myAdvices = [...payload]
    },
   
    deleteMyAdvices(state,payload){
      let mock = state.myAdvices
      mock.forEach((item,index)=>{
        if(item.id === payload.id){
          mock.splice(index,1)
          return
        }
      })
      state.myAdvices = mock
    },
    setCpAdvices(state,payload){
      state.cpAdvices = [...state.cpAdvices,...payload]
    },
   
    deleteCpAdvices(state,payload){
    
      state.cpAdvices = []
    },
    changeDepartment(state,department){
      state.yuanZhang.department = department
      state.yuanZhang.drg = yuanZhang.drg[department]
      state.yuanZhang.guokao = yuanZhang.guokao[department]
      state.yuanZhang.jingdou = yuanZhang.jingdou[department]
    },
    addTodoOrders (state, payload) {
      state.todoOrders = payload
    },
    addSingleOrder(state,payload){
      state.singleOrder = payload
    },
    chooseTemplateId(state,adTempId){
      state.adTempId = adTempId
    },
    chooseTreatmentId(state,treatmentId){
      state.treatmentId = treatmentId
    },
    chooseTreatmentName(state,treatmentName){
      state.treatmentName = treatmentName
    },
    chooseRowId(state,rowId){
      state.rowId = rowId
    },
    addOrders(state,activeOrder){
      state.orders = [...state.orders,activeOrder]
    }
  },
  actions: {
    // 修改数据源，异步的修改数据源
    // 间接的去调用mutations的提交修改方法
    // addCount(context) {
    //   // 可以包含异步操作
    //   // context 是一个与 store 实例具有相同方法和属性的 context 对象
    // }
  }
})

export default store