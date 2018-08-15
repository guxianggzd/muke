import React from 'react'
import { Grid,List } from 'antd-mobile';
import propTypes from 'prop-types';


class AvatarSelector extends React.Component{
   
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',')
            .map(item=>({
                icon:require(`../img/${item}.png`),
                text:item
            }))
        //显示新选择的头像
        const gridHeader = this.state.icon?
                            (<div>
                                <span>已选择头像</span>
                                <img style={{width:20}} src={this.state.icon} alt=""/>
                            </div>):
                            '请选择头像'
        return (
           <div>
                <List renderHeader={ ()=>{return gridHeader} }>
                    <Grid 
                        data={avatarList} 
                        columnNum={5}
                        onClick={elm=>{
                            this.setState(elm)
                            this.props.selectAvator(elm.text)
                        }}
                    />
                </List>     
           </div>
        )
    }
}
// 属性检测，头像选择必须需是函数
AvatarSelector.propTypes = {
    selectAvator: propTypes.func.isRequired
};

export default AvatarSelector