/* 
	老板路由组件
 */
import React from 'react'
import { connect } from 'react-redux'
import { NavBar,InputItem,TextareaItem,Button } from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
class LaobanInfo extends React.Component{
	
	state = {
		header:'',
		post:'',  //职位
		info:'', //个人或职位简介
		company:'', //公司名称
		salary:'' //月薪
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
				<NavBar>老板信息完善</NavBar>
				<HeaderSelector setHeader={this.setHeader}></HeaderSelector>
				<InputItem placeholder="请输入招聘职位" onChange={ val => this.handleChange('post',val) }>招聘职位:</InputItem>
				<InputItem placeholder="请输入公司名称" onChange={ val => this.handleChange('company',val) }>公司名称:</InputItem>
				<InputItem placeholder="请输入职位薪资" onChange={ val => this.handleChange('salary',val) }>职位薪资:</InputItem>
				<TextareaItem 
					title="职位要求:"
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
)(LaobanInfo)