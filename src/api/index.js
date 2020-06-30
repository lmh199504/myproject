import request from '../utils/request'

export const reqLogin = (data) => request('/login',data)

export const reqRegister = (data) => request('/register',data)

//跟新用户数据接口
export const reqUpdataUser = (data) => request('/updata',data)

//获取用户信息
export const reqUser = (data) => request('/user',data,"GET")

//获取用户列表
export const reqUserList = (data) => request('/userlist',data,"GET")