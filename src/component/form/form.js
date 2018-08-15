
import React from "react";
    
// 获取输入的值,改变state
export default function Form(Comp){

    return class NewComponent extends React.Component{
        constructor(props){
            super(props)
            this.state = {}
            this.handelChange = this.handelChange.bind(this)
        }

        handelChange(key,val){
            this.setState({
                [key] : val
            })
        }

        render(){
            return <Comp handelChange={this.handelChange} state={this.state} {...this.props}></Comp>
        }
    }
}