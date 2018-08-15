import React from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import Logo from './../../component/logo/logo'
import { List, Radio,InputItem ,WhiteSpace,Button } from 'antd-mobile'
import {register} from '../../redux/user.redux'

@connect(
    state => state.user,
    {register}
)

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user : '',
            pwd  :'',
            repeatpwd : '',
            type : 'genius' // boss
        }
        this.handelRegister = this.handelRegister.bind(this)
    }
    
    // 获取输入的值
    handelChange(key,val){
        this.setState({
            [key] : val
        })
    }
    // 提交
    handelRegister(){
        this.props.register(this.state)
    }
    
    render(){
        console.log(this.props)
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}
                <Logo></Logo>
                {this.props.msg?<p>{this.props.msg}</p>:null}
                <List>
                    <InputItem
                        onChange={val=>this.handelChange('user',val)}
                    >用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={val=>this.handelChange('pwd',val)}
                    >密码</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={val=>this.handelChange('repeatpwd',val)}
                    >确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem 
                        checked={this.state.type === 'genius'}
                        onChange={()=>this.handelChange('type','genius')}
                    >
                        求职
                    </RadioItem>
                    <WhiteSpace/>
                    <RadioItem 
                        checked={this.state.type === 'boss'}
                        onChange={()=>this.handelChange('type','boss')}
                    >
                        Boss
                    </RadioItem>
                    <Button type="primary" onClick={this.handelRegister}>注册</Button>
                </List>

            </div>
            
        )
    }
}
export default Register
// const mapstateToProps=(state)=>{
//     return {user:state.user}
// }



  
//export default connect(mapstateToProps,{register})(Register)



