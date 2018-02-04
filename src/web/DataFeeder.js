import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions"

class DataFeeder extends Component {

    constructor(props) {
        super(props);

        this.tracker = this.tracker.bind(this)
    }

    componentDidMount() {


        console.log("DataFeeder --> componentDidMount --> props", this.props)

        this.tracker();
    }

    tracker() {

        navigator.geolocation.watchPosition(position => {
            const { dispatch, participant } = this.props

            const coords = [position.coords.latitude, position.coords.longitude]
            this.props.actions.setCurrLocation(coords)

            console.log("DataFeeder --> geolocation.watchPosition --> participant.item", participant)

            if (Object.getOwnPropertyNames(participant.item).length === 0) return
            console.log("DataFeeder --> geolocation.watchPosition --> participant.item", participant.item)

            const prtCoords = { ...participant.item }
            prtCoords.coords = coords

            console.log("DataFeeder --> geolocation.watchPosition --> prtCoords", prtCoords)

            this.props.actions.updateParticipantCurrLocation(prtCoords)
            this.props.actions.loadParticipants({ _eventId: prtCoords._eventId })

        }, function error(msg) {

            alert('Please enable your GPS position future.');

        }, { maximumAge: 600000000, timeout: 5000, enableHighAccuracy: true });
    }


    render() {
        return (this.props.children)
    }
}

function mapStateToProps(state) {

    const { participant } = state

    console.log("DataFeeder --> mapStateToProps --> participant", participant)

    return {
        participant
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataFeeder)