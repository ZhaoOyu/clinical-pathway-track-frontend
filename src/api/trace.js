import request from './../request';
/**
 * 第一个医嘱
 */
export function traceCurrent(patientId){
  return request({
    url:"advice/traceForwardCurrentAdvice?patientId="+patientId,
    method:"GET"
  })
}
/**
 * 溯源
 */
 export function traceBack(adviceId){
  return request({
    url:"advice/traceBackwardLastAdvice?adviceId="+adviceId,
    method:"GET"
  })
}