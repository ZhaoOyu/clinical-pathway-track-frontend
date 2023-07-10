import axios from 'axios'
import { Message } from 'element-ui'
// create an axios instance
const request = axios.create({
  baseURL: "http://localhost:8090", // url = base url + request url
  //baseURL: "http://10.12.159.56:8090", // url = base url + request url

  // baseURL: "http://localhost:8090", // url = base url + request url
  // baseURL: "http://10.21.199.230:8090", // url = base url + request url?\
  // baseURL: "http://10.21.199.134:8090", // url = base url + request url
  // baseURL: "http://101.201.49.180:8090", // url = base url + request url

  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
request.interceptors.request.use(
  config => {
    // do something before request is sent

    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    config.headers['token'] = localStorage.getItem('cp-token') || 'Bearer=eyJhbGciOiJIUzI1NiJ9.eyJqb2JfbnVtIjoiMDIxNzE2MzIiLCJpZCI6MSwiZXhwIjoxNjQ2Nzk2MzMxLCJpYXQiOjE2NDY3MDk5MzEsInVzZXJuYW1lIjoi546L5Yy755SfIn0.rRcYla9JrZa4AR-T1cP8Me1HF8ogMfvDSaXrRGtjLjo'
    // config.headers['token'] = "Bearer=eyJhbGciOiJIUzI1NiJ9.eyJqb2JfbnVtIjoiMDIxNzE2MzIiLCJpZCI6MSwiZXhwIjoxNjQ1NzUzNTEzLCJpYXQiOjE2NDU2NjcxMTMsInVzZXJuYW1lIjoi6bq76Iqx5Yy755SfIn0.svvVo6iarBkUkNsN_czV1XXiB6qpPQkKmnl0GzLkr80"
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res,
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default request
