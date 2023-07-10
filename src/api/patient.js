import request from './../request';
/**
 * 新增病人
 * @param {*} data 
 * @returns 
 */
export function addPatient(data){
  return request({
    url:"/patient/addPatient",
    method:"POST",
    data
  })
}
/**
 * 获取所有的病人信息
 * @returns 
 */
export function getAll(){
  return request({
    url:"/patient/getAll",
    method:'GET'
  })
}
/**
 * 获取病人 科室分类
 * @returns 
 */
export function getPatientGroupByDept(){
  return request({
    url:"/patientCp/getPatientGroupByDept",
    method:'GET'
  })
}
/**
 * 获取病人头部信息
 * @returns 
 */
export function getPatientCpHeader(id){
  return request({
    url:"/patientCp/getPatientCpHeader?id="+id,
    method:'GET'
  })
}
/**
 * 获取病人cp信息
 * @returns 
 */
export function getPatientCpContent(id){
  return request({
    url:"/patientCp/getPatientCpContent?id="+id,
    method:'GET'
  })
}
/**
 * 根据诊断id获取诊断信息
 * @param {*} id 
 * @returns 
 */
export function getDiaById(id){
  return request({
    url:"diagnosis/getById?id="+id,
    method:'GET'
  })
}

/**
 * 执行医嘱 数组
 * @param {*} data 
 * @returns 
 */
export function doPatientCpExec(data){
  return request({
    url:"/patientCpExec/doPatientCpExec",
    method:"POST",
    data
  })
}
/**
 * 评估某天
 * @param {*} data 
 */ 
export function evaluate(data){
  return request({
    url:"/patientCpEvaluate/evaluate",
    data,
    method:'POST'
  })
}

/**
 * 获取某天的医嘱
 * @returns 
 */
export function getStageDayPatientExec(data){
  return request({
    url:`/patientCpExec/getStageDayPatientExec?patientId=${data.patientId}&stageId=${data.stageId}&dayNum=${data.dayNum}`,
    method:"GET"

  })
}
/**
 * 获取某天的已生成的医嘱
 * @returns 
 */
export function getStagePatCpAdvices(data){
  return request({
    url:`patientCpAdvice/getStagePatCpAdvices?patientId=${data.patientId}&stageId=${data.stageId}&dayNum=${data.dayNum}`,
    method:"GET"
  })
}


/**
 * 获取阶段变异数
 * @param {*} param0 
 * @returns 
 */
export function getStageVar({stageId,patientId}){
  return request({
    url:`patientCpAdvice/getStageVar?stageId=${stageId}&patientId=${patientId}`,
    method:"GET"

  })
}
/**
 * 修改某天的医嘱
 * @returns 
 */
export function editStageDayPatientAdvice(data){
  return request({
    url:"patientCpExec/editStageDayPatientAdvice",
    method:'POST',
    data:data
  })
}
/**
 * 获取实际诊疗项目对应医嘱
 * @param {*} cpProjId 
 * @returns 
 */
export function getExecProAdvices(cpProjId){
  return request({
    url:"patientCpAdvice/getExecProAdvices?cpExecId="+cpProjId,
    method:'GET',
  })
}
/**
 * 获取病人的医嘱
 * @param {*} patientId 
 * @returns 
 */
export function getPatientAdvice(patientId){
  return request({
    url:"advice/getPatientAdvice?id="+patientId,
    method:"GET"
  })
}
/**
 * 获取平安果
 * @param {*} userId 
 * @returns 
 */
export function getApple(userId){
  return request({
    url:"userApple/getUserAppleNumByUserId?userId="+userId,
    method:"GET"
  })
}

export function getPatientsThree(){
  return request({
    url:"patient/getThreeDayPatientsData",
    method:'GET'
  })
}
export function getPatientsThreeByDept(){
  return request({
    url:"patientCp/getThreeDayPatientGroupByDept  ",
    method:'GET'
  })
}