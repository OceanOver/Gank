/**
 * Created by YT on 2017/2/8.
 */
import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text, Image, Dimensions, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import IconItem from 'react-native-vector-icons/Ionicons'

const {width} = Dimensions.get('window')

class MoreListRow extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillMount() {
		Icon.getImageSource('arrow-right', 15, '#7c7d7d').then((source) => this.setState({arrowIcon: source}))
	}


	render() {
		const {arrowIcon} = this.state
		const {iconName,iconBgColor, text, hideLine,sectionID,rowID,highlightRow,clickRowCb} = this.props
		return (
			<TouchableHighlight onPress={() => {
				highlightRow(sectionID, rowID)
				clickRowCb(rowID)
			}}>
				<View style={styles.container}>
					<View style={[styles.icon,{backgroundColor:iconBgColor}]}>
						<IconItem name={iconName} color={'#FFF'} size={16}/>
					</View>
					<Text style={styles.text}>{text}</Text>
					<Image source={arrowIcon} style={styles.arrow}/>
					{hideLine ? null : <View style={styles.line}/>}
				</View>
			</TouchableHighlight>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		height: 44,
		width: width,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFF'
	},
	icon: {
		marginLeft: 15,
		width: 26,
		height: 26,
		borderRadius:4,
		alignItems:'center',
		justifyContent:'center'
	},
	text: {
		marginLeft: 15,
		flex: 1,
		fontSize: 15,
		color: '#292929'
	},
	arrow: {
		width: 15,
		height: 15,
		marginRight: 15
	},
	line: {
		height: 0.5,
		position: 'absolute',
		right: 0,
		bottom: 0,
		left: 50,
		backgroundColor: '#DFDFDF'
	}
})

MoreListRow.propTypes = {
	iconName: PropTypes.string,
	iconBgColor:PropTypes.string,
	text: PropTypes.string,
	hideLine: PropTypes.bool,
	sectionID:PropTypes.string,
	rowID:PropTypes.string,
	highlightRow:PropTypes.func,
	clickRowCb:PropTypes.func
}
MoreListRow.defaultProps = {}

export default MoreListRow
