import * as types from './actionTypes'

export function test() {
	return {
		type: types.TEST
	}
}

/**
 *
 * @param category string
 * @param data array
 * @returns {{type, category: *, data: *}}
 */
export function fetchCategoryData(category, data) {
	return {
		type: types.FETCH_CATE_DATA,
		category: category,
		data: data
	}
}

/**
 *
 * @param category string
 * @param data array
 * @returns {{type, category: *, data: *}}
 */
export function appendCategoryData(category, data) {
	return {
		type: types.APPEND_CATE_DATA,
		category: category,
		data: data
	}
}
