import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../actions/discovery'
import * as CommonActions from '../../actions/common'
import {StyleSheet, View, Text, Dimensions} from 'react-native'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import theme from '../../constants/theme'
import DiscoveryPage from './DiscoveryPage'

var {width}=Dimensions.get('window')
class Discovery extends Component {
	constructor(props) {
		super(props)
		this.tabItems = ['Android', 'iOS', '前端', 'App', '休息视频', '拓展资源', '瞎推荐', '福利']
	}

	renderTabPages() {
		const {data, actions,navigator,commonActions} = this.props
		return this.tabItems.map((item, index) => {
			let dataSource = data[item]
			return (
				<DiscoveryPage
					tabLabel={item}
					type={item}
					key={index}
					dataSource={dataSource}
					actions={actions}
					navigator={navigator}
					commonActions={commonActions}
				/>
			)
		})
	}

	render() {
		return (
			<View style={styles.descContent}>
				<View style={[styles.statusBar,{backgroundColor:theme.mainColor}]}/>
				<ScrollableTabView
					tabBarBackgroundColor={theme.mainColor}
					tabBarInactiveTextColor={'#FFFFFF'}
					tabBarActiveTextColor={'#7c7d7d'}
					tabBarUnderlineStyle={{backgroundColor:'#7c7d7d'}}
					tabBarPosition={'top'}
					initialPage={0}
					renderTabBar={() => <ScrollableTabBar/>}
				>
					{this.renderTabPages()}
				</ScrollableTabView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	descContent: {
		flex: 1
	},
	statusBar: {
		width: width,
		height: 20
	}
})

const mapStateToProps = (state) => {
	return {
		data: state.discoveryReducer
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(Actions, dispatch),
		commonActions: bindActionCreators(CommonActions, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Discovery)
