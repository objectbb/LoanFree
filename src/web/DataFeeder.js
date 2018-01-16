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

        this.props.actions.loadParticipants({ name: 'Brian' })
        this.props.actions.loadRouteMarkers({ name: 'Brian' })

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

const mapDispatchToProps = (dispatch, props) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(DataFeeder)
