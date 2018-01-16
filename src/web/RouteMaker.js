import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import uuid from 'uuid';

import MapIt from './MapIt'
import AddressGeocode from './AddressGeocode'
import style from "./app.css";
import * as actions from "../actions"

class RouteMaker extends Component {

    constructor(props) {
        super(props);

        this.addMarker = this.addMarker.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
        this.setCurrentRegionAddress = this.setCurrentRegionAddress.bind(this);
    }

    addMarker() {
        let offset = .002
        let length = this.props.routeMarkers.length;

        let lastcoords = this.props.region;

        let item = { coords: [lastcoords[0] + offset, lastcoords[1] + offset] };
        item.place = { name: "Marker #" + length + 1 }
        item.guid = uuid.v1();
        item.range = 50;

        this.props.actions.setRouteMarkers([...this.props.routeMarkers, item])

    }

    removeMarker(item) {

        let newmarkers = this.props.routeMarkers.filter((marker) => marker.guid !== item.guid);

        this.props.actions.setRouteMarkers(newmarkers)

    }

    updatePosition(item) {

        let newmarkers = this.props.routeMarkers.map(
            (marker) => {
                if (marker.guid === item.guid)
                    marker.coords = item.coords;

                return marker;
            }
        );

        this.props.actions.setRouteMarkers(newmarkers)

    }

    setCurrentRegionAddress(address){
        this.props.actions.setCurrentRegionAddress(address)
    }

    render() {
        const toolbar = { float: 'right', borderStyle: 'solid', borderWidth: '5px' };

        return (

            <div>
                {<MapIt
                  routeMarkers = {this.props.routeMarkers}
                  participants={this.props.participants}
                  removeMarker={this.removeMarker}
                  region={this.props.region}
                  currLocation={this.props.location}
                   draggable={true}
                   updatePosition={this.updatePosition}
                />}

                <div style={toolbar}>
                <button onClick={this.addMarker} >
                 <i className="material-icons">add_location</i>
                  </button>
                  </div>

                <AddressGeocode geocode={ this.setCurrentRegionAddress}/>
          </div>
        )
    }
}

function mapStateToProps(state) {
    const { location, region, participants, routemarkers } = state

console.log(location)

console.log("mapStateToProps", location)
    return {
        routeMarkers: routemarkers.items,
        participants: participants.items,
        region: region.coords,
        location: location.coords
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteMaker)
