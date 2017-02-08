/**
 * Created by YT on 2017/1/20.
 */
import React, {Component, PropTypes} from 'react'
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native'
var {width}=Dimensions.get('window')

class HomeImage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			height: 50
		}
	}

	resize() {
		Image.getSize(this.props.imgUrl, (w, h) => {
			const imgHeight = h / w * width
			this.setState({height:imgHeight})
		});
	}

	componentDidMount() {
		this.resize()
	}


	componentWillReceiveProps(nextProps, nextContext) {
		const nextImgUrl = nextProps.imgUrl
		const {imgUrl} = this.props
		if (nextImgUrl !== imgUrl) {
			this.resize()
		}
	}


	render() {
		const {imgUrl, labelTitle} = this.props
		const {height} = this.state
		return (
			<View style={{width:width,height:height}}>
				<View style={styles.descContent}>
					<Image source={{uri: imgUrl}} style={styles.image}/>
					<View style={styles.titleView}>
						<Text style={styles.title}>{labelTitle}</Text>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	descContent: {
		flex: 1
	},
	image: {
		flex: 1
	},
	titleView: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		height: 50,
		backgroundColor: 'rgba(0,0,0,0.7)',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	title: {
		color: '#fff',
		fontSize: 20,
		marginRight: 20,
		fontWeight: 'bold'
	}
})

HomeImage.propTypes = {
	imgUrl: PropTypes.string,
	labelTitle: PropTypes.string
}
HomeImage.defaultProps = {}

export default HomeImage
