import React, { Component } from "react"
import classnames from "classnames"
import Typography from 'material-ui/Typography';

import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Dialog from "./components/Dialog"

import moment from 'moment'
import geolib from "geolib"
import Icon from 'material-ui/Icon'

import * as actions from "../actions"

//import { Map, Marker, TileLayer, Popup, Tooltip } from 'react-leaflet'
//import { divIcon, point } from "leaflet"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

import Grid from 'material-ui/Grid'

import CaptureMoments from "./CaptureMoments"
import FullScreenDialog from "./components/FullScreenDialog"
import { isEqual, debounce } from 'lodash'
import "./styles/animate.css"
import "./styles/app.css"


class ParticipantMarker extends Component {
    constructor(props) {
        super(props);

        this.state = { toggleInfoWindow: false }

        this.onToggleInfoWindow = this.onToggleInfoWindow.bind(this)
    }

    onToggleInfoWindow() {
        console.log("MapMarker --> onToggleInfoWindow --> ", this)
        this.setState({ toggleInfoWindow: !this.state.toggleInfoWindow })
    }

    render() {
        const props = this.props

        return (
            <Marker key={`participant-${props.index}`}
              position={{lat: props.item.coords[0], lng: props.item.coords[1] }}
              onClick={this.onToggleInfoWindow}
                 >

                 {
                  this.state.toggleInfoWindow &&
                  <InfoWindow onCloseClick={this.onToggleInfoWindow}>
                  <span>
                  <Icon onClick={props.handleCamera}  className="toolbar-items" color="action">camera</Icon>
                  <div>
                  {props.item.account.firstname} {props.item.account.lastname}
                  </div>
                  <div>
                    {props.item.coords}
                  </div>
                  {props.item.markers && props.item.markers.map((item, idx) => (<div key={idx}>
                  <div>...</div>{item.marker.name} {item.details.range}m
                  {item.details.coords && <div> {item.details.coords.join(', ')}
                    </div>} <div>{moment(item.details.timeStamp).format(moment.HTML5_FMT.DATETIME_LOCAL)}
                     </div> </div>)) }
                  </span>
               </InfoWindow>
             }
          </Marker>
        )
    }
}


class MapMarkers extends Component {

    constructor(props) {
        super(props);

        this.state = { isCamera: false, isPhoto: false, toggleInfoWindow: false }

        this.updatePosition = this.updatePosition.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
        this.closeIndicator = this.closeIndicator.bind(this);
        this.handleCamera = this.handleCamera.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onToggleInfoWindow = this.onToggleInfoWindow.bind(this)
    }

    componentWillReceiveProps(nextProps) {

        const { dispatch, interval, participant } = this.props

        if (nextProps.interval.watchPositionId === interval.watchPositionId &&
            nextProps.participant.item._id === participant.item._id
        ) return


        console.log("MapIt --> componentWillReceiveProps --> participant ", nextProps.participant.item)

        console.log("MapIt --> componentWillReceiveProps --> interval.timerMarkersVisitedId ", interval)
        console.log("MapIt --> componentWillReceiveProps --> nextProps.interval.timerMarkersVisitedId ", nextProps)

        if (interval.timerMarkersVisitedId)
            this.props.actions.stopInterval(interval.timerMarkersVisitedId)

        const you = nextProps.participant.item

        if (!you.coords) return

        const addMarkersVisitedIntervalId = setInterval(() => {

            const closemarker = this.withinRangeMarkerIndicator(you)
            let newmarkers = []
            if (you.markers && you.markers.length === 0)
                newmarkers = closemarker
            else
                newmarkers = closemarker ?
                closemarker.filter(
                    (marker) =>
                    you.markers.find((item) => {
                        return marker.marker.guid && item.marker.guid &&
                            marker.marker.guid !== item.marker.guid
                    })
                )
                : []

            if (newmarkers && newmarkers.length > 0) {
                this.props.addParticipantMarker(you, newmarkers)
            }

        }, 15000)

        dispatch({
            type: 'UPDATE_INTERVAL_ADDMARKER_ID',
            timerMarkersVisitedId: addMarkersVisitedIntervalId
        })

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
    }

    onToggleInfoWindow() {
        this.setState({ toggleInfoWindow: !this.state.toggleInfoWindow });
    }

    render() {

            const pmarkers = this.props.participants &&
                this.props.participants.map((item, index) => {
                    const isClose = this.closeIndicator(item.coords)
                    return <ParticipantMarker index={index}
                          item={item}
                          isClose={isClose}
                          handleCamera={this.handleCamera}
                           />
                })

            return (
                    <div>
                       <FullScreenDialog  open={this.state.isCamera} onHandleClose={this.handleClose} onClick={this.handleClickOpen}  header={""} >
                         <CaptureMoments />
                      </FullScreenDialog>

                        {pmarkers}

             {
              this.props.routeMarkers &&
                this.props.routeMarkers.map((item, index) => {

                let circlerange = "border: 1px solid #000;border-radius: 50%;height:" + item.range + "px;width:" + item.range + "px;";
                let center = "display:table-cell;vertical-align:middle;height:" + item.range + "px;width:" + item.range + "px;text-align:right;";

                const inRangePhotos = this.photoCloseIndicator(item)
                const photoGallery = inRangePhotos.map((item,idx) =>
                 <li key={`photo-${idx}`} className="photogallery-item">
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

                const bounceInfinite = ((index === this.props.routeMarkers.length - 1) ? ' bounce infinite ' : '')

                  {/*
                const icon =
                  (inRangePhotos.length > 0) ?
                  divIcon({html:'<div class="icon marker-tooltip ' + bounceInfinite  + '"><div className="marker-label toolbar-background">' + item.name + '</div><div class="camera3"><span></span></div>',     })
                  :  divIcon({html:'<div class="marker-tooltip marker-label toolbar-background ' + bounceInfinite  + '">' + item.name + '</div>' + '<img src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/images/marker-icon.png" id="image">',     })
                  */}

                return (
                  <Marker key={`marker-${index}`}
                    name={item}
                    position={{lat: item.coords[0], lng:item.coords[1] }}
                    draggable={this.props.draggable}
                      onDragend={this.updatePosition}
                       ref="marker">

                       {/*
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

                             {this.props.removeMarker  &&  this.props.updatePosition &&
                              <Grid item>
                                <button onClick={(e) => this.removeMarker(item,e)}>
                                    <i className="material-icons">delete</i>
                                </button>
                            </Grid>}
                        </Grid>
                              </div>
                          </span>
                        </Popup>
                      */}

                </Marker>

                )
              })
            }
          </div>
        )
    }
}

function mapStateToProps(state) {

    const { interval, participant } = state

    return {
        interval,
        participant
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        dispatch,
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapMarkers)