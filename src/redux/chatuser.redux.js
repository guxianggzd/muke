import axios from 'axios'


// 聊天对象列表，看到求职者或者boss你就可以和他聊天
// 1
const USER_LIST = 'USER_LIST'

const initState = {
    userList : []
}
// 3
export function chatuser(state=initState,action){
    switch(action.type){
        case USER_LIST :
            // 这个状态随时可能加其他的数据，所以需要先展开
            return {...state,userList:action.payload}
        default:
            return state
    }
}
// 2
export function userList(data){
    return {type:USER_LIST,payload:data}
}
// 4
export function getUserList(type){
    return dispatch=>{
        axios.get('/user/list?type='+type).then(res=>{
            if(res.data.code === 0){
                dispatch(userList(res.data.data))
            }
        })
    }
}




