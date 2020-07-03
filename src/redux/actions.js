/* 
	包含多个action creator 
	异步action
	同步action
 */

import { reqLogin,reqRegister,reqUpdataUser,reqUser,reqUserList,reqChatMsgList,reqReadMsg} from "../api";
import { AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST,RECEIVE_MSG_LIST,RECEIVE_MSG,READ_MSG } from "./action-types";
import { Toast } from 'antd-mobile'
import io from 'socket.io-client'


//授权成功的同步action
export const authSuccess = (data) => ({type:AUTH_SUCCESS,data})
//错误提示信息的同步action
export const errorMsg = (data) => ({type:ERROR_MSG,data})
//接收用户的同步action
export const receiveUser = (data) => ({type:RECEIVE_USER,data})
//重置用户的同步action
export const resetUser = (data) => {
	//退出登录时需要清空 io 否则再次登录不会 更新 数据库的socketid，就会收不到消息
	io.userid = undefined
	io.socket = undefined
	return {type:RESET_USER,data}
}
//接收用户列表数据的同步action
export const receiveUserList = (data) => ({type:RECEIVE_USER_LIST,data})
//接收消息列表的同步action
export const receiveMsgList = (data) => ({type:RECEIVE_MSG_LIST,data})
//接收一个消息的同步action
export const receiveMsg = (data) => ({type:RECEIVE_MSG,data})
//标记已读消息的同步action
export const readMsg = (data) => ({type:READ_MSG,data})



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
			initIO(response.data._id,dispatch)
			getMsgList(dispatch,response.data._id)
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
			initIO(response.data._id,dispatch)
			getMsgList(dispatch,response.data._id)
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
			initIO(response.data._id,dispatch)
			getMsgList(dispatch,response.data._id)
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

//异步发送消息的action 
export const sendMsg = ({ from,to,content }) => {
	return dispatch => {
		io.socket.emit('sendMsg',{ from,to,content });  //自定义sendMsg事件，发送‘你好服务器’字符串向服务器
	}
}

//标记已读消息的异步action
export const msgRead = (from,to) => {
	return async dispatch => {
		const response = await reqReadMsg({from})
		const count = response.data
		dispatch(readMsg({from,to,count}))
	}
}


function initIO (userid,dispatch) {
	if(!io.socket){
		//向指定的服务器建立连接，地址可以省略
		io.socket = io();
		io.socket.on("connect",() => {
			Toast.info("已连接")
			
			if(io.userid){
				io.socket.emit('sendUser',{userid:io.userid})
			}
			
			if(userid && !io.userid){
				io.userid = userid
				io.socket.emit('sendUser',{userid:userid})
			}
		})
		
		io.socket.on('error',() => {
			Toast.info("连接失败")
		})
		io.socket.on('connect_failed',() => {
			Toast.info("连接失败")
		})
		
		io.socket.on('receiveMsg',(data)=>{  //接收服务器的消息 receiveMsg事件
			console.log(data);
			data.userid = io.userid || userid
			dispatch(receiveMsg(data))
		});
	}
}


async function getMsgList(dispatch,userid){
	const response = await reqChatMsgList()
	if(response.code === 0){
		const { users,chatMsgs } = response.data
		dispatch(receiveMsgList({ users,chatMsgs,userid }))
	}
}