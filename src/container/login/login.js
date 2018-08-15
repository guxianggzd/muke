import React from 'react'
import Logo from './../../component/logo/logo'
import {Redirect} from 'react-router-dom'
import { List, InputItem ,WingBlank,WhiteSpace,Button } from 'antd-mobile';
import {connect} from 'react-redux'
// 引入登录的redux
import {login} from '../../redux/user.redux'
// 引入高阶组件
import   Form   from "../../component/form/form";




// 引入高阶组件 ： handelChange,state
@connect(
    state =>state.user,
    {login}
)
@Form



class Login extends React.Component{
    constructor(props){
        super(props)
        // state从高阶组件获取
        // this.state = {
        //     user:'',
        //     pwd : ''
        // }
        this.register = this.register.bind(this)
        this.handelLogin = this.handelLogin.bind(this)
    }
   
    // 跳转到注册页
    register(){
        this.props.history.push('/register')
    }
    // 获取输入的值 : 这个方法从高阶组件获取，现在先注释了，方便查看
    // handelChange(key,val){
    //     this.setState({
    //         [key] : val
    //     })
    // }
    // 点击登录按钮
    handelLogin(){
        console.log(this.props.user)
        //this.props.login(this.state)
        this.props.login(this.props.state)
    }
    render(){
        return (
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}
                <Logo></Logo>
                {this.props.msg?<p>{this.props.msg}</p>:null}
                <h2>我是登录页面</h2>
                <WingBlank>
                    <List>
                        {/* onChange={val=>this.handelChange('user',val)}> */}
                        <InputItem
                            onChange={val=>this.props.handelChange('user',val)}>
                        用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem 
                            type="password"
                            onChange={val=>this.props.handelChange('pwd',val)}>
                        密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button 
                        onClick={this.handelLogin}
                        type="primary">登录</Button>
                    <WhiteSpace/>
                    <Button 
                        onClick={this.register} type="primary"
                    >注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login