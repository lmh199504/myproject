
import React,{ Component } from 'react'
import Logo from '../../components/logo/logo'
import {
	NavBar,
	WhiteSpace,
	WingBlank,
	Button,
	List,
	InputItem
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/actions'


class Login extends Component {

	state = {
		username:'',
		password:''
	}

	login = () => {
		this.props.login(this.state)
		// console.log()
	}
	handleChange = (name,val) => {
		this.setState({
			[name]:val
		})
	}
	toRegister = () => {
		this.props.history.replace('/register')
	}
	render(){
		const { redirectTo } = this.props.user
		
		if(redirectTo){
			return <Redirect to={redirectTo}/>
		}
		
		return (
			<div>
				<NavBar>登陆</NavBar>
				<WhiteSpace></WhiteSpace>
				<Logo></Logo>
				<WingBlank>
					<List>
						<InputItem onChange={ val => {this.handleChange('username',val)} }>用户名:</InputItem>
						<InputItem type="password" onChange={ val => {this.handleChange('password',val)} }>密&nbsp;&nbsp;&nbsp;码:</InputItem>
					</List>
					<WhiteSpace></WhiteSpace>
					<Button type="primary" onClick={ this.login }>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;陆</Button>
					<WhiteSpace></WhiteSpace>
					<Button onClick={ this.toRegister }>没有账号</Button>
				</WingBlank>
			</div>	
		)
	}
}
export default connect(
	state=>({user:state.user}),
	{ login }
)(Login)