/* 
	包含多个action creator 
	异步action
	同步action
 */

import { reqLogin,reqRegister,reqUpdataUser,reqUser,reqUserList} from "../api";
import { AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST } from "./action-types";
import { Toast } from 'antd-mobile'

//授权成功的同步action
export const authSuccess = (data) => ({type:AUTH_SUCCESS,data})
//错误提示信息的同步action
export const errorMsg = (data) => ({type:ERROR_MSG,data})
//接收用户的同步action
export const receiveUser = (data) => ({type:RECEIVE_USER,data})
//重置用户的同步action
export const resetUser = (data) => ({type:RESET_USER,data})
//接收用户列表数据的同步action
export const receiveUserList = (data) => ({type:RECEIVE_USER_LIST,data})

//注册异步action
export const register = (data) => {
	const { username,password,password2,type } = data
	if(username === ''){
		Toast.fail('用户名不能为空.')
		return errorMsg('用户名不能为空.')
	}else if(password !== password2){
		Toast.fail('密码不一致.')
		return errorMsg('密码不一致.')
	}
	
    return async dispatch => {
        //发送注册的异步请求
        const response = await reqRegister({username,password,type})
        if(response.code === 0){  //成功
            return dispatch(authSuccess(response.data))
        }else { //失败
            return dispatch(errorMsg(response.msg))
        }

    }
}


//登录异步action
export const login = (data) => {
	const { password,username } = data
	if(password === '' || username === ''){
		Toast.fail('用户名或密码为空.')
		return errorMsg('用户名或密码为空.')
	}
	
    return async dispatch => {
        //发送注册的异步请求
        const response = await reqLogin(data)
        if(response.code === 0){  //成功
            return dispatch(authSuccess(response.data))
        }else { //失败
            return dispatch(errorMsg(response.msg))
        }
    }
}

//更新用户的异步action
export const updata = (data) => {
	return async dispatch => {
		const response = await reqUpdataUser(data)
		if(response.code === 0){
			//更新成功 data
			Toast.success('保存成功.')
			dispatch(receiveUser(response.data))
		}else{
			//更新失败 msg
			dispatch(resetUser(response.msg))
		}
		
	}
}

//获取用户数据的异步action
export const getUser = () => {
	return async dispatch => {
		const response = await reqUser()
		if(response.code === 0){
			//成功
			dispatch(receiveUser(response.data))
		}else{
			//失败
			dispatch(resetUser(response.msg))
		}
		
	}
}

//获取用户列表的异步action
export const getUserList = (data) => {
	return async dispatch => {
		const response = await reqUserList(data)
		
		if(response.code === 0){
			return dispatch(receiveUserList(response.data))
		}
	}
}