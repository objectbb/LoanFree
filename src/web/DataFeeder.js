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

        this.participantTracking = this.participantTracking.bind(this)
    }

    componentDidMount() {

        const { event } = this.state

        console.log("DataFeeder --> componentDidMount --> event", this.props.event)

        navigator.geolocation.watchPosition(position => {
            this.props.actions.setCurrLocation([position.coords.latitude, position.coords.longitude])
        }, function error(msg) {

            alert('Please enable your GPS position future.');

        }, { maximumAge: 600000000, timeout: 5000, enableHighAccuracy: true });

    }

    participantTracking() {

        const { event, account } = this.props


        if (!(event.item && account.item)) return

        console.log("DataFeeder --> participantTracking --> event -->account", event.item._id, account.item._id)

        navigator.geolocation.watchPosition(position => {

this.props.actions.updateParticipantCurrLocation({ coords: [position.coords.latitude, position.coords.longitude], _eventId: event.item._id, _accountId: account.item._id })

this.props.dispatch({ type: 'PARTICIPANT_UPSERT_REQUESTED', payload: { ...this.state, participant } })

        }, function error(msg) {

            alert('Please enable your GPS position future.');

        }, { maximumAge: 600000000, timeout: 5000, enableHighAccuracy: true });

    }

    render() {
        return (this.props.children)
    }
}

function mapStateToProps(state) {

    const { event,participant } = state

    console.log("DataFeeder --> mapStateToProps --> event", event)

    return {
        event,
        participant
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataFeeder)
