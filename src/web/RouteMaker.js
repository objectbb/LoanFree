import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Icon from 'material-ui/Icon'
import TextInput from "./components/TextInput"
import Dialog from "./components/Dialog"
import FullScreenDialog from "./components/FullScreenDialog"
import AddressGeocode from './AddressGeocode'
import MapIt from './MapIt'
import EditMarkerForm from './EditMarkerForm'

import * as actions from "../actions"
import uuid from 'uuid'
import Grid from 'material-ui/Grid'
import Button from "material-ui/Button"
import { uniqWith, isEqual, debounce, throttle } from 'lodash'

import "./styles/app.css"

class RouteMaker extends Component {

    constructor(props) {
        super(props);

        this.state = { isEditMarker: false, marker: {}, isPhoto: false, photoGallery: [] }

        this.addMarker = this.addMarker.bind(this)
        this.viewPhotos = this.viewPhotos.bind(this)
        this.openEditMarker = this.openEditMarker.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.updatePosition = this.updatePosition.bind(this)
        this.removeMarker = this.removeMarker.bind(this)
        this.setCurrentRegionAddress = this.setCurrentRegionAddress.bind(this)
        this.addParticipantMarker = this.addParticipantMarker.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    setCurrentRegionAddress(address) {
        this.props.actions.setCurrentRegionAddress(address)
    }

    addMarker() {
        let offset = .0006
        let length = this.props.event.item.markers.length;

        let lastcoords = this.props.region;

        let item = { coords: [lastcoords[0] + offset, lastcoords[1] + offset] };
        item.name = "Marker #" + length + 1
        item.guid = uuid.v1();
        item.range = 50;

        let event = { ...this.props.event.item }
        event.markers = [...this.props.event.item.markers, item]

        event.__v = undefined

        console.log("RouteMaker --> addMarker --> event ", event)

        this.props.actions.setRouteMarkers(event)
    }

    viewPhotos(photogallery, e) {
        e.preventDefault()

        this.setState({ isPhoto: true, photoGallery: [...photogallery] })
    }

    removeMarker(item) {

        let newmarkers = this.props.event.item.markers.
        filter((marker) => marker.guid !== item.guid);

        console.log("RouteMaker --> removeMarker newmarkers ", newmarkers)

        let event = { ...this.props.event.item }
        event.markers = [...newmarkers];

        event.__v = undefined
        this.props.actions.setRouteMarkers(event)
    }

    addParticipantMarker(participant, newmarkers) {

        const prtmarkers = { ...participant }
        const origmarkers = [...participant.markers]

        const { _id, markers, _accountId, _eventId, coords } = participant

        const mergemarkers = origmarkers.concat(newmarkers)

        unqMarkers = uniqWith(mergemarkers, function (item1, item2) {
            return item1.marker.name === item2.marker.name
        })

        console.log("RouteMaker --> addParticipantMarker unqMarkers", unqMarkers)

        this.props.actions.setParticipantMarkers({
            _id,
            markers: unqMarkers,
            _accountId,
            _eventId,
            coords
        })
    }

    openEditMarker(item) {
        this.setState({ isEditMarker: true, marker: item })
    }

    handleSubmit(item) {

        this.updatePosition({ ...item })
        this.setState({ isEditMarker: false })
    }

    handleClose() {
        this.setState({ isPhoto: false });
    };

    updatePosition(item) {
        console.log("RouteMaker --> updatePosition --> match", item)
        console.log("RouteMaker --> updatePosition --> markers", markers)
        let { markers, _id, _accountId, _eventId, coords } = this.props.event.item

        const newmarkers = markers.map(
            (marker) => {
                if (marker.guid === item.guid) {

                    console.log("RouteMaker --> updatePosition --> match", marker)
                    marker = item;
                }

                return marker;
            }
        );

        console.log("RouteMaker --> updatePosition --> markers ", markers)

        this.props.actions.setRouteMarkers({ _id, markers: newmarkers, _accountId, coords })
    }


    render() {

        const { event } = this.props

        return (
            <span>
                <MapIt
                    routeMarkers = {event.item.markers}
                    participants={this.props.participants}
                    participant={this.props.participant}
                    removeMarker={this.removeMarker}
                    editMarker={this.openEditMarker}
                    region={this.props.region}
                    currLocation={this.props.location}
                    draggable={true}
                    updatePosition={this.updatePosition}
                    addParticipantMarker= {this.addParticipantMarker}
                    viewPhotos = {this.viewPhotos}
                    photos={this.props.photo}
                />

                <Dialog open={this.state.isEditMarker} header={""}>
                    <EditMarkerForm marker={this.state.marker}  handleSubmit={this.handleSubmit}  />
                </Dialog>

                <FullScreenDialog open={this.state.isPhoto} onHandleClose={this.handleClose}   header={""}>
                    <ul className="photogallery">{this.state.photoGallery}</ul>
                </FullScreenDialog>

                {Object.getOwnPropertyNames(event.item).length > 0 &&
                <div className="toolbar bottom">
                    <Grid container spacing={24}>
                        <Grid item xs={9}>
                             <AddressGeocode />
                        </Grid>
                        <Grid item xs>
                            <Button mini className="tool-bar-items" onClick={this.addMarker}  variant="fab" color="primary" aria-label="add">
                               <Icon  color="action">add_location</Icon>
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            }
            </span>
        )
    }
}

function mapStateToProps(state) {
    const { location, region, eventparticipants, event, photo, participant } = state

    console.log("RouteMaker --> mapStateToProps --> eventparticipants", eventparticipants)

    return {
        participant,
        photo,
        event,
        participants: eventparticipants.item,
        region: region.coords,
        location
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteMaker)