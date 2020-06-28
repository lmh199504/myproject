/* 
	大神路由组件
 */
import React from 'react'
import { connect } from 'react-redux'
import { NavBar,InputItem,TextareaItem,Button } from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
class DashenInfo extends React.Component{
	
	
	state = {
		header:'',
		post:'',  //职位
		info:'', //个人或职位简介
	}
	
	handleChange = (name,val) => {
		this.setState({
			[name]:val
		})
	}
	
	setHeader = (header) => {
		this.setState({
			header
		})
	}
	save = () => {
		console.log(this.state)
	}
	
	
	
	render() {
		return(
			<div>
				<NavBar>大神信息完善</NavBar>
				<HeaderSelector setHeader={this.setHeader}></HeaderSelector>
				<InputItem placeholder="请输入求职岗位" onChange={ val => this.handleChange('post',val) }>求职岗位:</InputItem>
				<TextareaItem 
					placeholder="请输入个人介绍"
					title="个人介绍:"
					rows={3}
					onChange={ val => this.handleChange('info',val) }
				></TextareaItem>
				<Button type="primary" onClick={this.save}>保存</Button>
			</div>
		)
	}
}

export default connect(
	state => ({}),
	{}
)(DashenInfo)