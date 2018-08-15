import React from 'react'
import UserCard from '../../component/usercard/usercard'

// 说明：引用UserCard组件，展示每条数据 path="genius"传递给子组件，用来提交redux里的数据请求
class Boss extends React.Component{
    render(){
        return (<UserCard path="genius"></UserCard>)
    }
}

export default Boss