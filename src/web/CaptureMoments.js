import React, { Component } from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import * as actions from "../actions"
import firebase from 'firebase'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'
import Grid from 'material-ui/Grid';
import Button from "material-ui/Button"
import Icon from 'material-ui/Icon'
import "./styles/app.css"
import Webcam from "./webcam"

class CaptureMoments extends Component {

    constructor(props) {
        super(props);

        this.state = { photo: '', firebase: false, error: undefined }

        this.handleFailure = this.handleFailure.bind(this)
        this.handleSuccess = this.handleSuccess.bind(this)
        this.takePicture = this.takePicture.bind(this)
        this.uploadImagetoFirebase = this.uploadImagetoFirebase.bind(this)
    }

    takePicture() {
        this.camera.captureBlob((blob) => {

            try {
                this.img.src = (window.URL || window.webkitURL).createObjectURL(blob)
            } catch (e) {
                this.img.srcObject = blob
            }

            this.setState((state) => {
                state.photo = blob
                return state;
            });

        })
    }

    handleFailure(error) {
        this.setState({ error: error })
    }

    handleSuccess() {
        this.setState({ error: undefined })
    }

    uploadImagetoFirebase() {
        let photoInfo = { ...this.props.participant }
        photoInfo.item.account = { ...this.props.account.item }

        this.props.actions.uploadImagetoFirebase(photoInfo,
            this.state.photo)

        this.setState({ firebase: true, error: undefined })
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
                        <Webcam
                        width={200}
                        height={200}
                        ref={(ref) => this.camera = ref}
                        audio={false}
                        onFailure={this.handleFailure}
                        />
                        </div>
                        <Button mini onClick={this.takePicture}  variant="fab" color="primary" aria-label="camera" >
                        <Icon>camera_enhance</Icon>
                        </Button>
                        <br /><br />
                        <div>
                            <img
                            className="camera-image"
                            ref={(img) => {
                            this.img = img;
                            }}
                            />
                        </div>

                        <Button mini disabled={!this.state.photo} onClick={this.uploadImagetoFirebase}  variant="fab" color="secondary" aria-label="save" >
                            <Icon>backup</Icon>
                        </Button>

                        <div style={{ color: "red" }}>
                        {photo.error && <span>{photo.error}</span>}
                        {this.state.error && <span>{this.state.error}</span>}
                        {!this.state.error && this.state.firebase && photo.firebase &&
                            <span>Yeaaahh!!! You did it, photo is saved</span>
                        }
                        </div>
                    </Grid>
                </Grid>
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

    const { participant, photo, account } = state

    return {
        account,
        participant,
        photo
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaptureMoments)