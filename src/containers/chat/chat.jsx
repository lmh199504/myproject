
import React,{Component} from 'react'
import { List,NavBar,InputItem,Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { sendMsg } from '../../redux/actions'

const Item = List.Item
class Chat extends Component{
	
	state = {
		content:''
	}

	handleSend = () => {

		const from = this.props.user._id
		const to = this.props.match.params.userid
		const content = this.state.content.trim()
		
		if(content){
			this.props.sendMsg({from,to,content})
		}
		this.setState({
			content:''
		})
	}
	
	render() {
		return (
			<div id="chat-page">
				<NavBar>你好</NavBar>
				<List>
					<Item
						thumb={  require("../../assets/headers/1.jpg") }
					>
					你好啊
					</Item>
					
					<Item
						className="chat-me"
						thumb={  require("../../assets/headers/2.jpg") }
					>
					你好啊
					</Item>
					
					<Item
						thumb={  require("../../assets/headers/1.jpg") }
					>
					好个鬼啊
					</Item>
					
					<Item
						className="chat-me"
						thumb={  require("../../assets/headers/2.jpg") }
					>
					哦
					</Item>
				</List>
				
				<InputItem
					placeholder="请输入消息"
					value={this.state.content}
					extra={ <Button size="small" type="primary">发送</Button> }
					onExtraClick={() => {
						this.handleSend()
					}}
					onChange={ val => this.setState({content:val})}
				></InputItem>
			</div>
		)
	}
}

export default connect(
	state => ({user:state.user }),
	{sendMsg}
)(Chat)
