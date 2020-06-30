
import axios from 'axios'
import { Toast } from 'antd-mobile'
import Cookies from 'js-cookie'
const ConfigBaseURL = '/api'
const Service = axios.create({
    timeout: 10000, // 请求超时时间
    baseURL: ConfigBaseURL,
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

// 添加请求拦截器
Service.interceptors.request.use(config => {
    let userid = Cookies.get('userid')
	if(userid){
		return config
	}else{
		console.log("未登录")
	}
    return config
})
// 添加响应拦截器
Service.interceptors.response.use(response => {

    if(response.data.code !== 0){
        Toast.fail(response.data.msg)
    }
    return response.data
}, error => {
    const msg = error.Message !== undefined ? error.Message : '请求错误.'
    Toast.fail(msg)
    return Promise.reject(error)
})

const request = (url,data={},type="POST") => {
    if(type === 'GET'){
        return Service.get(url,{params:data})
    }else{
        return Service.post(url,data)
    }
}

export default request