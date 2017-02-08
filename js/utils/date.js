/**
 * Created by YT on 2017/1/20.
 */
import moment from 'moment'

export function getCurrentDate() {
	var currentDate = moment().format('YYYY/MM/DD')
	return currentDate
}

/**
 * 返回间隔时间
 * @param interval number day
 */
export function getIntervalDate(interval) {
	let date = moment().add(interval, 'd')
	return date.format('YYYY/MM/DD')
}
