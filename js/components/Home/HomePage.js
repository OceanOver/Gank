import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../actions/home'
import * as CommonActions from '../../actions/common'
import {
	StyleSheet,
	View,
	Dimensions,
	ListView,
	Text,
	Image,
	RefreshControl,
	Alert,
	Animated,
	PanResponder,
	TouchableHighlight
} from 'react-native'
import NavigationBar from 'react-native-navbar'
import {SearchBar} from 'react-native-elements'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/Ionicons'
import theme from '../../constants/theme'
import colors from '../../constants/colors'
import HomeImage from './HomeImage'
import {requestDailyData} from './request'
import {getCurrentDate, getIntervalDate} from '../../utils/date'
import {GankToast} from '../../ui'
import SectionHeader from './SectionHeader'
import HomeRow from '../Base/ListViewRow'
import WebPage from '../Web'

var {width}=Dimensions.get('window')

class HomePage extends Component {
	constructor(props) {
		super(props)
		this.dateInterval = 0
		this.navBarDidHide = false
		this.navBarCanAnimate = true
		this.ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
			sectionHeaderHasChanged: (s1, s2) => s1 !== s2
		});
		this.state = {
			refreshing: false,
			navViewMarginTop: new Animated.Value(0),
			navViewOpacity: new Animated.Value(1)
		}
	}

	componentWillMount() {
		const {navViewMarginTop, navViewOpacity} = this.state
		//handle gesture
		this._panResponder = PanResponder.create({
			// 要求成为响应者
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderMove: (evt, gestureState) => {
				//从触摸操作开始时的累计纵向路程
				let y = gestureState.dy
				if (y > 20 && this.navBarCanAnimate && this.navBarDidHide) {
					this.navBarCanAnimate = false
					this.navBarDidHide = false
					Animated.parallel([
						Animated.timing(navViewMarginTop, {
							toValue: 0,
							duration: 300
						}),
						Animated.timing(navViewOpacity, {
							toValue: 1,
							duration: 300
						})
					]).start(() => {
						this.navBarCanAnimate = true
					})
				}
				if (y < -20 && this.navBarCanAnimate && !this.navBarDidHide) {
					this.navBarCanAnimate = false
					this.navBarDidHide = true
					Animated.parallel([
						Animated.timing(navViewMarginTop, {
							toValue: -44,
							duration: 300
						}),
						Animated.timing(navViewOpacity, {
							toValue: 0,
							duration: 300
						})
					]).start(() => {
						this.navBarCanAnimate = true
					})
				}
			}
		})

		//prepare icons
		Icon.getImageSource('ios-refresh-outline', 16, '#FFFFFF').then((source) => this.setState({refreshIcon: source}))
	}


	componentDidMount() {
		this.fetchData()
	}

	searchInputChange(e) {
		console.log(e)
	}

	fetchData(date = getCurrentDate(),fromCache = true) {
		const {actions} = this.props
		this.setState({refreshing: true})
		requestDailyData(date,fromCache)
			.then((res) => {
				this.setState({refreshing: false})
				actions.fetchDailyData(res)
				setTimeout(() => {
					GankToast.show('已获取最新干货')
				}, 500)
			})
			.catch((err) => {
				this.setState({refreshing: false})
				if (err.errCode === 1001) {
					(this.dateInterval) -= 1
					let param = getIntervalDate(this.dateInterval)
					this.fetchData(param)
				} else if (err.errCode === 1002) {
					this.alertNetWorkError(err.msg)
				}
			})
	}

	alertNetWorkError(msg) {
		Alert.alert(
			'请求失败',
			msg,
			[
				{
					text: '取消',
					onPress: () => {
						console.log('Foo Pressed!')
					}
				},
				{
					text: '重试',
					onPress: () => {
						this.fetchData()
					}
				}
			]
		)
	}

	renderSectionHeader(data, sectionID) {
		let color = colors.lightGreen
		if (sectionID === 'Android') {
			color = colors.orange
		} else if (sectionID === 'App') {
			color = colors.yellow
		} else if (sectionID === 'iOS') {
			color = colors.lightGreen
		} else if (sectionID === '拓展资源') {
			color = colors.lightBlue
		} else if (sectionID === '休息视频') {
			color = colors.purple
		} else if (sectionID === '前端') {
			color = colors.skyBlue
		}
		return (
			<SectionHeader title={sectionID} color={color}/>
		)
	}

	rowDidClicked(rowData) {
		const {navigator, commonActions} = this.props
		navigator.push({
			component: WebPage,
			passProps: {
				data: rowData,
				commonActions: commonActions
			},
			type: 'Normal'
		})
	}

	renderRow(rowData, sectionID, rowID, highlightRow, navTitleOpacity) {
		return (
			<HomeRow
				data={rowData}
				sectionID={sectionID}
				rowID={rowID}
				highlightRow={highlightRow}
				clickRowCb={this.rowDidClicked.bind(this)}
				showImage={true}
			/>
		)
	}

	render() {
		const {refreshing, navViewMarginTop, navViewOpacity, refreshIcon} = this.state
		const {data} = this.props
		//todo: add search
		const searchBar = (
			<SearchBar
				containerStyle={styles.searchBar}
				inputStyle={styles.searchInput}
				icon={{style:styles.searchIcon}}
				onChangeText={this.searchInputChange}
				placeholder='Type Here...'
			/>
		)

		const rightButton = (
			<TouchableHighlight
				underlayColor={theme.navBar.tintColor}
				onPress={() => {
						this.fetchData(getCurrentDate(),false)
					}}>
				<View style={styles.rightButton}>
					<Image style={styles.rightButtonImage} source={refreshIcon}/>
				</View>
			</TouchableHighlight>
		)

		//prepare dataSouce & listHeader
		let listHeader = null
		let dataSource = null
		if (data.results) {
			const homeImageData = data.results['福利'][0]
			const imgUrl = homeImageData.url
			const imgTitle = getCurrentDate()
			listHeader = (
				<HomeImage
					imgUrl={imgUrl}
					labelTitle={imgTitle}
				/>
			)
			let filterData = _.omit(data.results, '福利')
			dataSource = this.ds.cloneWithRowsAndSections(filterData)
		}

		//prepare refreshControl
		const refreshControl = (
			<RefreshControl
				refreshing={refreshing}
				onRefresh={this.fetchData.bind(this)}
				tintColor="#7F8081"
				title="正在请求最新干货..."
				titleColor="#202020"
			/>
		)

		return (
			//title={searchBar}
			<View style={styles.descContent}>
				<Animated.View style={[styles.navView,{marginTop:navViewMarginTop,opacity:navViewOpacity}]}>
					<NavigationBar
						statusBar={{style:theme.statusBar.style}}
						title={{title:'首页',tintColor:'#FFF'}}
						tintColor={theme.navBar.tintColor}
						rightButton={rightButton}
					/>
				</Animated.View>
				{dataSource ?
					<ListView
						style={styles.descContent}
						dataSource={dataSource}
						renderRow={this.renderRow.bind(this)}
						renderHeader={() => listHeader}
						refreshControl={refreshControl}
						renderSectionHeader={this.renderSectionHeader.bind(this)}
						{...this._panResponder.panHandlers}
					/> : null
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	descContent: {
		flex: 1,
		backgroundColor: '#dae1e4'
	},
	searchBar: {
		width: width - 40,
		height: 30,
		backgroundColor: '#ffffff',
		borderTopWidth: 0,
		borderBottomWidth: 0,
		borderRadius: 6
	},
	searchInput: {
		backgroundColor: '#ffffff',
		margin: 0,
		fontSize: 14,
		borderRadius: 6
	},
	searchIcon: {
		left: 6,
		top: 7,
		fontSize: 18
	},
	navView: {
		width: width
	},
	descContent: {
		flex: 1
	},
	rightButton: {
		height: 44,
		width: 44
	},
	rightButtonImage: {
		width: 16,
		height: 16,
		marginLeft: 14,
		marginTop: 14
	},
})

const mapStateToProps = (state) => {
	return {
		data: state.homeReducer.dataSource,
		tabBarHeight: state.commonReducer.tabBarHeight
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(Actions, dispatch),
		commonActions: bindActionCreators(CommonActions, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)

