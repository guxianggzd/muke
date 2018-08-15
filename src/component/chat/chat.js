import React from 'react'
import {List,InputItem,NavBar,Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg,readMsg} from './../../redux/chat.redux'
import {getChatId} from './../../util'
// 全局请求
//import io from 'socket.io-client'
// 将输入信息发送
//const socket = io('ws://localhost:9093')

@connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg,readMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            text:'',
            msg : []
        }
    }
    componentDidMount(){
      
        if(!this.props.chat.chatmsg.length){
            // 加载消息列表   
            this.props.getMsgList()  
            this.props.recvMsg()
        }
    }
    // 组件被隐藏触发
    componentWillUnmount(){
        // 将对方发送的消息，read标记为true
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }
    handelSubmit(){
        //点击按钮发送消息,发送之后清空state
        const from = this.props.user._id // 消息发送方
        const to = this.props.match.params.user // 消息接收方:url中获取
        const msg = this.state.text
        this.props.sendMsg({from,to,msg}) 
        this.setState({
            text : ''
        })
    }
    render(){
       
        // 聊天目标
        const userid =this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        console.log(users)
        if(!users[userid]){
            return null
        }
        // this.props.user._id redux存储的当前登录用户的id
        const chatid = getChatId(userid,this.props.user._id)
        // 过滤数据
        const chatmsgs = this.props.chat.chatmsg.filter( v=>v.chatid===chatid )
        return (    
            <div id="chat-page">
                <NavBar mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={()=>{
                        this.props.history.goBack()
                    }}
                >
                    {users[userid].name}
                </NavBar>
                {chatmsgs.map(v=>{
                    // 头像
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    // 接收的消息显示在右边
                    return v.from === userid?(
                        <List key={v._id}>
                            <Item
                                thumb={avatar}
                            >{v.content}</Item>
                        </List>
                    ):(
                        <List key={v._id}>
                            <Item 
                                extra={<img alt="img" src={avatar} />}
                                className='chat-me'>
                                {v.content}
                            </Item>
                        </List>
                    )
                    //return (<p key={v._id}>{v.content}</p>)
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text:v})
                            }}
                            extra={<span onClick={()=>this.handelSubmit()}>发送</span>}
                        >信息</InputItem>
                    </List>
                  
                </div>
            </div>   
        )
    }
}

export default Chat