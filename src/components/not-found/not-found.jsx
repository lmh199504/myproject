

/* 
404 界面
 */

import React from 'react'
import { Button } from 'antd-mobile'

export default class NotFound extends React.Component {
	render(){
		return(
			<div>
				<div>找不到页面...</div>
				<Button onClick={ () => this.props.history.replace('/') }>回到首页</Button>
			</div>
			
		)
	}
}