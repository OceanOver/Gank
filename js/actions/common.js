/**
 * Created by YT on 2017/2/1.
 */
import * as types from './actionTypes'

/**
 * @param hide  bool
 */
export function hideTabbar(hide) {
	return {
		type: types.HIDE_TABBAR,
		data: hide
	}
}
