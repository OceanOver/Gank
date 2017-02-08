/**
 * Created by YT on 2017/2/6.
 */
const dailyKey = 'daily'

export function saveStorageData(id, data) {
	global.storage.clearMapForKey(dailyKey).catch((err) => {
		console.log('storage.js + 清除缓存错误' + err)
	})
	setTimeout(()=>{
		global.storage.save({
			key: dailyKey,  // 注意:请不要在key中使用_下划线符号!
			id: id,
			rawData: data,
			// 如果不指定过期时间，则会使用defaultExpires参数
			// 如果设为null，则永不过期
			expires: 1000 * 3600 * 24
		}).catch((err) => {
			console.log('storage.js + 缓存错误' + err)
		})
	},1000)
}

export function loadStorageData(id) {
	return new Promise((resolve, reject) => {
		// 读取
		global.storage.load({
			key: dailyKey,
			id: id,
			// autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
			autoSync: false
		}).then(res => {
			resolve(res)
		}).catch(err => {
			if (err.name === 'NotFoundError' || err.name === 'ExpiredError') {
				resolve('NotFound')
			} else {
				reject(err)
			}
		})
	})
}
