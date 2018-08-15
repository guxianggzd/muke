// 检测路由组件
import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import {loadData} from '../../redux/user.redux'

import {connect} from 'react-redux'

@withRouter
@connect(
    state=>state.user,
    {loadData}
)

class AuthRoute extends React.Component{
    componentDidMount(){
        const publicList = ['/login','/register']
        // 获取当前页面的pathname
        const pathName = this.props.location.pathname
        //如果当前页面是登录页或者注册页，就不用获取用户信息
        if(publicList.indexOf(pathName) > -1){
            return null
        }
        // 其他页面，需要获取用户信息，并将信息记录到reducer
        axios.get('/user/info').then(res=>{
                if(res.status === 200){
                  if(res.data.code === 0){
                      // 有登录信息记录到reducer
                     this.props.loadData(res.data.data)
                  }else{
                    // 没有登录跳转到登录页
                    this.props.history.push('/login')
                  }
                }
                console.log(res.data)
            })  
        // 是否登录
        // 现在的url、login是不需要跳转的
        // 用户的type：身份是boss还是牛人
        // 用户是否完善信息（选择个人头像、个人简介）
    }
    render(){
        return (
            <p></p>
        )
    }
}

export default AuthRoute
