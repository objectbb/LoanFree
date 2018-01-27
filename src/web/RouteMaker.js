import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import uuid from 'uuid';

import MapIt from './MapIt'

import style from "./app.css";
import * as actions from "../actions"

class RouteMaker extends Component {

    constructor(props) {
        super(props);

        this.addMarker = this.addMarker.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
    }

    addMarker() {
        let offset = .002
        let length = this.props.event.item.markers.length;

        let lastcoords = this.props.region;

        let item = { coords: [lastcoords[0] + offset, lastcoords[1] + offset] };
        item.place = { name: "Marker #" + length + 1 }
        item.guid = uuid.v1();
        item.range = 50;

        const event = { ...this.props.event.item }
        event.markers = [...this.props.event.item.markers, item]

        console.log("RouteMaker --> removeMarker --> event", event)

        this.props.actions.setRouteMarkers(event)

    }

    removeMarker(item) {

        let newmarkers = this.props.event.item.markers.filter((marker) => marker.guid !== item.guid);

        const event = { ...this.props.event.item }
        event.markers = newmarkers;

        console.log("RouteMaker --> removeMarker --> event", event)

        this.props.actions.setRouteMarkers(event)

    }

    updatePosition(item) {
        const { markers } = this.props.event.item

        let newmarkers = markers.map(
            (marker) => {
                if (marker.guid === item.guid)
                    marker.coords = item.coords;

                return marker;
            }
        );

        const event = { ...this.props.event.item }
        event.markers = newmarkers;

        console.log("RouteMaker --> updatePosition --> event", event)

        this.props.actions.setRouteMarkers(event)

    }


    render() {
        const toolbar = { float: 'right', borderStyle: 'solid', borderWidth: '5px' };

        if (!this.props.event.item) return (<div></div>)

        console.log("RouteMaker --> render --> event", event.item)

        return (

            <div>
                {<MapIt
                  routeMarkers = {this.props.event.item.markers}
                  participant={this.props.participant}
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


          </div>
        )
    }
}

function mapStateToProps(state) {
    const { location, region, participant, event } = state

    console.log("RouteMaker --> mapStateToProps --> event", event)
    console.log("RouteMaker --> mapStateToProps --> participant", participant)

    return {
        event,
        participant: participant.item,
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