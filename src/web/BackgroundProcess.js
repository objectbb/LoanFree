import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import moment from 'moment'
import * as actions from "../actions"
import isEqual from 'lodash'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import Button from "material-ui/Button"
import Badge from "material-ui/Badge"
import classnames from "classnames"
import "./styles/app.css"
import "./styles/animate.css"

class BackgroundProcess extends Component {
    constructor(props) {
        super(props)

        this.state = { watchPositionId: '', timerId: '', event: '', onOff: false }
        this.startIntervals = this.startIntervals.bind(this)
        this.stopIntervals = this.stopIntervals.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    startIntervals() {
        const { dispatch, interval, participant } = this.props
        let timerId;
        let watchPositionId;

        console.log("Events --> startIntervals --> participant ", participant)

        //timerId = this.props.actions.intervalLoadParticipants({ _eventId: participant.item._eventId })
        watchPositionId = this.props.actions.watchPosition(participant)

        dispatch({
            type: 'UPDATE_INTERVAL_IDS',
            // timerId: timerId,
            watchPositionId: watchPositionId,
            onOff: true
        })

        console.log("Events --> startIntervals --> state ", this.state)
    }

    stopIntervals() {
        const { dispatch, interval } = this.props

        console.log("Events --> stopIntervals ---> interval ", interval)

        if (interval.watchPositionId)
            this.props.actions.stopWatchPosition(interval.watchPositionId)

        //if (interval.timerId)
        //  this.props.actions.stopInterval(interval.timerId)

        if (interval.timerMarkersVisitedId)
            this.props.actions.stopInterval(interval.timerMarkersVisitedId)

        dispatch({
            type: 'UPDATE_INTERVAL_IDS',
            timerId: interval.timerId,
            watchPositionId: interval.watchPositionId,
            onOff: false
        })
    }

    toggle() {
        this.setState({ onOff: !this.state.onOff })

        if (!this.state.onOff)
            this.startIntervals()
        else
            this.stopIntervals()
    }

    render() {

        const { eventparticipants, participant } = this.props

        const bounceClass = classnames({
            'onoff-interval': true,
            'flash indicator-settings': !this.state.onOff
        });

        const toAppear = (participant && participant.item._eventId && eventparticipants && eventparticipants.item.length > 0)
        return (

            toAppear ?
            <div className={bounceClass}>
                    <Badge style={{ float: 'right'}}  badgeContent={eventparticipants.item.length} color="primary">
                        <Button
                        mini
                        onClick={this.toggle}
                        variant="fab"
                        color="secondary"
                         aria-label="save">
                         <div className='action-button'>{this.state.onOff ? "GPS" : "OFF"}</div>
                        </Button>
                    </Badge>

                </div> :
            <div></div>
        )
    }
}

function mapStateToProps(state) {

    const { eventparticipants, participant, interval } = state

    return {
        eventparticipants,
        participant,
        interval
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        dispatch,
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundProcess)