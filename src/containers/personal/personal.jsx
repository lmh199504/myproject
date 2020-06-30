
/*
Personal 路由容器组件

*/

import React from 'react'
import { connect } from 'react-redux'
import { Result,List,WhiteSpace,Button,Modal } from 'antd-mobile' 
import Cookies from 'js-cookie'
import { resetUser } from '../../redux/actions'
const Item = List.Item
const Brief = Item.Brief

const alert = Modal.alert
class Personal extends React.Component {
	
	
	handleClick = () => {
		
		alert('退出','确认退出登陆吗？', [
			{ text: '取消', onPress: () => console.log('cancel'), style: 'default' },
			{ text: '确定', onPress: () => {
				Cookies.remove('userid')
				this.props.resetUser()
			}},
		]);
	}
	
	
	render(){
		const { user } = this.props
		console.log(user)
		return(
			<div style={{marginBottom:60,marginTop:40}}>
				<Result 
					img={ <img src={require(`../../assets/headers/${ user.header.replace('头像','') }.jpg`)}  style={{ width:40,borderRadius:20}} alt="头像"/> }
					title={ user.username}
					message={ user.type === 'laoban' ? user.company :'' }
				/>
				<List renderHeader={ () => '相关信息' }>
					<Item multipleLine>
						<Brief>职位:{ user.post }</Brief>
						<Brief>简介:{ user.info ? user.info: '暂无' }</Brief>
						{  
							user.salary ? <Brief>薪资:{ user.salary }</Brief> : null
						}
					</Item>
				</List>
				<WhiteSpace/>
				<List>
					<Button type="warning" onClick={ () => this.handleClick() }>退出登录</Button>
				</List>
			</div>
		)
	}
}

export default connect(
	state => ({user:state.user}),
	{resetUser}
)(Personal)
