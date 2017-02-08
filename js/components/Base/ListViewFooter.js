/**
 * Created by YT on 2017/2/7.
 */
import React, {Component, PropTypes} from 'react'
import {Text, View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native'

const {width} = Dimensions.get('window')

class ListViewFooter extends Component {
	render() {
		const {shouldRender} = this.props
		if (shouldRender) {
			return (
				<View style={styles.descContent}>
					<ActivityIndicator
						color={'#686868'}
					/>
					<Text style={styles.text}>加载更多...</Text>
				</View>
			)
		}
		return null
	}
}

const styles = StyleSheet.create({
	descContent: {
		flexDirection: 'row',
		height: 60,
		width: width,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		marginLeft: 10,
		color: '#505050',
		fontSize:14
	}
})

ListViewFooter.propTypes = {
	shouldRender: PropTypes.bool
}
ListViewFooter.defaultProps = {}

export default ListViewFooter
