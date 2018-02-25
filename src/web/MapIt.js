import React, { Component } from "react"
import classnames from "classnames"
import Typography from 'material-ui/Typography';

import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import Dialog from "./components/Dialog"

import moment from 'moment'
import geolib from "geolib"

import * as actions from "../actions"


import { Map, Marker, TileLayer, Popup, Tooltip, LayersControl } from 'react-leaflet'

import GoogleLayer from './GoogleLayer'
const { BaseLayer } = LayersControl;
const key = 'AIzaSyBqK4f8zbMrK4K5cxWb8_10Zkbk7LHMrKE';
const terrain = 'TERRAIN';
const road = 'ROADMAP';
const satellite = 'SATELLITE';
const hydrid = 'HYBRID';

import Grid from 'material-ui/Grid'
import { divIcon, point } from "leaflet"
import CaptureMoments from "./CaptureMoments"
import FullScreenDialog from "./components/FullScreenDialog"
import Button from "material-ui/Button"
import Icon from 'material-ui/Icon'
import { isEqual, debounce } from 'lodash'
import "./styles/animate.css"
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

    componentWillReceiveProps(nextProps) {

        const { dispatch, interval, participant } = this.props

        if (!nextProps.interval.onOff ||
            (nextProps.interval.watchPositionId === interval.watchPositionId &&
                nextProps.participant.item._id === participant.item._id)) return

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

    render() {

            return (
                    <div>
         <FullScreenDialog  open={this.state.isCamera} onHandleClose={this.handleClose} onClick={this.handleClickOpen}  header={""} >
           <CaptureMoments />
        </FullScreenDialog>
        <Map center={this.props.region} zoom={17} className="map">

            <LayersControl position='topright'>
               <BaseLayer  name='OpenStreetMap.Mapnik'>
                  <TileLayer  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"/>
              </BaseLayer>
               <BaseLayer name='Google Maps Roads'>
                  <GoogleLayer googlekey={key}  maptype={road} />
                </BaseLayer>
               <BaseLayer  name='Google Maps Terrain'>
                  <GoogleLayer googlekey={key}  maptype={terrain} />
                </BaseLayer>
                  <BaseLayer checked name='Google Maps Hydrid'>
                  <GoogleLayer googlekey={key}  maptype={hydrid}  libraries={['geometry', 'places']} />
                </BaseLayer>
            </LayersControl>
            {
              this.props.participants &&
                this.props.participants.map((item, index) => {

                    const isClose = this.closeIndicator(item.coords);

                    const icon = divIcon({ className: 'marker ' + (!isClose ? 'bus' : 'bus mark'), html: isClose ? '<div class="tinycamera3"><span></span></div>' : `<div>${item.account.firstname[0]}${item.account.lastname[0]}</div>`})

                    return (
                      <Marker key={`participant-${index}`}
                       icon={icon}
                        name={item}
                        position={item.coords}
                           ref="marker">
                          <Popup>
                            <span>
                            {isClose &&
                              <div style={{fontSize: '15px'}}>
                                Take a Qik Pic&nbsp;
                                 <Button mini onClick={this.handleCamera}  variant="fab" color="primary" aria-label="camera" >
                                  <Icon>camera_enhance</Icon>
                                </Button>
                              </div>
                            }
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

                    </Marker>
                    )
                }
              )
            }
            {/*
            this.props.currLocation && this.props.currLocation.coords &&
                <Marker key="marker-you-1"
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
            */}
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
                  coords: {item.participant.coords} --
                  timeStamp: {moment(item.timeStamp).format('llll')}
                 </Typography>
                 <img src={item.photoURLFirebase} />
                 </li>)

                const bounceInfinite = ((index === this.props.routeMarkers.length - 1) ? ' bounce infinite ' : '')
                const icon =
                  (inRangePhotos.length > 0) ?
                  divIcon({html:'<div class="marker-tooltip marker-label toolbar-background ' + bounceInfinite  + '"><div className="marker-label toolbar-background">' + item.name + '</div><div class="tinyicon"> <div class="tinycamera3"><span></span></div></div>',     })
                  :  divIcon({html:'<div class="marker-tooltip marker-label toolbar-background ' + bounceInfinite  + '">' + item.name + '</div>' + '<img src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/images/marker-icon.png" id="image">',     })


                return (
                  <Marker key={`marker-${index}`}
                    name={item}
                    icon={icon}
                    position={item.coords}
                    draggable={this.props.draggable}
                      onDragend={this.updatePosition}
                       ref="marker">
                          <Popup>
                          <span>
                            <div><b>{item.name}</b> range: {item.range}m</div>
                            <div>{item.coords.join(' ')} </div>
                            <div>

                            <Grid container spacing={40}>
                            <Grid item>
                            </Grid>
                           {this.props.removeMarker  &&  this.props.updatePosition &&
                            <Grid item>
                                <Button variant="fab" mini color="primary" onClick={(e) => this.editMarker(item,e)}>
                                    <div className='action-button'>EDIT</div>
                                </Button>
                            </Grid>}
                            <Grid item>

                              {inRangePhotos.length > 0 &&
                                <Button variant="fab" mini color="secondary"  onClick={(e) => this.viewPhotos(photoGallery,e)}>
                                    <i className="material-icons">photo_album</i>
                                </Button>
                              }
                              </Grid>

                             {this.props.removeMarker  &&  this.props.updatePosition &&
                              <Grid item>
                                <Button variant="fab" color="primary" mini onClick={(e) => this.removeMarker(item,e)}>
                                    <div className='action-button'>REMOVE</div>
                                </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(MapIt)