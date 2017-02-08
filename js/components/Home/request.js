/**
 * Created by YT on 2017/1/20.
 */
import {daily} from '../../constants/url'
import {saveStorageData, loadStorageData} from '../../utils/storage'
import {getCurrentDate} from '../../utils/date'

/**
 *
 * @param date string
 * @param fromCache bool
 * @returns {Promise}
 */
export function requestDailyData(date,fromCache) {
	const url = daily + date
	const currentDate = getCurrentDate()

	if (date === currentDate && fromCache) {
		return new Promise((resolve, reject) => {
			loadStorageData(currentDate)
				.then((res) => {
					if (res === 'NotFound') {
						fetch(url)
							.then((res) => res.json())
							.then((res) => {
								if (res.category.length > 0) {
									saveStorageData(currentDate, res)
									resolve(res)
								} else {
									reject({errCode: 1001, msg: '今日暂无推送'})
								}
							})
							.catch((err) => {
								//handle err
								reject({errCode: 1002, msg: '请求资源不存在或网路连接故障'})
							})
					} else {
						resolve(res)
					}
				})
				.catch((err) => {
					//handle err
					reject({errCode: 1002, msg: '请求资源不存在或网路连接故障'})
				})
		})
	} else {
		return new Promise((resolve, reject) => {
			fetch(url)
				.then((res) => res.json())
				.then((res) => {
					if (res.category.length > 0) {
						saveStorageData(currentDate, res)
						resolve(res)
					} else {
						reject({errCode: 1001, msg: '今日暂无推送'})
					}
				})
				.catch((err) => {
					//handle err
					reject({errCode: 1002, msg: '请求资源不存在或网路连接故障'})
				})
		})
	}
}
