import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Icon from 'material-ui/Icon'
import TextInput from "./components/TextInput"
import Dialog from "./components/Dialog"

import AddressGeocode from './AddressGeocode'
import MapIt from './MapIt'
import EditMarkerForm from './EditMarkerForm'
import style from "./styles/app.css"
import * as actions from "../actions"
import uuid from 'uuid'
import Grid from 'material-ui/Grid';

class ParticipantTracking extends Component {

    constructor(props) {
        super(props);

        this.state = { isEditMarker: false, marker: {} }

        this.addMarker = this.addMarker.bind(this);
        this.openEditMarker = this.openEditMarker.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
        this.setCurrentRegionAddress = this.setCurrentRegionAddress.bind(this);

    }

    setCurrentRegionAddress(address) {
        this.props.actions.setCurrentRegionAddress(address)
    }
    addMarker() {
        let offset = .002
        let length = this.props.event.item.markers.length;

        let lastcoords = this.props.region;

        let item = { coords: [lastcoords[0] + offset, lastcoords[1] + offset] };
        item.name = "Marker #" + length + 1
        item.guid = uuid.v1();
        item.range = 50;

        const event = { ...this.props.event.item }
        event.markers = [...this.props.event.item.markers, item]

        this.props.actions.setRouteMarkers(event)

    }

    removeMarker(item) {

        let newmarkers = this.props.event.item.markers.filter((marker) => marker.guid !== item.guid);

        const event = { ...this.props.event.item }
        event.markers = newmarkers;

        this.props.actions.setRouteMarkers(event)

    }

    openEditMarker(item) {
        this.setState({ isEditMarker: true, marker: item })
    }


    handleSubmit(item) {

        this.updatePosition({ ...item })
        this.setState({ isEditMarker: false })
    }

    updatePosition(item) {
        const { markers } = this.props.event.item

        let newmarkers = markers.map(
            (marker) => {
                if (marker.guid === item.guid) {

                    marker = item;
                }

                return marker;
            }
        );

        const event = { ...this.props.event.item }
        event.markers = newmarkers;

        console.log("RouteMaker --> updatePosition --> event", event)

        this.props.actions.setRouteMarkers(event)

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
                   draggable={false}
                   updatePosition={this.updatePosition}
                />

                <div className="tool-bar bottom">
                         <AddressGeocode geocode={this.setCurrentRegionAddress} />
                </div>
            }
            < /div>
    )
}
}

function mapStateToProps(state) {
    const { location, region, eventparticipants, event } = state

    console.log("ParticipantTracking --> mapStateToProps --> eventparticipants", eventparticipants)

    return {
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