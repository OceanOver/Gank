/**
 * Created by YT on 2017/2/6.
 */
import React, {Component, PropTypes} from 'react'
import {StyleSheet, Image, View, Text, TouchableHighlight} from 'react-native'

class ModalItem extends Component {
	render() {
		const {title, icon,clickItem} = this.props

		return (
			<TouchableHighlight
				underlayColor={'#e6e6e6'}
				onPress={() => {
						clickItem()
					}}>
				<View style={styles.descContent}>
					<Image source={icon} style={styles.icon}/>
					<Text style={styles.title}>{title}</Text>
				</View>
			</TouchableHighlight>
		)
	}
}

const styles = {
	descContent: {
		width:150,
		height: 40,
		flexDirection: 'row',
		alignItems: 'center'
	},
	icon: {
		width: 16,
		height: 16,
		marginLeft: 10
	},
	title: {
		marginLeft: 8,
		fontSize: 15
	}
}

ModalItem.propTypes = {
	icon: PropTypes.object,
	title: PropTypes.string,
	clickItem:PropTypes.func
}
ModalItem.defaultProps = {}

export default ModalItem
