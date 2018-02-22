import React, { Component } from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import * as actions from "../actions"
import firebase from 'firebase'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'
import Grid from 'material-ui/Grid';
import Camera from 'react-camera';
import Button from "material-ui/Button"
import Icon from 'material-ui/Icon'
import camera from "./styles/app.css"
import Webcam from "./webcam"

class CaptureMoments extends Component {

    constructor(props) {
        super(props);

        this.state = { photo: '', firebase: false }

        this.takePicture = this.takePicture.bind(this)
        this.uploadImagetoFirebase = this.uploadImagetoFirebase.bind(this)
    }

    takePicture() {
        this.camera.captureBlob((blob) => {

            this.img.src = URL.createObjectURL(blob);

            this.setState((state) => {
                state.photo = blob
                return state;
            });

        })
    }

    uploadImagetoFirebase() {

        this.props.actions.uploadImagetoFirebase(this.props.participant,
            this.state.photo)

        this.setState({ firebase: true })
    }

    render() {
        const { photo } = this.props

        return (
            <BlockUi tag="div" blocking={photo.isFetching}>

                <br />
                <Grid container spacing={8}>
                    <Grid item xs={1} md={1} lg={1}>
                    </Grid>
                    <Grid item xs={5} md={4} lg={4}>

                        <div>
                        <Webcam width={240} height={180} ref={(ref) => this.camera = ref} audio={false} />
                        </div>
                        <Button mini onClick={this.takePicture}  variant="fab" color="primary" aria-label="camera" >
                        <Icon>camera_enhance</Icon>
                        </Button>
                        <br />  <br />
                        <div>
                            <img
                            ref={(img) => {
                            this.img = img;
                            }}
                            />
                        </div>

                        <Button mini disabled={!this.state.photo} onClick={this.uploadImagetoFirebase}  variant="fab" color="secondary" aria-label="save" >
                            <Icon>backup</Icon>
                        </Button>
                    </Grid>
                </Grid>
                {photo.error &&
                  <p style={{ color: "red" }}>
                    {photo.error}
                  </p>}
                  {this.state.firebase && photo.firebase &&
                    <p style={{ color: "red" }}>
                        Yeaaahh!!! You did it, photo is saved
                  </p>
                }
             </BlockUi>
        );
    }
}

const style = {
    preview: {
        position: 'relative',
    },
    captureContainer: {
        display: 'flex',
        position: 'absolute',
        justifyContent: 'center',
        zIndex: 1,
        bottom: 0,
        width: '100%'
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
        width: '100%',
    }
};


const mapDispatchToProps = (dispatch, props) => {
    return {
        dispatch,
        actions: bindActionCreators(actions, dispatch)
    }
}

function mapStateToProps(state) {

    const { participant, photo } = state

    return {
        participant,
        photo
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaptureMoments)