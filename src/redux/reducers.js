/* 
	包含多个reducer函数：根据老的state和指定的action返回一个新的state
 */

import { combineReducers } from 'redux'
import { getRedirectTo } from '../utils/index'
import { AUTH_SUCCESS,ERROR_MSG } from "./action-types";
const initUser = {
	username:"", //用户名
	type:"", //用户类型 dashen/laoban
	msg:''  ,//错误信息
	redirectTo:''
}
function user (state = initUser,action){
	switch (action.type) {
		case AUTH_SUCCESS:
			const { type,header } = action.data
		
			return {...state,...action.data,redirectTo:getRedirectTo(type,header)}
		case ERROR_MSG:
			return {...state,msg:action.data}
		default:
			return state
	}
}


export default combineReducers({
	user,
})

//向外暴露的状态的结构：{user:{}}



