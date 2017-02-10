/**
 * Created by YT on 2017/2/6.
 */
import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Dimensions, ListView, Text, RefreshControl, Alert} from 'react-native'
import {requestCategoryData} from './request'
import {GankToast} from '../../ui'
import DiscoveryRow from '../Base/ListViewRow'
import WebPage from '../Web'
import ListFooter from '../Base/ListViewFooter'

class DiscoveryPage extends Component {
	constructor(props) {
		super(props)
		//list data pageNo
		this.pageNo = 1
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		this.state = {
			refreshing: false,
			moreLoading: false
		}
	}

	componentDidMount() {
		this.fetchData(1)
	}

	fetchData(pageNo) {
		const {type, actions} = this.props
		if (pageNo === 1) {
			this.setState({refreshing: true})
		} else {
			this.setState({moreLoading: true})
		}
		requestCategoryData(type, pageNo)
			.then((res) => {
				if (pageNo === 1) {
					this.pageNo = 1
					this.setState({refreshing: false})
					actions.fetchCategoryData(type, res)
					setTimeout(() => {
						GankToast.show('成功刷新数据')
					}, 500)
				} else {
					this.setState({moreLoading: false})
					actions.appendCategoryData(type, res)
				}
			})
			.catch((err) => {
				if (pageNo === 1) {
					this.setState({refreshing: false})
				} else {
					this.pageNo -= 1
					this.setState({moreLoading: false})
				}
				if (err.errCode === 1001) {
					GankToast.show(err.msg)
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
						this.fetchData(1)
					}
				}
			]
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

	renderFooter() {
		const {moreLoading} = this.state
		return (
			<ListFooter shouldRender={moreLoading}/>
		)
	}

	renderRow(rowData, sectionID, rowID, highlightRow, navTitleOpacity) {
		return (
			<DiscoveryRow
				data={rowData}
				sectionID={sectionID}
				rowID={rowID}
				highlightRow={highlightRow}
				clickRowCb={this.rowDidClicked.bind(this)}
				showImage={false}
			/>
		)
	}

	listViewOnEnd() {
		const {dataSource} = this.props
		if (dataSource.length > 0) {
			this.pageNo += 1
			this.fetchData(this.pageNo)
		}
	}

	render() {
		const {refreshing} = this.state
		const {dataSource} = this.props
		//prepare refreshControl
		const refreshControl = (
			<RefreshControl
				refreshing={refreshing}
				onRefresh={this.fetchData.bind(this,1)}
				tintColor="#7F8081"
				title="正在请求数据..."
				titleColor="#202020"
			/>
		)

		//prepare list data
		let data = this.ds.cloneWithRows(dataSource)

		return (
			<View style={styles.descContent}>
				<ListView
					style={styles.listView}
					dataSource={data}
					renderRow={this.renderRow.bind(this)}
					refreshControl={refreshControl}
					enableEmptySections={true}
					renderFooter={this.renderFooter.bind(this)}
					onEndReached={this.listViewOnEnd.bind(this)}
					onEndReachedThreshold={-20}
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
		flex: 1
	}
})

DiscoveryPage.propTypes = {
	type: PropTypes.string,
	dataSource: PropTypes.array,
	actions: PropTypes.object
}
DiscoveryPage.defaultProps = {}

export default DiscoveryPage
