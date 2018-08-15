import React from 'react'
import {connect} from 'react-redux'
import { List,Badge } from 'antd-mobile';
@connect(
    state=>state
)
class Msg extends React.Component{
    // 获取最后一条数据
    getLast(arr){
        return arr[arr.length-1]
    }
    
    render(){
        let Item = List.Item
        const Brief=Item.Brief

        // 获取当前登录账户
        const userid = this.props.user._id
        // 获取所有用户信息
        const userinfo = this.props.chat.users
        // 按照聊天用户分组，根据chatid
        let msgGroup = {}
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
            console.log(v.chatid)
        })
        console.log(msgGroup)

        // 根据时间戳排序，最新的回复在最上面
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last - a_last
        })
        
        return (
            <div>
                   {chatList.map(v=>{
                        const lastItem = this.getLast(v)
                        // 获取最后一次聊天发送方
                        const targetId = v[0].from === userid?v[0].to:v[0].from
                        // 未读消息条件：to = 当前登录用户，说明消息是本人发送
                        const unreadNum = v.filter(v=>!v.read&&v.to===userid).length
                        if(!userinfo[targetId]){return null}
                        // 昵称
                        const name = userinfo[targetId]
                                        ?userinfo[targetId].name
                                        :''
                        // const avatar = userinfo[targetId]
                        //                 ?userinfo[targetId].avatar
                        //                 :''
                        return(
                        <List key={lastItem._id}>
                           <Item
                                arrow="horizontal"
                                extra={<Badge text={unreadNum}></Badge>}
                                thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                                onClick={()=>{
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                           >
                               {lastItem.content}
                               <Brief>{name}</Brief>
                           </Item> 
                        </List>
                        )
                    })}
            </div>
        )
    }   
}

export default Msg