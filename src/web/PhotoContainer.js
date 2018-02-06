import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions"
import { CaptureMoments } from "./CaptureMoments"


const photos = []
const photoContainer = (style, img) => {
    <img
          style={style.captureImage}
          ref={(img) => {
            this.img = img;
          }}
        />
}

class PhotoContainer extends Component {

    constructor(props) {
        super(props);

        this.addPhoto = this.addPhoto.bind(this)
    }

    addPhoto(photo) {
        photos.add(photo)
    }

    render() {

        const imgContainer = photos.map((item) => (<div>{ photoContainer(item, style) }</div>))

        return (
            <div>
            <div>
            {imgContainer}
            </div>

            <CaptureMoments  addPhoto={this.addPhoto} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

const style = {
    preview: {
        position: 'relative',
    },
    captureContainer: {
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        zIndex: 1,
        bottom: 0,
        width: '20%'
    },
    captureButton: {
        backgroundColor: '#fff',
        borderRadius: '50%',
        height: 56,
        width: 56,
        color: '#000',
        margin: 20
    },
    captureImage: {
        width: '20%',
    }
};

export default connect(null, mapDispatchToProps)(DataFeeder)