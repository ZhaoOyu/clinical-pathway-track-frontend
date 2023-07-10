import request from './../request';

export function stay(data){
  return request({
    url:"/patient/stay",
    method:'POST',
    data
  })
  
}

export function getAll(){
  return request({
    url:"/patient/getAll",
    method:"GET"
  })
}

export function login(data){
  return request({
    url:"/auth/login",
    method:"POST",
    data
  })
}

export function enterCp(data){
  var formData = new FormData();

  formData.append("enter", data.enter);
  formData.append("cpTmplId", data.cpTmplId); //数字123456会被立即转换成字符串 "123456"

  // HTML 文件类型input，由用户选择
  formData.append("patientId", data.patientId);

  return request({
    url:"/patient/enterCp",
    method:"POST",
    data:formData
  })
  
}