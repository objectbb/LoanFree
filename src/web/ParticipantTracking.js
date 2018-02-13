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
import { uniqWith, debounce } from 'lodash'


class ParticipantTracking extends Component {

    constructor(props) {
        super(props);

        this.state = { isEditMarker: false, marker: {}, isPhoto: false, photoGallery: [] }

        this.addMarker = this.addMarker.bind(this);
        this.openEditMarker = this.openEditMarker.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
        this.setCurrentRegionAddress = this.setCurrentRegionAddress.bind(this);
        this.addParticipantMarker = this.addParticipantMarker.bind(this)
        this.viewPhotos = this.viewPhotos.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    setCurrentRegionAddress(address) {
        this.props.actions.setCurrentRegionAddress(address)
    }

    addParticipantMarker(participant, newmarkers) {

        const prtmarkers = { ...participant }
        const origmarkers = [...participant.markers]

        const { _id, markers, _accountId, _eventId, coords } = participant

        let unqMarkers = origmarkers.concat(newmarkers)

        unqMarkers = uniqWith(unqMarkers, function (item) {
            return item.marker.name
        })

        console.log("RouteMaker --> addParticipantMarker --> unqMarkers", unqMarkers)

        /*
        this.props.actions.setParticipantMarkers({
            _id,
            markers: unqMarkers,
            _accountId,
            _eventId,
            coords
        })*/
    }

    viewPhotos(photogallery, e) {
        e.preventDefault()

        this.setState({ isPhoto: true })
        this.setState({ photoGallery: [...photogallery] })
    }

    handleClose() {}
    addMarker() {}

    removeMarker(item) {}

    openEditMarker(item) {}

    handleSubmit(item) {}

    updatePosition(item) {}

    render() {

            const { event } = this.props

            return (
                    <div>
                <MapIt
                  routeMarkers = {event.item.markers}
                  participants={this.props.participant}
                  region={this.props.region}
                  currLocation={this.props.location}
                   draggable={false}
                addParticipantMarker= {this.addParticipantMarker}
                photos={this.props.photo}
                viewPhotos = {this.viewPhotos}
                />
            <FullScreenDialog open={this.state.isPhoto} onHandleClose={this.handleClose}   header={""}>
                        <ul className="photogallery">{this.state.photoGallery}</ul>
              </FullScreenDialog>

                <div className="tool-bar bottom">
                    <AddressGeocode geocode={this.setCurrentRegionAddress} />
                </div>
            }
            < /div>
    )
}
}

function mapStateToProps(state) {
    const { location, region, eventparticipants, event, photo } = state

    console.log("ParticipantTracking --> mapStateToProps --> eventparticipants", eventparticipants)

    return {
        photo,
        event,
        participant: eventparticipants.item,
        region: region.coords,
        location: location.coords
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantTracking)