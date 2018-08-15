import axios from 'axios'
// 全局请求
import io from 'socket.io-client'
// 将输入信息发送
const socket = io('ws://localhost:9093')


// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 标识已读
const MSG_READ = 'MSG_READ'
// 接收后端消息
const MSG_RECV = 'MSG_RECV'

const initState = {
    // 所有消息
    chatmsg : [],
    users:{},
    //未读信息
    unread :0 
} 

export function chat(state=initState,action){
    switch(action.type){
        // 获取聊天列表
        case MSG_LIST : 
            return {...state,users:action.payload.users,chatmsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read&&v.to===action.payload.userid).length}
        // 读后台传来的消息
        case MSG_RECV :
            const n = action.payload.to === action.userid?1:0
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
        // 已读，未读数字清零,映射chatmsg
        case MSG_READ:
            const {from,num} = action.payload
            return {
                ...state,
                chatmsg:state.chatmsg.map(v=>({...v,read:from === v.from?true:v.read})),
                unread:state.unread-num}
        default :
            return state
    }
}

function msgList(msgs,users,userid){
    return {type:MSG_LIST,payload:{msgs,users,userid}}
}
function msgRecv(msg,userid){
    return {userid,type:MSG_RECV,payload:msg}
}
// num ：需要明确知道后端到底修改了几条数据（已读数量），然后前端相应减去这个数字就是未读
function msgRead({from,userid,num}){
    return {type : MSG_READ,payload:{from,userid,num}}
}

// 首次进入页面获取消息列表
export function getMsgList(){
    return (dispatch,getState)=>{
        axios.get('/user/getmsglist').then(res=>{
                if(res.status===200 && res.data.code===0){
                    console.log(getState())
                    // 获取当前用户登录ID
                    const userid = getState().user._id
                    dispatch(msgList(res.data.msgs,res.data.users,userid))
                }
            })
    }
}

// 点击发送按钮将信息发送给后端
export function sendMsg({from , to , msg}){
    return dispatch=>{
        socket.emit('sendmsg',{from , to , msg})
    }
}

//用户进入聊天页面接收
export function recvMsg(){
    return (dispatch,getState)=>{
        socket.on('recvmsg',function(data){
            // 获取当前用户登录ID
            const userid = getState().user._id
            console.log('recvmsg',data)
            dispatch(msgRecv(data,userid))
        })
    }
}

// 未读消息数量清空,传入to（发给谁）
export function readMsg(from){
    // getState，获取redux内已经登录的信息
    return (dispatch,getState)=>{
        axios.post('/user/readmsg',{from}).then(res=>{
                // 获取当前用户ID
                const userid = getState().user._id
                if(res.status === 200 && res.data.code === 0){
                    dispatch(msgRead({userid,from,num:res.data.num}))
                }
            })
    }
}