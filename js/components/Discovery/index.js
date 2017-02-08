/**
 * Created by YT on 2017/2/7.
 */
import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Navigator} from 'react-native'
import Discovery from './Discovery'

class DiscoveryTab extends Component {
	//配置场景动画
	configureScene(route, routeStack) {
		return Navigator.SceneConfigs.PushFromRight; // 右侧弹出
	}

	//渲染场景
	renderScene(route, navigator) {
		return <route.component navigator={navigator}  {...route.passProps} />;
	}

	render() {
		return (
			<Navigator
				style={styles.descContent}
				initialRoute={{component: Discovery}}
				configureScene={this.configureScene}
				renderScene={this.renderScene}
			/>
		)
	}
}

const styles = StyleSheet.create({
	descContent: {
		flex: 1
	}
})

export default DiscoveryTab
