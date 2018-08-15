import React from 'react'
import {connect} from 'react-redux'
import { Result, WhiteSpace,List, Modal } from 'antd-mobile'
import browserCookies from "browser-cookies";
import { logoutSubmit } from "../../redux/user.redux";
import { Redirect } from "react-router-dom";

// 组件说明：直接获取redux中的ueser,渲染页面


@connect(
    state=>state.user,
    {logoutSubmit}
)

class User extends React.Component{

    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }
    

    // 退出登录
    logout(){
        console.log(11)
        const alert =  Modal.alert;
        alert('注销', '确认退出登录吗', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                browserCookies.erase('userid')
                //window.location.href = window.location.href
                this.props.logoutSubmit()
            }},
        ])
    }

    render(){
        console.log(this.props)
        const props = this.props
        //list相关组件
        const Item = List.Item
        const Brief = Item.Brief        
        // 如果有redux里有用户信息，就正常渲染
        return props.user?(
            <div>
                <Result  
                    img={<img alt="img" src={require(`../img/${props.avatar}.png`)} style={{width:50}}/>}
                    title={props.user}
                    message={props.type==='boss'?props.company:null
                }
                />

                <List  renderHeader={()=>'简介'} >
                    <Item>
                        {props.title}
                        {props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                        {props.money?<Brief>薪资：{props.money}</Brief>:null}
                    </Item>
                </List>

                <WhiteSpace></WhiteSpace>

                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>

            </div>
        ):<Redirect to={props.redirectTo} />
    }
}

export default User