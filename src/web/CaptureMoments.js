import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Camera from 'react-camera';
import Gallery from 'react-photo-gallery';
import SelectedImage from './SelectedImage';
import camera from "./styles/app.css"

export default class CaptureMoments extends Component {

    constructor(props) {
        super(props);

        this.state = { photos: [] }
        this.selectPhoto = this.selectPhoto.bind(this);
        this.toggleSelect = this.toggleSelect.bind(this);

        this.takePicture = this.takePicture.bind(this);
    }

    selectPhoto(event, obj) {
        let photos = this.state.photos;
        photos[obj.index].selected = !photos[obj.index].selected;
        this.setState({ photos: photos });
    }

    toggleSelect() {
        let photos = this.state.photos.map((photo, index) => { return { ...photo, selected: !this.state.selectAll } });
        this.setState({ photos: photos, selectAll: !this.state.selectAll });
    }

    takePicture() {
        this.camera.capture()
            .then(blob => {

                this.img.src = URL.createObjectURL(blob);

                this.img.onload = () => {
                    URL.revokeObjectURL(this.src);

                    this.setState((state) => {
                        state.photos = state.photos.concat({ src: URL.createObjectURL(blob), height: 3, width: 3 });
                        return state;
                    });

                }
            })
    }

    render() {

        return (
            <div style={style.container}>
                <img
                style={style.captureImage}
                ref={(img) => {
                this.img = img;
                }}
                />
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
                            <Gallery photos={this.state.photos} onClick={this.selectPhoto} ImageComponent={SelectedImage} />
                        </div>
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
        visibility: 'hidden',
        width: '5%',
    }
};