import React  from 'react'
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import { Card, WhiteSpace,WingBlank } from 'antd-mobile';
import {getUserList} from '../../redux/chatuser.redux'
import { withRouter } from 'react-router-dom';
 

// 说明：组件需要接收boss/genius传递过来的属性path，用来提交redux里的getUserList方法
// 如果是boss，需要显示薪资和公司名称
@withRouter
@connect(
    state=>state.chatuser,
    {getUserList}
)

class UserCard extends React.Component{
   
   
    componentDidMount(){
        // 获取父组件传的path
        let pathname = this.props.path
        this.props.getUserList(pathname)
    }

    handelClick(v){
        console.log(this.props.history)
        this.props.history.push(`/chat/${v._id}`)
    }

    render(){
        
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userList.map(v=>(
                    // 如果有头像，渲染卡片，否则就返回空
                    v.avatar ? 
                        (
                        <Card 
                            key={v._id} 
                            onClick={()=>this.handelClick(v)}
                        >
                            <Card.Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            >
                            </Card.Header>
                            <Card.Body>
                                {this.props.path === 'boss'?<div>公司：{v.company}</div>:null}
                                {/* 每条描述信息都换行 */}
                                {v.desc.split('\n').map((d)=>(
                                    <div key={d}>{d}</div>
                                ))}
                                {/* 如果是boss，显示薪资 */}
                                {this.props.path === 'boss'?<div>薪资：{v.money}</div>:null}
                            </Card.Body>
                        </Card>):null
                ))}
            </WingBlank>
        )
    }
}

// 属性检测，头像选择必须需是函数
UserCard.propTypes = {
    userList: propTypes.array
};

export default UserCard