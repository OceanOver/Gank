/**
 * Created by YT on 2017/1/23.
 */
import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'

class SectionHeader extends Component {
	render() {
		const {title,color} = this.props
		const tagStyle = {
			width: 4,
			height: 18,
			backgroundColor:color
		}

		return (
			<View style={styles.descContent}>
				<View style={tagStyle} />
				<Text style={styles.title}>{title}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	descContent: {
		flex: 1,
		height: 24,
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		flexDirection: 'row',
	},
	title: {
		marginLeft: 10,
		fontSize: 15,
		color:'#494949'
	}
})

SectionHeader.propTypes = {
	title: PropTypes.string,
	color: PropTypes.string
}
SectionHeader.defaultProps = {}

export default SectionHeader
