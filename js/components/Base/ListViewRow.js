/**
 * Created by YT on 2017/1/25.
 */
import React, {Component, PropTypes} from 'react'
import {StyleSheet, Dimensions, View, Text, Image,TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

var {width}=Dimensions.get('window')
class ListViewRow extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentWillMount() {
		Icon.getImageSource('md-create', 10, '#212121').then((source) => this.setState({subIcon: source}))
	}

	render() {
		const {data,sectionID,rowID,highlightRow,clickRowCb} = this.props
		const {subIcon} = this.state
		return (
			<TouchableHighlight onPress={() => {
				highlightRow(sectionID, rowID)
				clickRowCb(data)
			}}>
				<View style={styles.content}>
					<View style={styles.textContent}>
						<Text style={styles.descContent}>{data.desc}</Text>
						<View style={styles.subView}>
							<Image style={styles.subIcon} source={subIcon}/>
							<Text style={styles.subTitle}>{data.who ? data.who : '匿名'}</Text>
						</View>
					</View>
					{data.images ? <Image style={styles.imageContent} source={{uri:data.images[0]}}/> : null}
					<View style={styles.line} />
				</View>
			</TouchableHighlight>
		)
	}
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		backgroundColor:'#FFFFFF',
		paddingTop:6,
		paddingBottom:6
	},
	textContent: {
		flex: 1,
	},
	imageContent: {
		marginRight: 5,
		width: 60,
		height: 60
	},
	descContent: {
		marginLeft: 15,
		marginRight: 10,
		color: '#5c5c5c',
		fontSize: 15,
		lineHeight:18
	},
	subView: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop:6
	},
	subIcon: {
		marginLeft: 15,
		width: 10,
		height: 10,
	},
	subTitle: {
		marginLeft: 5,
		fontSize: 13,
		color: '#7f7f7f',
	},
	line:{
		height:0.5,
		backgroundColor:'#CECECE',
		position:'absolute',
		left:15,
		right:0,
		bottom:0
	}
})

ListViewRow.propTypes = {
	data: PropTypes.object,
	sectionID:PropTypes.string,
	rowID:PropTypes.string,
	highlightRow:PropTypes.func,
	clickRowCb:PropTypes.func
}
ListViewRow.defaultProps = {}

export default ListViewRow
