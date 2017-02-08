import * as types from './actionTypes'

export function test() {
	return {
		type: types.TEST
	}
}

export function fetchDailyData(data) {
	return {
		type: types.FETCH_HOME_DATA,
		data: data
	}
}
