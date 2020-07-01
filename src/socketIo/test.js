
import io from 'socket.io-client'

const socket = io('http://localhost:4000');
//向指定的服务器建立连接，地址可以省略
socket.emit('sendMsg',{time:new Date().getTime(),msg:"你好服务器"});  //自定义sendMsg事件，发送‘你好服务器’字符串向服务器

socket.on('receiveMsg',(data)=>{  //接收服务器的消息 receiveMsg事件

	console.log(data);//你好浏览器
});



// setInterval(() => {
// 	socket.emit('sendMsg',{time:new Date().getTime(),msg:"你好服务器"});
// },5000)
