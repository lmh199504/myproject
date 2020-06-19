/* 
	包含多个action creator 
	异步action
	同步action
 */

import { reqLogin,reqRegister} from "../api";
import { AUTH_SUCCESS,ERROR_MSG } from "./action-types";


//授权成功的同步action
export const authSuccess = (data) => ({type:AUTH_SUCCESS,data})
//错误提示信息的同步action
export const errorMsg = (data) => ({type:ERROR_MSG,data})

//注册异步action
export const register = (data) => {
    return async dispatch => {
        //发送注册的异步请求
        const response = await reqRegister(data)
        const result = response.data
        if(result.code === 0){  //成功
            return dispatch(authSuccess(result.data))
        }else { //失败
            return dispatch(errorMsg(result.msg))
        }

    }
}


//登录异步action
export const login = (data) => {
    return async dispatch => {
        //发送注册的异步请求
        const response = await reqLogin(data)
        const result = response.data
        if(result.code === 0){  //成功
            return dispatch(authSuccess(result.data))
        }else { //失败
            return dispatch(errorMsg(result.msg))
        }

    }
}