/**
 * Created by YT on 2017/1/28.
 */
import React, {Component, PropTypes} from 'react'
import {
	StyleSheet,
	View,
	WebView,
	TouchableHighlight,
	Image,
	Modal,
	Dimensions,
	Alert,
	Linking,
	Share
} from 'react-native'
import theme from '../../constants/theme'
import GankNavigationBar from '../Base/GankNavigationBar'
import Icon from 'react-native-vector-icons/Ionicons'
import ModalItem from './ModalItem'
import {GankToast} from '../../ui'

var {height, width} = Dimensions.get('window')
class WebPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			modalVisible: false
		}
	}

	componentWillMount() {
		//prepare icons
		Icon.getImageSource('ios-more', 16, '#FFFFFF').then((source) => this.setState({moreIcon: source}))
		Icon.getImageSource('ios-book-outline', 16, '#3b3b3b').then((source) => this.setState({modalTitle: source}))
		Icon.getImageSource('ios-open-outline', 16, '#3b3b3b').then((source) => this.setState({modalBrowser: source}))
		Icon.getImageSource('ios-share-outline', 16, '#3b3b3b').then((source) => this.setState({modalShare: source}))
		Icon.getImageSource('ios-close-circle-outline', 16, '#3b3b3b').then((source) => this.setState({modalClose: source}))
	}

	componentDidMount() {
		const {commonActions} = this.props
		commonActions.hideTabbar(true)
	}

	componentWillUnmount() {
		const {commonActions} = this.props
		this.setModalVisible(false)
		commonActions.hideTabbar(false)
	}

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	clickModalItem(index) {
		const {data} = this.props
		if (index === 0) {
			Alert.alert('', data.desc, [{
				text: '好的', onPress: () => {
				}
			}])
		} else if (index === 1) {
			Linking.canOpenURL(data.url).then(supported => {
				if (!supported) {
					GankToast.show('Can\'t handle url: ' + data.url)
				} else {
					return Linking.openURL(data.url);
				}
			}).catch(err => console.error('An error occurred', err))
		} else if (index === 2) {
			Share.share({
				message: data.desc
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
		} else if (index === 3) {
			this.setModalVisible(false)
		}
	}

	renderModalItem(index, title, icon) {
		return (
			<ModalItem
				title={title}
				icon={icon}
				clickItem={this.clickModalItem.bind(this,index)}
			/>
		)
	}

	render() {
		const {navigator, data} = this.props
		const {moreIcon, modalVisible, modalTitle, modalBrowser, modalShare, modalClose} = this.state

		const rightButton = (
			<TouchableHighlight
				underlayColor={theme.navBar.tintColor}
				onPress={() => {
						this.setModalVisible(true)
					}}>
				<View style={styles.rightButton}>
					<Image style={styles.rightButtonImage} source={moreIcon}/>
				</View>
			</TouchableHighlight>
		)

		return (
			<View style={styles.descContent}>
				<GankNavigationBar
					navigator={navigator}
					title={'详细内容'}
					rightButton={rightButton}
				/>
				<WebView
					automaticallyAdjustContentInsets={false}
					style={styles.webView}
					source={{uri : data.url}}
					javaScriptEnabled={true}
					domStorageEnabled={true}
					decelerationRate="normal"
					startInLoadingState={true}
					scalesPageToFit={true}
				/>
				<Modal
					transparent={true}
					visible={modalVisible}>
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							{this.renderModalItem(0, '查看完整标题', modalTitle)}
							{this.renderModalItem(1, '在浏览器中打开', modalBrowser)}
							{this.renderModalItem(2, '分享此内容', modalShare)}
							{this.renderModalItem(3, '关闭', modalClose)}
						</View>
					</View>
				</Modal>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	descContent: {
		flex: 1,
		backgroundColor: '#dae1e4'
	},
	webView: {
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
	modalContainer: {
		position: 'absolute',
		top: 64,
		width: width,
		height: height,
		backgroundColor: 'rgba(0,0,0,0.5)'
	},
	modalContent: {
		position: 'absolute',
		top: 1,
		right: 1,
		width: 150,
		height: 160,
		backgroundColor: '#FFFFFF',
		borderRadius: 2
	}
})

WebPage.propTypes = {
	data: PropTypes.object
}
WebPage.defaultProps = {}

export default WebPage
