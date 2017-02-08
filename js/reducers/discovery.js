import * as types from '../actions/actionTypes'
import _ from 'lodash'

// Android | iOS | 休息视频 | 福利 | 拓展资源 | 前端 | 瞎推荐 | App
const initialState = {
	'Android': [],
	'iOS': [],
	'前端': [],
	'App': [],
	'休息视频': [],
	'拓展资源': [],
	'瞎推荐': [],
	'福利': []
}

export default function discoveryReducer(state = initialState, action) {
	switch (action.type) {
		case types.FETCH_CATE_DATA: {
			return Object.assign({}, state, {
				[action.category]: action.data
			})
		}
		case types.APPEND_CATE_DATA: {
			let array = state[action.category]
			let newArray = _.concat(array, action.data)
			return Object.assign({}, state, {
				[action.category]: newArray
			})
		}
		default:
			return state
	}
}
