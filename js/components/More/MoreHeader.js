/**
 * Created by YT on 2017/2/8.
 */
import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text, Image, TouchableHighlight, Linking,Alert} from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {GankToast} from '../../ui'

class MoreHeader extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillMount() {
		Icon.getImageSource('arrow-right', 18, '#7c7d7d').then((source) => this.setState({arrowIcon: source}))
	}

	openInrowser(url) {
		console.log(url)
		Linking.canOpenURL(url).then(supported => {
			if (!supported) {
				GankToast.show('Can\'t handle url: ' + url)
			} else {
				return Linking.openURL(url);
			}
		}).catch(err => console.error('An error occurred', err))
	}

	onPressHeader() {
		Alert.alert(
			'干货集中营',
			'跳转到干货集中营',
			[
				{
					text: '取消',
					onPress: () => {
						console.log('Foo Pressed!')
					}
				},
				{
					text: '确定',
					onPress: () => {
						const url = 'http://gank.io/'
						this.openInrowser(url)
					}
				}
			]
		)
	}


	render() {
		const {arrowIcon} = this.state

		return (
			<View style={styles.container}>
				<TouchableHighlight
					style={styles.touchArea}
					onPress={this.onPressHeader.bind(this)}
					underlayColor={'#dbdbdb'}>
					<View style={styles.content}>
						<Image style={styles.icon} source={require('../../resource/logo.png')}/>
						<Text style={styles.text}>干货集中营</Text>
						<Image style={styles.arrow} source={arrowIcon}/>
					</View>
				</TouchableHighlight>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F1F1F1',
		height: 110
	},
	touchArea:{
		marginTop: 15,
		marginBottom: 15,
		flex: 1
	},
	content: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFF'
	},
	icon: {
		marginLeft: 20,
		width: 60,
		height: 60,
		borderRadius: 30
	},
	text: {
		flex: 1,
		fontSize: 18,
		color: '#292929',
		marginLeft: 15,
		lineHeight: 30
	},
	arrow: {
		width: 18,
		height: 18,
		marginRight: 15
	}
})

MoreHeader.propTypes = {}
MoreHeader.defaultProps = {}

export default MoreHeader
