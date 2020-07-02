
/*
大神主界面 路由容器组件

*/

import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/actions'

import UserList from '../../components/user-list/user-list'

class Dashen extends React.Component {
	
	componentDidMount(){
		this.props.getUserList({type:'laoban'})
	}
	render(){
		const {userList} = this.props
		
		return(
			<div>

				<UserList userList={userList} />
			</div>
		)
	}
}

export default connect(
	state => ({userList:state.userList}),
	{getUserList}
)(Dashen)
