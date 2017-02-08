/**
 * Created by YT on 2017/2/7.
 */
import {category} from '../../constants/url'

/**
 * request category data
 * @param type
 * @param pageNo
 * @returns {Promise}
 */
export function requestCategoryData(type, pageNo) {
	//number of data per page : 10
	const url = category + type + '/10/' + pageNo
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				if (res.results.length > 0) {
					resolve(res.results)
				} else {
					reject({errCode: 1001, msg: '暂无数据'})
				}
			})
			.catch((err) => {
				console.log(err)
				reject({errCode: 1002, msg: '请求资源不存在或网路连接故障'})
			})
	})
}
