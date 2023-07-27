import request from './../request';

export function getPresidentTotal(){
    return request({
      url:"/presidentTotal/getPresidentTotal",
      method:"GET"
    })
}

export function getPresidentGuokao(department){
    return request({
      url:"/presidentGuokao/getPresidentGuokao?department="+department,
      method:"GET"
    })
}

export function getPresidentDrgWarning(department){
    return request({
      url:"/presidentDrgWarning/getPresidentDrgWarning?department="+department,
      method:"GET"
    })
}

export function getPresidentDrgInfo(department){
    return request({
      url:"/presidentDrgInfo/getPresidentDrgInfo?department="+department,
      method:"GET"
    })
}

export function getPresidentDepartmentWarnings(){
    return request({
      url:"/presidentDepartmentWarnings/getPresidentDepartmentWarnings",
      method:"GET"
    })
}

export function getPresidentAppleRankDoctor(){
    return request({
      url:"/presidentAppleRankDoctor/getPresidentAppleRankDoctor",
      method:"GET"
    })
}

export function getPresidentAppleRankDepartment(){
    return request({
      url:"/presidentAppleRankDepartment/getPresidentAppleRankDepartment",
      method:"GET"
    })
}

export function getPresidentAppleNumber(department){
    return request({
      url:"/presidentAppleNumber/getPresidentAppleNumber?department="+department,
      method:"GET"
    })
}
