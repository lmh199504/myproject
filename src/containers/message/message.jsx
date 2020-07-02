
/*
Message 路由容器组件

*/

import React from 'react'
import { connect } from 'react-redux'
import { List,Badge } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief
function getLastMsg(chatMsgs,userid) {
	const lastMsgObjs = {}
	chatMsgs.forEach(msg => {
		
		//对msg 个体进行统计
		if(msg.to === userid && !msg.read){
			msg.unReadCount = 1
		}else{
			msg.unReadCount = 0
		}
		
		
		if(!lastMsgObjs[msg.chat_id]){ // 对象中没有
			lastMsgObjs[msg.chat_id] = msg
		}else{// 对象中有
		
			const unReadCount =  lastMsgObjs[msg.chat_id].unReadCount + msg.unReadCount
			
			if(msg.create_time > lastMsgObjs[msg.chat_id].create_time){
				lastMsgObjs[msg.chat_id] = msg
			}
			lastMsgObjs[msg.chat_id].unReadCount = unReadCount
		}
	})

	const lastMsgs = Object.values(lastMsgObjs)
	
	lastMsgs.sort(function(m1,m2){
		return m2.create_time - m1.create_time
	})
	return lastMsgs
}

class Message extends React.Component {
	render(){
		
		const { users,chatMsgs } = this.props.chat
		const { _id } = this.props.user  
		let lastMsgs = getLastMsg(chatMsgs,_id)
		lastMsgs.forEach(item=>{
			item.header = item.from === _id ? users[item.to].header : users[item.from].header
			item.username = item.from === _id ? users[item.to].username : users[item.from].username
		})
		chatMsgs.forEach(chat => {
			
		})
		console.log(lastMsgs)
		
		
		return(
			<div>
				<List style={{marginTop:45}}>
					{
						lastMsgs.map(item => (
							<Item
								key={item.chat_id}
								thumb={ require(`../../assets/headers/${item.header.replace('头像','')}.jpg`) }
								extra={<Badge text={item.unReadCount} overflowCount={99} />}
								arrow="horizontal"
								onClick={ () => this.props.history.push(`/chat/${item.from === _id ? item.to:item.from}`) }
								>
								{item.username}
								<Brief>{item.content}</Brief>
							</Item>
						))
					}

				</List>
				
			</div>
		)
	}
}

export default connect(
	state => ({chat:state.chat,user:state.user}),
	{}
)(Message)
