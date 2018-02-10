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

        console.log("DataFeeder --> componentDidMount --> props ", this.props)

        if (!this.props.participant) return
        // if (this.props.participant.item._id === nextProps.participant.item._id) return

        const { participant } = this.props

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

    const { participant } = state

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