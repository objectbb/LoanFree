import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions"

class DataFeeder extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        const { dispatch, participant } = this.props

        console.log("DataFeeder --> componentDidMount --> participant", participant)

        navigator.geolocation.watchPosition(position => {

            const coords = [position.coords.latitude, position.coords.longitude]
            this.props.actions.setCurrLocation(coords)

            if (Object.getOwnPropertyNames(participant.item).length === 0) return

            console.log("DataFeeder --> componentDidMount --> participant", participant.item)
            const prtCoords = { ...participant.item[0] }
            prtCoords.coords = coords

            this.props.actions.updateParticipantCurrLocation(prtCoords)

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