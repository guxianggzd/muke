import React from 'react'
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
// 组件说明：获取dashboard的props数据，filter筛选出boss还是genius并循环列表
// 组件库的TabBar和react-router不能完全配合，所以需要切换路由就用his.props.history.push()
// 激活对应的按钮active：获取路由信息

@withRouter
@connect(
    state=>state.chat
)
class NavLinkBar extends React.Component{
   
    render(){
        // 帅选数据
        const navList = this.props.data.filter(v=>!v.hide)
        const {pathname} = this.props.location
        return (
                <TabBar>
                {navList.map(v=>(
                    <TabBar.Item 
                        badge={v.path==='/msg' ? this.props.unread :'' }
                        key={v.path} 
                        title={v.text}
                        icon={{uri:require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                        selected={pathname===v.path}
                        onPress={()=>{
                            this.props.history.push(v.path)
                        }}
                    >

                    </TabBar.Item>
                ))}
                </TabBar>
        )
    }
}
// 属性校验 : 如果上层组件没有传递data就会报错
NavLinkBar.propTypes = {
    data: PropTypes.array.isRequired
};


export default NavLinkBar