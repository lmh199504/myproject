/* 
选择用户头像的UI组件 
 */

import React from 'react'
import { List,Grid } from 'antd-mobile'
import PropTypes from 'prop-types'
export default class HeaderSelector extends React.Component {
	
	constructor(props){
		super(props)
		this.headerImgs = []
		for(let i = 0;i<20;i ++){
			this.headerImgs.push({
				text:'头像' + (i+1),
				icon:require(`./headers/${(i+1)}.jpg`)
			})
		}
		
	}
	
	static propTypes = {
		setHeader:PropTypes.func.isRequired
	}
	
	state = {
		icon:null //图片对象
	}
	
	handleClick = ({text,icon}) => {
		this.setState({
			icon
		})
		
		this.props.setHeader(text)
		
	}
	
	render() {
		const { icon } = this.state
		const listHeader = !icon ? '选择头像' : (
			<div>
				已选择头像:
				<img src={ icon } alt="头像" style={{ width:'30px' }}/>
			</div>
		)
		return (
			
			<div>
				<List renderHeader={() => listHeader}>
					<Grid data={this.headerImgs} columnNum={5} onClick={this.handleClick}></Grid>
				</List>
			</div>
		)
	}
}