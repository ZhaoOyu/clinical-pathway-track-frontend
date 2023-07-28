import request from './../request';


export function getPatientInfo(){
    return request({
      url:"/patientInfo/getPatientInfo",
      method:"GET"
    })
}

export function getDailyCost(){
    return request({
      url:"/dailyCost/getDailyCost",
      method:"GET"
    })
}

export function getCostManage(){
    return request({
      url:"/costManage/getCostManage",
      method:"GET"
    })
}

export function getMedicineCost(){
    return request({
      url:"/medicineCost/getMedicineCost",
      method:"GET"
    })
}

export function getCost(){
    return request({
      url:"/cost/getCost",
      method:"GET"
    })
}