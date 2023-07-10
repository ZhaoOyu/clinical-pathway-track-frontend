import VueRouter from 'vue-router'

// 在vue-router在3.1.0版本之后，push和replace方法会返回一个promise对象，
// 如果跳转到相同的路由，就报promise uncaught异常.
// 在使用push的时候，需要使用catch来处理可能出现的异常this.$router.push('/login').catch(err=>{})
// 修改push方法
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
//const enterHospital = ()=>import('../components/enterHospital/EnterHospital.vue')
const routes = [
  {
    path:"/",
    name:"main",
    redirect:"/login",
    component:()=>import('../components/main/Main.vue')
  },
  {
    path:"/login",
    name:"login",
    component:()=>import('../components/login/login')
  },
  {
    path:"/enterHospital",
    name:"enterHospital",
    //component:enterHospital
    component:()=>import('../components/enterHospital/EnterHospital.vue')
  },
  {
    path:"/center",
    name:"center",
    component:()=>import("../components/center/Center")
  },
  {
    path:"/drg",
    name:"drg",
    component:()=>import("../components/drgManagement/DrgManagement")
  },
  {
    path:"/trace",
    name:"trace",
    component:()=>import("../components/trace/Trace")
  },
  {
    path:"/myerror",
    name:"myerror",
    component:()=>import("../components/myError/MyError")
  },
  {
    path:"/cpManagement",
    name:"cpManagement",
    component:()=>import('../components/cpManagement/CpManagement.vue')
  },
  {
    path:"/cpPatient",
    name:"cpPatient",
    component:()=>import('../components/cpPatient/CpPatient.vue')
  },
  {
    path:"/orderTemplate",
    name:"orderTemplate",
    component:()=>import('../components/orderTemplate/OrderTemplate.vue')
  },
  {
    path:"/orderManagement",
    name:"orderManagement",
    component:()=>import('../components/orderManagement/OrderManagement.vue')
  },
  {
    path:"/drgManagement",
    name:"drgManagement",
    component:()=>import('../components/drgManagement/DrgManagement.vue')
  },
  {
    path:"/cpAdd",
    name:"cpAdd",
    component:()=>import('../components/cpPatient/CpAdd.vue')
  },
  {
    path:"/cpGenerate",
    name:"cpGenerate",
    component:()=>import('../components/cpPatient/CpGenerate.vue')
  },
  
  {
    path:"/errorHelp",
    name:"errorHelp",
    component:()=>import('../components/cpPatient/ErrorHelp.vue')
  },
  {
    path:"/yuanZhang",
    name:"yuanZhang", 
    component:()=>import('../components/yuanZhang/YuanZhang.vue')
  },
  {
    path:"/dataError",
    name:"dataError",
    component:()=>import('../components/dataError/DataError.vue')
  },
  {
    path: '/patentInfo',
    name: 'patentInfo',
    component: () => import('../components/patentInfo/PatentInfo'),
  },
  {
    path: '/uploadFile',
    name: 'uploadFile',
    component: () => import('../components/uploadFile/UploadFile'),
  },
  {
    path: '/myFile',
    name: 'myFile',
    component: () => import('../components/uploadFile/myFile'),
  },
  {
    path: '/allFile',
    name: 'allFile',
    component: () => import('../components/uploadFile/AllFile'),
  },
  {
    path: '/feixing',
    name: 'feixing',
    component: () => import('../components/feixing/Feixing'),
  },
]
export default new VueRouter({
  routes 
})

