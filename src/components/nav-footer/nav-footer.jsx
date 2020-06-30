

/* 
	底部导航组件
 */

import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom' 
import './nav-footer.css'
const Item = TabBar.Item
class NavFooter extends React.Component {
	static propTypes = {
		navList:PropTypes.array.isRequired
	}
	render(){
		let { navList } = this.props
		navList = navList.filter(nav => !nav.hide)
		const path = this.props.location.pathname
		return (
			<div>
				<TabBar
					unselectedTintColor="#becad8"
					tintColor="#108ee9"
				>
					{ navList.map((item,index) => (
						<Item 
							title={item.text}
							icon={ {uri: require(`./images/${item.icon}.png`)} }
							selectedIcon={{uri:require(`./images/${item.icon}-selected.png`) }}
							onPress={ () => this.props.history.replace(item.path) }
							selected={ path === item.path }
							key={index}
							></Item>
					)) }
				</TabBar>
			</div>
		)
	}
}

export default withRouter(NavFooter)