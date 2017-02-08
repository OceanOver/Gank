/**
 * Created by YT on 2017/2/1.
 */
import * as types from '../actions/actionTypes'

const initialState = {
	tabBarHeight: 49
}

export default function commonReducer(state = initialState, action) {
	switch (action.type) {
		case types.HIDE_TABBAR: {
			let tabBarHeight = 49
			if (action.data) {
				tabBarHeight = 0
			}
			return Object.assign({}, state, {
				tabBarHeight: tabBarHeight
			})
		}
		default:
			return state
	}
}
