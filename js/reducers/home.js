import * as types from '../actions/actionTypes'

const initialState = {
	dataSource: {}
}

export default function homeReducer(state = initialState, action) {
	switch (action.type) {
		case types.FETCH_HOME_DATA: {
			return Object.assign({}, state, {
				dataSource: action.data
			})
		}
		default:
			return state
	}
}
