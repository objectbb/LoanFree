import React, { Component } from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import * as actions from "../actions"
import firebase from 'firebase'
import Grid from 'material-ui/Grid';
import Camera from 'react-camera';
import Button from "material-ui/Button"
import Icon from 'material-ui/Icon'
import camera from "./styles/app.css"

class CaptureMoments extends Component {

    constructor(props) {
        super(props);

        this.state = { photo: '' }

        this.takePicture = this.takePicture.bind(this)
        this.uploadImagetoFirebase = this.uploadImagetoFirebase.bind(this)
    }


    takePicture() {
        this.camera.capture()
            .then(blob => {

                this.img.src = URL.createObjectURL(blob);

                this.img.onload = () => {
                    URL.revokeObjectURL(this.src);

                    this.setState((state) => {
                        state.photo = blob
                        return state;
                    });

                }
            })
    }

    uploadImagetoFirebase() {

        this.props.actions.uploadImagetoFirebase(this.props.participant,
            this.state.photo)

    }

    render() {

        return (
            <div style={style.container}>
                <br />
                <Grid container spacing={8}>
                    <Grid item xs={1} md={1} lg={1}>
                    </Grid>
                    <Grid item xs={5} md={4} lg={4}>
                        <Camera
                        style={style.preview}
                        ref={(cam) => {
                        this.camera = cam;
                        }}
                        >
                            <div style={style.captureContainer} onClick={this.takePicture}>
                                <div className="icon">
                                    <div className="camera3"><span></span></div>
                                </div>
                            </div>
                        </Camera>

                    </Grid>
                    <Grid item xs={5} md={4} lg={4}>
                        <div>
                        <img
                            style={style.captureImage}
                            ref={(img) => {
                            this.img = img;
                            }}
                            />

                        </div>

                      <Button disabled={!this.state.photo} onClick={this.uploadImagetoFirebase}  fab color="secondary" aria-label="save" >
                    <Icon>add_a_photo</Icon>
                    </Button>
                    </Grid>
                </Grid>
            </div>
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

    const { participant } = state

    return {
        participant
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaptureMoments)