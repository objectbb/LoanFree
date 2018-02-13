import React, { Component } from "react"
import classnames from "classnames"
import Typography from 'material-ui/Typography';

import { connect } from "react-redux"
import Dialog from "./components/Dialog"

import moment from 'moment'
import geolib from "geolib"
import Icon from 'material-ui/Icon'

import { Map, Marker, TileLayer, Popup, Tooltip } from 'react-leaflet'
import Grid from 'material-ui/Grid'
import { divIcon, point } from "leaflet"
import CaptureMoments from "./CaptureMoments"
import FullScreenDialog from "./components/FullScreenDialog"
import { isEqual, debounce } from 'lodash'

import "./styles/app.css"

class MapIt extends Component {

    constructor(props) {
        super(props);

        this.state = { isCamera: false, isPhoto: false }

        this.updatePosition = this.updatePosition.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
        this.closeIndicator = this.closeIndicator.bind(this);
        this.handleCamera = this.handleCamera.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    componentDidUpdate() {

        debounce(() =>
            this.props.participants &&
            this.props.participants.map((item, index) => {

                const closemarker = this.withinRangeMarkerIndicator(item)
                let newmarkers = []
                if (item.markers.length === 0)
                    newmarkers = closemarker
                else
                    newmarkers = closemarker ? closemarker.filter(
                        (marker) =>
                        item.markers.find((item) => {
                            return marker.marker.guid !== item.marker.guid
                        })
                    ) : []

                if (newmarkers && newmarkers.length > 0)
                    this.props.addParticipantMarker(item, newmarkers)
            }), 20000)()
    }

    closeIndicator(coords) {

        return this.props.routeMarkers && this.props.routeMarkers.some((marker) => {
            let distance = geolib.getDistance({ latitude: coords[0], longitude: coords[1] }, { latitude: marker.coords[0], longitude: marker.coords[1] })
            return distance < marker.range
        });
    }

    photoCloseIndicator(marker) {
        return this.props.photos.item ?
            this.props.photos.item.map((photo) => {
                let distance = geolib.getDistance({
                    latitude: marker.coords[0],
                    longitude: marker.coords[1]
                }, { latitude: photo.participant.coords[0], longitude: photo.participant.coords[1] })

                if (distance < marker.range) {
                    return Object.assign({}, { range: distance }, { ...photo })
                }
            }).filter((item) => item)
            : []
    }

    withinRangeMarkerIndicator(prt) {

        return this.props.routeMarkers &&
            this.props.routeMarkers.map((marker) => {
                let distance = geolib.getDistance({
                    latitude: prt.coords[0],
                    longitude: prt.coords[1]
                }, { latitude: marker.coords[0], longitude: marker.coords[1] })
                if (distance < marker.range) {
                    return Object.assign({}, { details: { range: distance, coords: prt.coords } }, { marker })
                }
            }).filter((item) => item);
    }

    updatePosition(e) {

        let item = e.target.options.name;

        item.coords = [e.target._latlng.lat, e.target._latlng.lng]

        this.props.updatePosition(item);
    }

    removeMarker(item, e) {
        e.preventDefault()
        this.props.removeMarker(item);
    }

    editMarker(item, e) {
        e.preventDefault()
        this.props.editMarker(item);
    }

    viewPhotos(photogallery, e) {
        e.preventDefault()

        this.props.viewPhotos(photogallery, e)
    }

    handleCamera() {
        this.setState({ isCamera: true })
    }

    handleClose() {
        this.setState({ isCamera: false });
    };

    render() {

        return (
            <Map center={this.props.region} zoom={17} className="map">
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {
              this.props.participants &&
                this.props.participants.map((item, index) => {

                  const isClose = this.closeIndicator(item.coords);


                const icon = divIcon({ className: 'marker ' + (!isClose ? 'bus' : 'bus mark'), html: `<div>${item.account.firstname[0]}${item.account.lastname[0]}</div>`})

                return (
                  <Marker key={index}
                   icon={icon}
                    name={item}
                    position={item.coords}
                       ref="marker">
                      <Popup>
                        <span>
                        {isClose &&
                          <Icon onClick={this.handleCamera}  className="tool-bar-items" color="action">camera</Icon>}

                        <div>
                        {item.account.firstname} {item.account.lastname}
                        </div>
                        <div>
                          {item.coords}
                        </div>
                        {item.markers && item.markers.map((item, idx) => (<div key={idx}><div>...</div>{item.marker.name} {item.details.range}m {item.details.coords && <div> {item.details.coords.join(', ')}   </div>} <div>{moment(item.details.timeStamp).format(moment.HTML5_FMT.DATETIME_LOCAL)} </div> </div>)) }
                        </span>
                      </Popup>
                  >
                  <FullScreenDialog  open={this.state.isCamera} onHandleClose={this.handleClose} onClick={this.handleClickOpen}  header={""} >
                     <CaptureMoments />
                  </FullScreenDialog>
                </Marker>
                )
              }
              )
            }
            {
                this.props.currLocation && this.props.currLocation.coords &&
                <Marker key={1}
                    position={this.props.currLocation.coords}
                    icon={divIcon({ className: 'youmarker ', html: `<div>YOU</div>`})}
                       ref="marker">
                       <Popup>
                          <div>
                          {this.props.currLocation.coords}
                          </div>
                      </Popup>
                  >
                </Marker>

            }
             {
              this.props.routeMarkers &&
                this.props.routeMarkers.map((item, index) => {

                let circlerange = "border: 1px solid #000;border-radius: 50%;height:" + item.range + "px;width:" + item.range + "px;";
                let center = "display:table-cell;vertical-align:middle;height:" + item.range + "px;width:" + item.range + "px;text-align:right;";

                const inRangePhotos = this.photoCloseIndicator(item)
                const photoGallery = inRangePhotos.map((item,idx) =>
                 <li key={idx} className="photogallery-item">
                  <Typography type="caption" color="inherit">
                  #{idx + 1} --
                  {item.participant.account.email} --
                  {item.participant.event.name} --
                  {moment(item.participant.event.startdate).format('llll')} --
                  range: {item.range}m --
                  coords: {item.participant.coords}
                 </Typography>
                 <img src={item.photoURLFirebase} />
                 </li>)

                const icon =
                  (inRangePhotos.length > 0) ?
                  divIcon({html:'<div class="icon"><div class="camera3"><span></span></div>',     })
                  :  divIcon({html:'<img src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/images/marker-icon.png" id="image">',     })

                return (
                  <Marker key={index}
                    name={item}
                    icon={icon}
                    position={item.coords}
                    draggable={this.props.draggable}
                      onDragend={this.updatePosition}
                       ref="marker">
                          <Popup>
                          <span>
                            <div><b>{item.name}</b> range: {item.range}m</div>
                            <div>{item.coords} </div>
                            <div>

                            <Grid container spacing={40}>
                           {this.props.removeMarker  &&  this.props.updatePosition &&
                            <Grid item>
                                <button onClick={(e) => this.editMarker(item,e)}>
                                    <i className="material-icons">edit_location</i>
                                </button>
                            </Grid>}
                            <Grid item>

                              {inRangePhotos.length > 0 &&
                                <button onClick={(e) => this.viewPhotos(photoGallery,e)}>
                                    <i className="material-icons">photo_album</i>
                                </button>
                              }
                              </Grid>


                             {this.props.removeMarker  &&  this.props.updatePosition && <Grid item>
                                <button onClick={(e) => this.removeMarker(item,e)}>
                                    <i className="material-icons">delete</i>
                                </button>
                            </Grid>}
                        </Grid>

                              </div>


                          </span>
                        </Popup>

                  >
                </Marker>

                )
              })
            }


          </Map>

        )
    }
}

export default MapIt
