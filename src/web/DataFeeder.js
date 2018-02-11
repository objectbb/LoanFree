import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import isEqual from 'lodash'
import * as actions from "../actions"

class DataFeeder extends Component {

    constructor(props) {
        super(props);
        this.state = { timerId: '', watchPositionId: '' }
    }

    componentWillReceiveProps(nextProps) {
        const { participant, participants } = this.props
        console.log("DataFeeder --> componentDidMount --> props ", this.props)

        if (!(participant && participants.length > 1)) return
        // if (this.props.participant.item._id === nextProps.participant.item._id) return

        let timerId;
        let watchPositionId;

        if (this.state.timerId)
            this.props.actions.stopLoadParticipants(this.state.timerId)

        if (this.state.watchPositionId)
            this.props.actions.stopWatchPosition(this.state.watchPositionId)

        console.log("DataFeeder --> componentDidMount --> participant ", participant)

        timerId = this.props.actions.intervalLoadParticipants({ _eventId: participant.item._eventId })
        this.setState({ timerId: timerId })

        watchPositionId = this.props.actions.watchPosition(participant)

        this.setState({ watchPositionId: watchPositionId })

    }

    render() {
        return (this.props.children)
    }
}

function mapStateToProps(state) {

    const { participant, eventparticipants } = state

    return {
        participant,
        participants: eventparticipants.item,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataFeeder)