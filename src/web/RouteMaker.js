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
import style from "./styles/app.css"
import * as actions from "../actions"
import uuid from 'uuid'
import Grid from 'material-ui/Grid';
import { uniqWith, isEqual } from 'lodash'


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
    }

    setCurrentRegionAddress(address) {
        this.props.actions.setCurrentRegionAddress(address)
    }

    addMarker() {
        let offset = .001
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

    viewPhotos(photogallery) {
        this.setState({ isPhoto: !this.state.isPhoto })
        this.setState({ photoGallery: [...photogallery] })
    }

    removeMarker(item) {

        let newmarkers = this.props.event.item.markers.filter((marker) => marker.guid !== item.guid);

        let event = { ...this.props.event.item }
        event.markers = newmarkers;

        event.__v = undefined
        this.props.actions.setRouteMarkers(event)
    }

    addParticipantMarker(participant, newmarkers) {

        const prtmarkers = { ...participant }
        const origmarkers = [...participant.markers]

        const { _id, markers, _accountId, _eventId, coords } = participant

        let unqMarkers = origmarkers.concat(newmarkers)

        unqMarkers = uniqWith(unqMarkers, function (item) {
            return item.marker.name
        })

        console.log("RouteMaker --> addParticipantMarker ", unqMarkers)

        this.props.actions.setParticipantMarkers({
            _id,
            markers: unqMarkers,
            _accountId,
            _eventId,
            coords
        })
        /*
                this.props.actions.updateParticipantCurrLocation({
                    _id,
                    markers: unqMarkers,
                    _accountId,
                    _eventId,
                    coords
                })*/

    }

    openEditMarker(item) {
        this.setState({ isEditMarker: true, marker: item })
    }

    handleSubmit(item) {

        this.updatePosition({ ...item })
        this.setState({ isEditMarker: false })
    }

    updatePosition(item) {
        let { markers } = this.props.event.item

        markers = markers.map(
            (marker) => {
                if (marker.guid === item.guid) {

                    marker = item;
                }

                return marker;
            }
        );

        console.log("RouteMaker --> updatePosition --> event", this.props.event.item)

        const { _id, _accountId, _eventId, coords } = this.props.event.item
        this.props.actions.setRouteMarkers({ _id, markers, _accountId, coords })
    }


    render() {

            const { event } = this.props

            return (
                    <div>
                <MapIt
                  routeMarkers = {event.item.markers}
                  participants={this.props.participant}
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

                <FullScreenDialog open={this.state.isPhoto} header={""}>
                    <div className="photogallery">
                        {this.state.photoGallery}
                    </div>
              </FullScreenDialog>

                {Object.getOwnPropertyNames(event.item).length > 0 &&
                <div className="tool-bar bottom">
                    <Grid container spacing={24}>
                    <Grid item xs={9}>
                         <AddressGeocode />
                    </Grid>
                    <Grid item xs>
                        <Icon onClick={this.addMarker}  className="tool-bar-items" color="action">add_location</Icon>
                    </Grid>

                    </Grid>
                </div>
            }
            < /div>
    )
}
}

function mapStateToProps(state) {
    const { location, region, eventparticipants, event, photo } = state

    console.log("RouteMaker --> mapStateToProps --> eventparticipants", eventparticipants)

    return {
        photo,
        event,
        participant: eventparticipants.item,
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