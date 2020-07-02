

import React,{Component} from 'react'
import { WingBlank,WhiteSpace,Card } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'



class UserList extends Component{
	
	static propTypes = {
		userList:PropTypes.array.isRequired
	}
	
	render(){
		const { userList } = this.props
		return (
			<WingBlank style={{marginBottom:60,marginTop:50}}>
					<QueueAnim type="scale">
						{
							userList.map(item => (
								<div key={ item._id }>
									<WhiteSpace />
									<Card onClick={ () => this.props.history.push(`/chat/${item._id}`) }>
										<Card.Header
											thumb={ item.header ? require(`../../assets/headers/${item.header.replace('头像','')}.jpg`) : require(`../../assets/headers/timg.jpg`) }
											thumbStyle={ {width:50,borderRadius:25} }
											extra={<span>{ item.username }</span>}
										/>
										<Card.Body>
											<div>职位:{item.post }</div>
											{item.company ?<div>公司:{item.company }</div>:null }
											{item.company ?<div>月薪:{item.salary }</div>:null }
											<div>简介:{item.info }</div>
										</Card.Body>
									</Card>
								</div>
							
							))
						}
					</QueueAnim>
					
					
					
			</WingBlank>

		)
	}
}

export default withRouter(UserList)