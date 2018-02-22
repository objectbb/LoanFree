import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import moment from 'moment'
import * as actions from "../actions"
import isEqual from 'lodash'
import IntegrationReactSelect from "./components/Select"
import Typography from 'material-ui/Typography';
import "./styles/app.css"

class Events extends Component {
    constructor(props) {
        super(props)

        this.state = { watchPositionId: '', timerId: '', event: '' }
        this.handleUpdateInput = this.handleUpdateInput.bind(this)
        this.clearSelectedEvent = this.clearSelectedEvent.bind(this)
    }

    clearSelectedEvent() {
        this.props.actions.clearApp()
    }

    handleUpdateInput(event) {

        const { dispatch, account, participant, interval } = this.props

        if (!event) {
            this.clearSelectedEvent()
            return
        }

        const value = event.value

        if (value === 0) {
            this.clearSelectedEvent()
            return
        }

        dispatch({ type: 'EVENT_PARTICIPANT_CLEAR' })
        dispatch({ type: 'EVENT_FETCH_SUCCEEDED', payload: value })
        dispatch({ type: 'PARTICIPANT_FETCH_REQUESTED', payload: { _eventId: value._id, _accountId: account.item._id } })

        if (value._id) {
            dispatch({ type: 'EVENT_PARTICIPANTS_FETCH_REQUESTED', payload: { _eventId: value._id } })
            dispatch({ type: 'PHOTO_FETCH_REQUESTED', payload: { _eventId: value._id } })
        }

        dispatch({ type: 'SET_CURRENT_REGION', coords: [value.coords[0], value.coords[1]] })

    };


    render() {

        const { events, account, event } = this.props

        console.log("Events --> render --> ", events.item)

        //if (Object.getOwnPropertyNames(events.item).length === 0) return (<div/>)

        let menuitems = (account.item.authorization === "ROUTEMAKER") ? [{
            label: "[Start New Event]",
            value: 0
        }] : []

        menuitems = (events) ?
            menuitems.concat(events.item.map((item) => ({
                label: `${item.name} - ${moment(item.startdate).format('llll')} ${item.address} ${item.city} ${item.state}`,
                value: item
            })))
            : menuitems

        return (
            <Typography type="caption" color="inherit">
                <IntegrationReactSelect
                 options={menuitems}
                  value={event.item}
                  placeholder={`${account.item.firstname}'s Events (${menuitems.length - ((account.item.authorization === "ROUTEMAKER") && 1)})`}
                onChange={this.handleUpdateInput}
                 />
            </Typography>
        )
    }
}

function mapStateToProps(state) {

    const { event, events, account, participant, participants, interval } = state

    return {
        event,
        events,
        account,
        participant,
        interval,
        participants
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        dispatch,
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)