
import request from './../request';
/**
 * 获取所有医嘱模板名称
 */
export function getAllTemplate(){
  return request({
    url:"/adviceTemplate/getAllAdviceTemplateName",
    method:"GET"
  })
}
/**
 * 获取医嘱模板内容
 * @returns 
 */
export function getAdviceTemplate(id){
  return request({
    url:"/adviceTemplate/getAdviceTemplate?id="+id,
    method:'GET',
  })
}
/**
 * 获取所有的医嘱
 * @returns 
 */
export function getAllTreatments(){
  return request({
    url:"treatment/getAllTreatments",
    method:"GET"
  })
}
/**
 *某个医嘱模板新增医嘱
 *
 * @export
 * @param {*} data
 */
export function addAdvice(data){
  return request({
    url:"/adTempDetail/addAdvice/"+data.adTempId,
    method:"POST",
    data,
  })
}
/**
 * 获取所有的科室
 * @returns 
 */
export function getAllDept(){
  return request({
    url:"dept/getAllDept",
    method:"GET"
  })
}
/**
 * 删除模板的医嘱
 * @param {*} data 
 * @returns 
 */
export function deleteAdvice(data){
  return request({
    url:"/adTempDetail/deleteAdvice",
    method:"POST",
    data:data
  })
}
/**
 * 更新模板中的医嘱
 * @param {*} data 
 * @returns 
 */
export function updateAdvice(data){
  return request({
    url:"/adTempDetail/updateAdvice",
    method:"POST",
    data,
  })
}
/**
 * 新增医嘱模板
 * @param {*} data 
 * @returns 
 */
export function addAdviceTemplate(data){
  return request({
    url:"/adviceTemplate/addAdviceTemplate",
    method:"POST",
    data
  })
}
/**
 * 根据id获取advice
 * @param {*} id 
 * @returns 
 */
export function getAdviceById(id){
  return request({
    url:'adTempDetail/getAdviceById?id='+id,
    method:'GET'
  })
}

export function deleteAdviceTemplate(data){
  return request({
    url:"adviceTemplate/deleteAdviceTemplate",
    method:"POST",
    data
  })
}

