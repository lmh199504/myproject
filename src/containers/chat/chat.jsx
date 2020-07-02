
import React,{Component} from 'react'
import { List,NavBar,InputItem,Button,Grid,Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { sendMsg } from '../../redux/actions'

const Item = List.Item
class Chat extends Component{
	
	state = {
		content:'',
		isShow:false
		
	}
	
	handleSend = () => {

		const from = this.props.user._id
		const to = this.props.match.params.userid
		const content = this.state.content.trim()
		
		if(content){
			this.props.sendMsg({from,to,content})
		}
		this.setState({
			content:'',
			isShow:false
		})
		
	}
	pushEmojis = (val) => {
		const content = this.state.content + val.text
		this.setState({
			content
		})
	}
	
	componentDidUpdate(prevProps,prevState){
		var t = document.body.clientHeight;
		window.scroll({ top: t, left: 0, behavior: 'smooth' });
	}
	componentDidMount(){
		var t = document.body.clientHeight;
		window.scroll({ top: t, left: 0, behavior: 'smooth' });
	}
	
	toggleFace(){
		const isShow = !this.state.isShow
		this.setState({
			isShow
		})
		
		setTimeout(() => {
			window.dispatchEvent(new Event('resize'))
		},0)
	}
	
	render() {
		const meId = this.props.user._id
		const targetId = this.props.match.params.userid
		const chatId = [meId,targetId].sort().join('_')
		
		const { users,chatMsgs } = this.props.chat
		if(!users[meId]){
			return null
		}
		const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
		const targetHeader = require(`../../assets/headers/${users[targetId].header.replace('头像','')}.jpg`)
		const meHeader = require(`../../assets/headers/${this.props.user.header.replace('头像','')}.jpg`)
		const targetName = users[targetId].username
		const emojis = ['😃','😄','😁','😆','😅','😂','😉','😊',
						'😇','😍','😘','☺','😋','😝','😐','😶',
						'😇','😍','😘','☺','😋','😝','😐','😶',
						'😇','😍','😘','☺','😋','😝','😐','😶',
						'😇','😍','😘','☺','😋','😝','😐','😶',
						'😇','😍','😘','☺','😋','😝','😐','😶',
						'😇','😍','😘','☺','😋','😝','😐','😶'
						
		]
		this.emojis = emojis.map(emoji => ({ text:emoji }))
		const { isShow } = this.state
		
		return (
			<div id="chat-page">
				<NavBar className="main_header" icon={<Icon type="left" onClick={ () => {this.props.history.goBack()} }/>} >{targetName}</NavBar>
				
				
				<List style={{marginTop:45,marginBottom:45}}>
					{
						msgs.map((msg,index) => {
							if(msg.to === meId){ //对方发送给我
								return (
								
									<Item
										key={index}
										thumb={  targetHeader }
									>
									{msg.content}
									</Item>
									
								)
							}else{
								return (
									<Item
										key={index}
										className="chat-me"
										thumb={  meHeader }
									>
									{msg.content}
									</Item>
								)
							}
						})
					}
				

					
					
				</List>
				
				<div className="am-tab-bar">
					<InputItem
						placeholder="请输入消息"
						value={this.state.content}
						onBlur={()=>{this.setState({isShow:false})}}
						extra={ <span><span style={{marginRight:5,verticalAlign:5}} onClick={() => {this.toggleFace()}}>😄</span><Button size="small" type="primary" style={{display:'inline-block'}} onClick={()=>this.handleSend()}>发送</Button></span> }
						onChange={ val => this.setState({content:val})}
					></InputItem>
					{
						isShow ? (<Grid
						data={this.emojis}
						columnNum={8}
						carouselMaxRow={4}
						isCarousel={true}
						onClick={ (val)=>{ this.pushEmojis(val)}}
					/>):null
					}
				</div>
			</div>
		)
	}
}

export default connect(
	state => ({user:state.user,chat:state.chat }),
	{sendMsg}
)(Chat)
