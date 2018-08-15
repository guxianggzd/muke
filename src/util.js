

export function getRedirectPath({type, avatar}){
	// 根据用户信息 返回跳转地址
	// user.type /boss /genius
	// user.avatar /bossinfo /geniusinfo 
	console.log(type)
	let url = (type==='boss')?'/boss': '/genius'
	if (!avatar) {
		url += 'info'
	}
	return url
}

// 用户id，聊天id，from和to的校验变成一个
export function getChatId(userId,targetId){
	return [userId,targetId].sort().join('_')
}