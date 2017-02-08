import Toast from 'react-native-root-toast'

export default class GankToast {
	static show(msg,option) {
		let customOption = {
			duration: 2000,
			position: -60,
		}
		if (option) {
			customOption = Object.assign({},customOption,option)
		}
		Toast.show(msg,customOption)
	}
}
