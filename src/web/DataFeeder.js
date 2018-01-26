import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions"

class DataFeeder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            participants: [],
            coords: []
        };

    }

    componentDidMount() {

        const { event } = this.state

        if (!event) return

        this.props.actions.loadParticipants({ _eventId: event.item._id })
        this.props.actions.loadRouteMarkers(event.item.markers)

        navigator.geolocation.watchPosition(position => {
            this.props.actions.setCurrLocation([position.coords.latitude, position.coords.longitude])
        }, function error(msg) {

            alert('Please enable your GPS position future.');

        }, { maximumAge: 600000000, timeout: 5000, enableHighAccuracy: true });

    }

    render() {
        return (this.props.children)
    }
}

function mapStateToProps(state) {

    const { event } = state

    console.log("DataFeeder --> mapStateToProps --> event", event)

    return {
        event
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataFeeder)