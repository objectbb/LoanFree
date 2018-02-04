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
import { differenceWith } from 'lodash'

class RouteMaker extends Component {

    constructor(props) {
        super(props);

        this.state = { isEditMarker: false, marker: {} }

        this.addMarker = this.addMarker.bind(this);
        this.openEditMarker = this.openEditMarker.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
        this.setCurrentRegionAddress = this.setCurrentRegionAddress.bind(this);
        this.addParticipantMarker = this.addParticipantMarker.bind(this)

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

    addParticipantMarker(participant, markers) {

        const prtmarkers = { ...participant }
        const origmarkers = [...participant.markers]
        prtmarkers.markers = origmarkers.concat(markers)


        console.log("RouteMaker --> addParticipantMarker -->  participant ", participant)
        console.log("RouteMaker --> addParticipantMarker -->  markers ", markers)

        //  this.props.actions.setParticipantMarkers({ _id: participant._id, markers: origmarkers.concat(markers) })
        //this.props.actions.setParticipantMarkers()

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
                   draggable={true}
                   updatePosition={this.updatePosition}
                   addParticipantMarker= {this.addParticipantMarker}
                />

                <Dialog open={this.state.isEditMarker} header={""}>
                    <EditMarkerForm marker={this.state.marker}  handleSubmit={this.handleSubmit}  />
                </Dialog>

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
    const { location, region, eventparticipants, event } = state

    console.log("RouteMaker --> mapStateToProps --> eventparticipants", eventparticipants)

    return {
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