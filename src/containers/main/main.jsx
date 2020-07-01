
import React,{ Component } from 'react'
import { Switch,Route,Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Cookies from 'js-cookie'
import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Dashen from '../dashen/dashen'
import Laoban from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'
import { getRedirectTo } from '../../utils/index'

import {getUser} from '../../redux/actions'

import { NavBar } from 'antd-mobile'
class Main extends Component {
	
	navList = [ //给组件对象添加属性
		{
			path:'/laoban',
			component:Laoban,
			title:'大神列表',
			icon:'dashen',
			text:'大神'
		},{
			path:'/dashen',
			component:Dashen,
			title:'老板列表',
			icon:'laoban',
			text:'老板'
		},{
			path:'/message',
			component:Message,
			title:'消息列表',
			icon:'message',
			text:'消息'
		},{
			path:'/personal',
			component:Personal,
			title:'个人中心',
			icon:'personal',
			text:'个人'
		}
	]
	
	
	
	componentDidMount (){
		//登陆过（cookie中有userid），但没有登陆（redux管理的user中没有userid）发请求获取对应的user：
		const userid = Cookies.get('userid')
		const { _id } = this.props.user
		if(userid && !_id){
			this.props.getUser()
		}
	}
	
	render(){
		
		//读取cookie 中的userid 
		const userid = Cookies.get('userid')
		//如果 没有userid 自动重重定向到登陆界面
		if(!userid){
			return <Redirect to='/login'/>
		}
		//存在userid，读取redux中的user状态
		const {user} = this.props
		//如果user中没_id ，返回null（不做任何显示）
		if(!user._id){
			return null
			// return <Redirect to="/login" />
		}else{
			//如果有_id ,显示对应页面
			let path = this.props.location.pathname
			//如果请求根路径 根据user的type和header来计算出一个重定向的路径，
			if(path === '/'){
				path = getRedirectTo(user.type,user.header)
				return <Redirect to={path} />
			}
		}
		
		
		//根据userid的type和header来计算出一个重定向的路由路径，并自动重定向.
		
		//检查用户是否登陆，如果没有，重定向到'/login'
		
		const { navList } = this
		const path = this.props.location.pathname
		const currentNav = navList.find(nav => path === nav.path)
		
		if(currentNav){
			if(user.type === 'laoban'){
				navList[1].hide = true
			}else{
				navList[0].hide = true
			}
		}
		
		return (
			
			<div>

				{ currentNav ? <NavBar className="main_header">{currentNav.title}</NavBar> :null }
				<Switch>
					{
						navList.map((item,index) => (
							<Route path={item.path} component={item.component} key={index}></Route>
						))
					}
					<Route path="/laobaninfo" component={LaobanInfo}></Route>
					<Route path="/dasheninfo" component={DashenInfo}></Route>
					<Route path="/chat/:userid" component={Chat}></Route>
					<Route component={NotFound}/>
				</Switch>
				{ currentNav ? <NavFooter  navList={navList}/> :null }
				
			</div>	
		)
	}
}

export default connect(
	state => ({user:state.user}),
	{ getUser }
)(Main)


/* 
实现自动登陆
	1.componentDidMount()
		登陆过（cookie中有userid），但没有登陆（redux管理的user中没有userid）发请求获取对应的user：
	2.render（）	
		1).如果cookie中有userid，进入login
		2).判断redux管理的user中是否有_id,如果没有，暂时不做任何显示
		3）.如果有，说明当前已经登陆，显示对应的界面
		4）.如果请求根路径：根据user的type和header来计算出一个重定向的路由路径，并自动重定向

 */