import React, {Component, PropTypes} from 'react';
import {StyleSheet, Image} from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import {connect} from 'react-redux'
import HomeTab from './Home'
import DiscoveryTab from './Discovery'
import MoreTab from './More'
import Icon from 'react-native-vector-icons/Ionicons'
import theme from '../constants/theme'

class TabController extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedTab: 'home'
		}
	}

	componentWillMount() {
		const {normalColor, selectedColor} = theme.tabBar
		Icon.getImageSource('ios-home-outline', 20, normalColor).then((source) => this.setState({homeNormal: source}));
		Icon.getImageSource('ios-compass-outline', 20, normalColor).then((source) => this.setState({discoveryNormal: source}));
		Icon.getImageSource('ios-more-outline', 20, normalColor).then((source) => this.setState({moreNormal: source}));
		Icon.getImageSource('ios-home', 20, selectedColor).then((source) => this.setState({homeSelected: source}));
		Icon.getImageSource('ios-compass', 20, selectedColor).then((source) => this.setState({discoverySelected: source}));
		Icon.getImageSource('ios-more', 20, selectedColor).then((source) => this.setState({moreSelected: source}));
	}

	renderTabBarItem(title, tabName, icon, selectedIcon, component) {
		const {selectedTab} = this.state
		return (
			<TabNavigator.Item
				title={title}
				selectedTitleStyle={styles.tabBarItemSelectedTitle}
				selected={selectedTab === tabName}
				renderIcon={() => <Image style={styles.tabBarItemIcon} source={icon} />}
				renderSelectedIcon={() => <Image style={styles.tabBarItemIcon} source={selectedIcon} />}
				onPress={() => this.setState({ selectedTab: tabName })}>
				{component}
			</TabNavigator.Item>
		)
	}


	render() {
		const {homeNormal, discoveryNormal, collectionNormal, moreNormal} = this.state
		const {homeSelected, discoverySelected, collectionSelected, moreSelected} = this.state
		const {tabBarHeight} = this.props
		return (
			<TabNavigator
				tabBarStyle={{ height: tabBarHeight, overflow: 'hidden' }}
				sceneStyle={{ paddingBottom: tabBarHeight }}>
				{this.renderTabBarItem('首页', 'home', homeNormal, homeSelected, <HomeTab/>)}
				{this.renderTabBarItem('发现', 'discovery', discoveryNormal, discoverySelected, <DiscoveryTab/>)}
				{this.renderTabBarItem('更多', 'more', moreNormal, moreSelected, <MoreTab/>)}
			</TabNavigator>
		);
	}
}

const styles = StyleSheet.create({
	tabBarItemIcon: {
		width: 20,
		height: 20
	},
	tabBarItemSelectedTitle:{
		color:theme.tabBar.selectedColor
	}
})

const mapStateToProps = (state) => {
	return {
		tabBarHeight: state.commonReducer.tabBarHeight
	}
}

const mapDispatchToProps = (dispatch) => {
	return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(TabController)


