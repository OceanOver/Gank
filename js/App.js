/**
 * Created by YT on 2017/1/19.
 */
import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux'
import {store} from './store'
import TabController from './components'
import { AsyncStorage } from 'react-native'
import Storage from 'react-native-storage'

class App extends Component {
	constructor(props) {
		super(props)
		//config storage
		global.storage = new Storage({
			// 存储引擎：对于RN使用AsyncStorage
			// 如果不指定则数据只会保存在内存中，重启后即丢失
			storageBackend: AsyncStorage,
			// 读写时在内存中缓存数据。默认启用。
			enableCache: true,
			// 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
			defaultExpires: 1000 * 3600 * 24
		})
	}

	render() {
		return (
			<Provider store={store}>
				<TabController />
			</Provider>
		);
	}
}

export default App;
