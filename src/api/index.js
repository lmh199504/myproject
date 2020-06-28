import request from '../utils/request'

export const reqLogin = (data) => request('/login',data)

export const reqRegister = (data) => request('/register',data)

//跟新用户数据接口
export const reqUpdataUser = (data) => request('/updata',data)