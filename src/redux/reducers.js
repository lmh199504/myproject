/* 
	包含多个reducer函数：根据老的state和指定的action返回一个新的state
 */

import { combineReducers } from 'redux'
import { getRedirectTo } from '../utils/index'
import { AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST,RECEIVE_MSG_LIST,RECEIVE_MSG } from "./action-types";
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
		case RECEIVE_USER:
			return action.data
		case RESET_USER:
			return {...initUser,msg:action.data}
		default:
			return state
	}
}

const initUserList = []
function userList (state = initUserList,action){
	switch (action.type) {
		case RECEIVE_USER_LIST:
			return action.data
		default:
			return state
	}
}

const initChat = {
	users:{}, //用户信息
	chatMsgs:[], //聊天记录
	unReadCount:0 //总的未读数量
}
function chat (state=initChat,action){
	switch (action.type){
		case RECEIVE_MSG_LIST:
			const {users,chatMsgs} = action.data
			
			return {
				users,
				chatMsgs,
				unReadCount:0
			}
		case RECEIVE_MSG:
			return {
				users:state.users,
				chatMsgs:[...state.chatMsgs,action.data],
				unReadCount:0
			}
			
		default:
			return state
	}
}


export default combineReducers({
	user,
	userList,
	chat
})

//向外暴露的状态的结构：{user:{}}



