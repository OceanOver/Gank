import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Dimensions, ListView, Text, Alert, Linking, Share} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../actions/more'
import NavigationBar from 'react-native-navbar'
import theme from '../../constants/theme'
import MoreHeader from './MoreHeader'
import ListRow from './MoreListRow'
import {GankToast} from '../../ui'

class MoreTab extends Component {
	constructor(props) {
		super(props)
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		this.state = {
			dataSource: this.ds.cloneWithRows(['简介', '致谢', '个人主页', 'GitHub', '分享'])
		}
	}

	openInrowser(url) {
		Linking.canOpenURL(url).then(supported => {
			if (!supported) {
				GankToast.show('Can\'t handle url: ' + url)
			} else {
				return Linking.openURL(url)
			}
		}).catch(err => console.error('An error occurred', err))
	}

	renderHeader() {
		return (
			<MoreHeader/>
		)
	}

	renderRow(rowData, sectionID, rowID, highlightRow) {
		let hideLine = false
		let iconBgColor = '#3DB149'
		let iconName = 'md-paper'
		if (rowID == 0) {
			iconBgColor = '#1B79FF'
			iconName = 'md-paper'
		} else if (rowID == 1) {
			iconBgColor = '#FC7008'
			iconName = 'md-ribbon'
		} else if (rowID == 2) {
			iconBgColor = '#FC2C07'
			iconName = 'logo-rss'
		} else if (rowID == 3) {
			iconBgColor = '#FED10A'
			iconName = 'logo-github'
		} else if (rowID == 4) {
			iconBgColor = '#D38AD5'
			iconName = 'md-share'
			hideLine = true
		}
		return (
			<ListRow
				iconName={iconName}
				iconBgColor={iconBgColor}
				text={rowData}
				sectionID={sectionID}
				rowID={rowID}
				highlightRow={highlightRow}
				clickRowCb={this.rowDidClicked.bind(this)}
				hideLine={hideLine}
			/>
		)
	}

	showAlert(title, msg) {
		Alert.alert(
			title,
			msg,
			[
				{
					text: 'OK',
					onPress: () => {
					}
				}
			]
		)
	}

	showShareAction(msg) {
		Share.share({
			message: msg
		})
			.then((result) => {
				if (result.action === Share.sharedAction) {
					GankToast.show('已分享')
				} else if (result.action === Share.dismissedAction) {
					console.log('取消了分享')
				}
			})
			.catch((error) => {
				console.log('error: ' + error.message)
			})
	}

	rowDidClicked(rowID) {
		if (rowID == 0) {
			this.showAlert('干货集中营', '每日分享妹子图 和 技术干货，还有供大家中午休息的休闲视频')
		} else if (rowID == 1) {
			this.showAlert('数据来自于干货集中营', '感谢所有为干货集中营默默付出的汉子们')
		} else if (rowID == 2) {
			const url = 'https://oceanover.github.io/'
			this.openInrowser(url)
		} else if (rowID == 3) {
			const url = 'https://github.com/OceanOver'
			this.openInrowser(url)
		} else if (rowID == 4) {
			this.showShareAction('干货集中营')
		}
	}

	render() {
		const {dataSource} = this.state
		return (
			<View style={styles.descContent}>
				<NavigationBar
					statusBar={{style:theme.statusBar.style}}
					title={{title:'更多',tintColor:'#FFF'}}
					tintColor={theme.navBar.tintColor}
				/>
				<ListView
					style={styles.listView}
					dataSource={dataSource}
					renderHeader={this.renderHeader.bind(this)}
					renderRow={this.renderRow.bind(this)}
					enableEmptySections={true}
					alwaysBounceVertical={false}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	descContent: {
		flex: 1
	},
	listView: {
		flex: 1,
		backgroundColor: '#F1F1F1'
	}
})

const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(Actions, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(MoreTab)
