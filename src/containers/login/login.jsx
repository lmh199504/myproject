
import React,{ Component } from 'react'
import Logo from '../../components/logo/logo'
import {
	NavBar,
	WhiteSpace,
	WingBlank,
	Button,
	List,
	InputItem,
	Toast
} from 'antd-mobile'
import { reqLogin } from "../../api";

export default class Login extends Component {

	state = {
		username:'',
		password:''
	}

	login = () => {
		const { username,password } = this.state
		if(username !== '' && password !== ''){
			reqLogin({
				username,
				password
			}).then(res => {
				if(res.code === 0){
					Toast.success('登录成功')
					this.props.history.replace('/main')
				}
			})
		}else{
			Toast.info('请输入账号密码')
		}

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