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
class BossInfo extends React.Component {
     
    constructor(props) {
		super(props)
		this.state = {
			title:'',
			desc:'',
			company:'',
			money:''
		}
    }
    
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    
    render() {
        const redirect = this.props.redirectTo
        const path = this.props.location.pathname
        console.log(path)
        return ( 
            <div>
                {redirect&&redirect!==path?<Redirect to={this.props.redirectTo}/>:null }
                <NavBar mode="dark" > BOSS完善信息页 </NavBar>
                <AvatarSelector
                    selectAvator={(imgname)=>{
						this.setState({
							avatar:imgname
						})
					}}
                ></AvatarSelector>
                <InputItem
                    onChange={(val)=>this.onChange('title',val)}
                >
                    招聘职位
                </InputItem>
                <WhiteSpace/>
                <InputItem
                    onChange={(val)=>this.onChange('company',val)}
                >
                    公司名称
                </InputItem>
                <WhiteSpace/>
                <InputItem
                    onChange={(val)=>this.onChange('money',val)}
                >
                    职位薪资
                </InputItem>
                <WhiteSpace/>
                <TextareaItem
                    onChange={(val)=>this.onChange('desc',val)}
                    rows={3}
                    autoHeight
                    title=" 职位要求"
                    placeholder="请输入职位要求"
                    data-seed="logId"
                    ref={el => this.autoFocusInst = el}
                />
                <WhiteSpace/>
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

export default BossInfo
