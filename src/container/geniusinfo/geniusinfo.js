import React from 'react'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import { NavBar,InputItem,TextareaItem, WhiteSpace,Button  } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'

@connect(
    state=>state.user,
    {update}
)
class GeniusInfo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title : '',
            desc : ''
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render() {
        const redirect = this.props.redirectTo
        const path = this.props.location.pathname
        return ( 
            <div>
                {redirect&&redirect!==path?<Redirect to={this.props.redirectTo}/>:null }
                <NavBar mode="dark" > 求职完善信息页 </NavBar>
                <AvatarSelector
                    selectAvator={(imgname)=>{
                        this.setState({
                            avatar : imgname
                        })
                    }}
                ></AvatarSelector>
                <InputItem
                    onChange={(val)=>this.onChange('title',val)}
                >
                    应聘职位
                </InputItem>
                <WhiteSpace/>
                <TextareaItem
                    onChange={(val)=>this.onChange('desc',val)}
                    rows={3}
                    autoHeight
                    title="个人简介"
                    placeholder="请输入职位要求"
                    data-seed="logId"
                    ref={el => this.autoFocusInst = el}
                />
                <Button 
                    type="primary"
                    onClick={
                        ()=>{
                            this.props.update(this.state)
                        }
                    }
                >保存</Button>
            </div>
        )
    }
}

export default GeniusInfo
