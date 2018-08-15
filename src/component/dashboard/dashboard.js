import React from 'react'
import {connect} from 'react-redux'
import {Switch,Route} from 'react-router-dom'
import { NavBar } from 'antd-mobile';
import NavLinkBar from '../../component/navlink/navlink'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import Msg from '../msg/msg'
import User from '../../container/user/user'
import {getMsgList,recvMsg} from './../../redux/chat.redux'

@connect(
    state=>state,
    {getMsgList,recvMsg}
)



export default class DashBoard extends React.Component{
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()  
            this.props.recvMsg()
        }
    }

    render(){
        const {pathname} = this.props.location
        // 获取redux数据
        const user = this.props.user
        const navList = [
            {
                path : '/boss',
                text : '求职',
                icon : 'boss',
                title : '求职者列表',
                component : Boss,
                hide : user.type === 'genius'
            },
            {
                path : '/genius',
                text : 'boss',
                icon : 'job',
                title : '招聘列表' ,
                component : Genius,
                hide : user.type === 'boss' 
            },
            // 个人中心
            {
                path : '/me',
                text : '我',
                icon : 'user',
                title : '个人中心' ,
                component : User,
            },
            // 消息列表 msg
            {
                path : '/msg',
                text : '消息',
                icon : 'msg',
                title : '消息列表' ,
                component : Msg
            }
        ]

        return (
            <div>
            <NavBar className="fixd-header" mode="dark">
                {navList.find(v=>v.path===pathname).title}
            </NavBar>
            <NavLinkBar data={navList}></NavLinkBar>
            <div style={{marginTop:45}}>
                <Switch>
                    {
                       navList.map(v=>(
                           <Route key={v.path} path={v.path} component={v.component}></Route>
                       ))
                    }
                </Switch>
            </div>
           
            </div>
        )
    }
}

