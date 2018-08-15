import axios from 'axios'
import {getRedirectPath} from '../util'
// 注册失败
const ERROR_MSG = 'ERROR_MSG' 

// 登录失败
const LOAD_DATA = 'LOAD_DATA'

// 无论是登录、注册、补全信息都认为是验证的一部分
const AUTH_SUCESS = 'AUTH_SUCESS'

//退出登录
const LOGOUT = 'LOGOUT'

// 用户初始状态
const initState = {
    redirectTo:'',// 登录成功后跳转
    //isAuth : false, //用户是否登录
    msg : '',// 错误提示
    user : '',
    type : ''
}

// reducer
export function user(state = initState,action){
    switch(action.type){
        // 加载数据
        case LOAD_DATA :
            return {...state,...action.data}
        // login register
        case AUTH_SUCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.data),...action.data,pwd:''}
        // 注册失败
        case ERROR_MSG :
            return {...state,isAuth:false,msg:action.msg}
        // 退出登录 ：把初始信息放入
        case LOGOUT : 
            return {...initState,redirectTo:'/login'}
        default : 
            return state
    }
}

// 登录，注册，补全信息
export function authSucess(data){
    return {type:AUTH_SUCESS,data:data}
}

// 退出登录
export function logoutSubmit(){
    return {type:LOGOUT}
}

// 注册错误action
function errorMsg(msg){
   return { type:ERROR_MSG , msg:msg }
}

//登陆后获取信息放到redux
export function loadData(userinfo) {
    return {type:LOAD_DATA,data:userinfo}
}

// 校验输入
export function register({user,pwd,repeatpwd,type}){
    if(!user || !pwd || !repeatpwd || !type){
        return errorMsg("补全每一项")
    }
    if(pwd!==repeatpwd){
        return errorMsg("两次密码输入不一致")
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
            .then(res=>{
                // 成功：提交registerSuccess的actionCreator
                if(res.status === 200 && res.data.code===0){
                    dispatch(authSucess({user,pwd,type}))
                }else{
                    // 失败 ：提交errorMsg的actionCreator
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

// 登录
export function login({user,pwd}){
    if(!user || !pwd){
        return errorMsg("补全每一项")
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
            //判断用户是否登录
            .then(res=>{
                if(res.status === 200 && res.data.code===0){
                    // 后台返回的信息：user和用于跳转的type
                    dispatch(authSucess(res.data.data))
                    console.log(res.data.data)
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}



// 账号补全信息补全信息
export function update(state) {
    return dispatch=>{
        axios.post('/user/update',state).then(res=>{
                if(res.status === 200 && res.data.code===0){
                    // 后台返回的信息：user和用于跳转的type
                    dispatch(authSucess(res.data.data))
                    console.log(res.data.data)

                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}


