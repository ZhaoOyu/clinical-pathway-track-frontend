import request from './../request';

export function getDoctorInfo(doctorName){
    return request({
      url:"/doctorInfo/getDoctorInfo?doctorName="+doctorName,
      method:"GET"
    })
}

export function getDoctorHonor(doctorName){
    return request({
      url:"/doctorHonor/getDoctorHonor?doctorName="+doctorName,
      method:"GET"
    })
}

export function getDoctorApple(doctorName){
    return request({
      url:"/doctorApple/getDoctorApple?doctorName="+doctorName,
      method:"GET"
    })
}

export function getDoctorWarning(doctorName){
    return request({
      url:"/doctorWarning/getDoctorWarning?doctorName="+doctorName,
      method:"GET"
    })
}

export function getDoctorIndex(doctorName){
    return request({
      url:"/doctorIndex/getDoctorIndex?doctorName="+doctorName,
      method:"GET"
    })
}

export function getDoctorDrg(doctorName){
    return request({
      url:"/doctorDrg/getDoctorDrg?doctorName="+doctorName,
      method:"GET"
    })
}

export function getDoctorFileShare(doctorName){
    return request({
      url:"/doctorFileShare/getDoctorFileShare?doctorName="+doctorName,
      method:"GET"
    })
}
