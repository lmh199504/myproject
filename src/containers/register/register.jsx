
import React,{ Component } from 'react'

import {
	NavBar,
	WingBlank,
	List,
	InputItem,
	Radio,
	Button,
	WhiteSpace
} from 'antd-mobile'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/actions'
import Logo from '../../components/logo/logo'

const ListItem = List.Item

class Register extends Component {
	
	state = {
		username:'', //用户名
		password:'',
		password2:'',
		type:'dashen'  //用户类型 
	}
	
	register = () => {
		this.props.register(this.state)
	}
	handleChange = (name,val) => {
		this.setState({
			[name]:val
		})
	}
	toLogin = () => {
		this.props.history.replace('/login')
	}
	
	render(){
		const { type } = this.state
		const { redirectTo } = this.props.user

		if(redirectTo){
			return <Redirect to={redirectTo}/>
		}
		
		
		return (
			<div>
				<NavBar>BOSS直聘</NavBar>
				<WhiteSpace></WhiteSpace>
				<Logo/>
				<WingBlank>
					<List>
						<InputItem onChange={ val => {this.handleChange('username',val)} }>用户名:</InputItem>
						<InputItem type="password" onChange={ val => {this.handleChange('password',val)} }>密&nbsp;&nbsp;&nbsp;码:</InputItem>
						<InputItem type="password" onChange={ val => {this.handleChange('password2',val)} }>确认密码:</InputItem>
						<ListItem>
							<span>用户类型:</span>
							&nbsp;&nbsp;&nbsp;
							<Radio checked={ type==='dashen' } onChange={ () => {this.handleChange('type','dashen')} }>大神</Radio>
							&nbsp;&nbsp;&nbsp;
							<Radio checked={ type==='laoban' } onChange={ () => {this.handleChange('type','laoban')} }>老板</Radio>
						</ListItem>
					</List>
					<WhiteSpace></WhiteSpace>
					<Button type="primary" onClick={ this.register }>注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</Button>
					<WhiteSpace></WhiteSpace>
					<Button onClick={ this.toLogin }>已有账号</Button>
				</WingBlank>
			</div>	
			
		)
	}
}


export default connect(
	state=>({user:state.user}),
	{register}
)(Register)