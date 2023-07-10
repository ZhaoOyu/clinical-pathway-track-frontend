import request from './../request';

/**
 * 获取所有的cp模板
 */
export function getAllCpTemplate(){
  return request({
    url:"/cpTemplate/getAllGroupByDept",
    method:"GET"
  })
}
/**
 * 获取cp模板头部信息
 * @param {*} id 
 * @returns 
 */
export function getTemplateHeader(id){
  return request({
    url:"/cpTemplate/getCpTemplateHeader?id="+id,
    method:"GET"
  })
}
/**
 * 获取cp模板阶段信息
 * @param {*} id 
 * @returns 
 */
 export function getTemplateContent(id){
  return request({
    url:"/cpTemplate/getCpTemplateContent?id="+id,
    method:"GET"
  })
}
/**
 * 更新模板基本信息
 * @param {*} data 
 * @returns 
 */
export function updateCpTempBasicInfo(data){
  return request({
    url:"/cpTemplate/updateCpTempBasicInfo",
    method:"POST",
    data
  })
}
/**
 * 新增模板基本信息
 * @param {*} data 
 * @returns 
 */
export function addCpTempBasicInfo(data){
  return request({
    url:"/cpTemplate/addCpTempBasicInfo",
    method:"POST",
    data
  })
}

/**
 * 获取所有的诊断
 * @returns 
 */
export function getAllDia(){
  return request({
    url:"diagnosis/getAll",
    method:'GET'
  })
}
/**
 * 获取某个类别的所有项目
 * @returns 
 */
export function getOneTableCpAdvice(data){
  return request({
    url:`cpProject/getOneTableCpAdvice?cpTempId=${data.cpTempId}&stageId=${data.stageId}&classification=${data.classification}`,
    method:'GET'
  })
}
/**
 * 新增某个阶段的项目
 * @param {*} data 
 */
export function addCpProject(data){
  return request({
    url:"/cpProject/addCpProject",
    data:data,
    method:'POST'
  })
}
/**
 * 对某一项目增加具体医嘱 
 * @param {*} data  不包含advice的id
 * @returns 
 */
export function addCpAdviceToProject(data){
  return request({
    url:`/cpAdvice/addCpAdviceToProject/${data.cpProjId}`,
    method:"POST",
    data,
  })
}
/**
 * 修改某个项目的医嘱
 * @param {*} data 包含advice的id
 * @returns 
 */
export function updateCpAdvice(data){
  return request({
    url:`/cpAdvice/updateCpAdvice`,
    method:"POST",
    data,
  })
}
/**
 *
 *
 * 新增cp阶段
 * @param {*} cpTempId
 */
export function addCpStage(data){
  return request({
    url:`/cpStage/addCpStage/${data.cpTempId}`,
    method:"POST",
    data
  })
}

/**
 * 更新cp阶段
 * @param {*} data 
 * @returns 
 */
export function updateCpStage(data){
  return request({
    url:`/cpStage/updateCpStage`,
    method:"POST",
    data
  })
}
/**
 * 获取项目的详细信息
 * @param {*} id 
 */
 export function getCpAdviceInfo(id){
  return request({
    url:`cpAdvice/getCpAdviceInfo?cpProjId=${id}`,
    method:"GET"
  })
}


export function deleteCpAdvice(data){
  return request({
    url:"cpAdvice/deleteCpAdvice",
    method:"POST",
    data
  })
}

export function deleteCpProject(data){
  return request({
    url:"cpProject/deleteCpProject",
    method:"POST",
    data
  })
}