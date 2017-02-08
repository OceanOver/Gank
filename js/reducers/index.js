import {combineReducers} from 'redux'
import homeReducer from './home'
import discoveryReducer from './discovery'
import moreReducer from './more'
import commonReducer from './common'

const rootReducer = combineReducers({
	homeReducer, discoveryReducer, moreReducer, commonReducer
})

export default rootReducer
