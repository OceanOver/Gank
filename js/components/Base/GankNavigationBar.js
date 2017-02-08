/**
 * Created by YT on 2017/1/28.
 */
import React, {Component, PropTypes} from 'react'
import {StyleSheet, Image, View, TouchableHighlight} from 'react-native'
import NavigationBar from 'react-native-navbar'
import theme from '../../constants/theme'
import Icon from 'react-native-vector-icons/Ionicons'

class GankNavigationBar extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillMount() {
		Icon.getImageSource('md-arrow-round-back', 16, '#FFFFFF').then((source) => this.setState({backIcon: source}))
	}


	render() {
		const {navigator, title, rightButton} = this.props
		const {backIcon} = this.state
		const leftButton = (
			<TouchableHighlight
				underlayColor={theme.navBar.tintColor}
				onPress={() => {
						navigator.pop()
					}}>
				<View style={styles.leftButton}>
					<Image style={styles.leftButtonImage} source={backIcon}/>
				</View>
			</TouchableHighlight>
		)

		const rightItem = rightButton ? rightButton : null

		const titleConfig = {
			title: title ? title : '',
			tintColor: '#FFFFFF',
			style: {
				fontSize: 16
			}
		}
		return (
			<NavigationBar
				statusBar={{style:theme.statusBar.style}}
				title={titleConfig}
				tintColor={theme.navBar.tintColor}
				leftButton={leftButton}
				rightButton={rightItem}
			/>
		)
	}
}

const styles = StyleSheet.create({
	leftButton: {
		height: 44,
		width: 44
	},
	leftButtonImage: {
		width: 16,
		height: 16,
		marginLeft: 14,
		marginTop: 14
	}
})

GankNavigationBar.propTypes = {
	navigator: PropTypes.object,
	title: PropTypes.string
}
GankNavigationBar.defaultProps = {}

export default GankNavigationBar
