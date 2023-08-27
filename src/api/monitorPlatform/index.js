import request from '../../request'

export function getSuperviseScore(){
    return request({
        url:'/superviseDashboard/getSuperviseScore',
        method:'GET'
    })
}

//请求医疗质量雷达图信息
export function getSuperviseMedicalQuality(){
    return request({
        url:'/superviseMedicalQuality/getSuperviseMedicalQuality',
        method:'GET'
    })
}

//请求反馈列表
export function getSuperviseComplain(){
    return request({
        url:'/superviseComplain/getSuperviseComplain',
        method:'GET'
    })
}

//获取满意度调查结果列表
export function getSuperviseFeedback(){
    return request({
        url:'/superviseSatisfaction/getSuperviseFeedback',
        method:'GET'
    })
}

//获取满意度雷达图信息
export function getSuperviseSatisfaction(){
    return request({
        url:'/superviseSatisfaction/getSuperviseSatisfaction',
        method:'GET'
    })
}

//请求医疗服务指标
export function getSuperviseMedicalServiceIndicator(){
    return request({
        url:'/superviseDashboard/getSuperviseMedicalServiceIndicator',
        method:'GET'
    })
}

//全院综合指标得分
export function getSuperviseIndicatorScore(){
    return request({
        url:'/superviseDashboard/getSuperviseIndicatorScore',
        method:'GET'
    })
}

//认证和评级
export function getSuperviseQualityCertification(){
    return request({
        url:'/superviseDashboard/getSuperviseQualityCertification',
        method:'GET'
    })
}

//患者安全指标
export function getSupervisePatientSafetyIndicator(){
    return request({
        url:'/superviseDashboard/getSupervisePatientSafetyIndicator',
        method:'GET'
    })
}

//获取满意度信息
export function getSuperviseSatisfactionRatio(){
    return request({
        url:'/superviseSatisfaction/getSuperviseSatisfactionRatio',
        method:'GET'
    })
}