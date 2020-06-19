import request from '../utils/request'

export const reqLogin = (data) => request('/login',data)

export const reqRegister = (data) => request('/register',data)