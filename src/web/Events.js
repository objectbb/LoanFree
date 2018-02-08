import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import * as actions from "../actions"
import isEqual from 'lodash'
import "./styles/app.css"

import CircularProgress from "material-ui/Progress"
import Paper from "material-ui/Paper"
import { Card, CardHeader, CardText } from "material-ui/Card"

import IntegrationAutosuggest from './components/IntegrationAutosuggest'

class Events extends Component {
    constructor(props) {
        super(props)
        this.state = { timerId: '', watchPositionId: '' }
        this.handleUpdateInput = this.handleUpdateInput.bind(this)
        this.clearSelectedEvent = this.clearSelectedEvent.bind(this)
    }

    /*
        shouldComponentUpdate(nextProps, nextState) {
            console.log("Events --> shouldComponentUpdate --> this.props.event.item ", this.props.event.item)
            console.log("Events --> shouldComponentUpdate --> nextProps.event.item ", nextProps.event.item)
            console.log("Events --> shouldComponentUpdate --> isEqual", isEqual(this.props.event.item, nextProps.event.item))

            return !isEqual(this.props.event.item, nextProps.event.item)
        }
    */
    componentDidMount() {

        console.log("Events --> componentWillUpdate --> ", this.props.account)

        this.props.dispatch({
            type: 'EVENTS_FETCH_REQUESTED',
            payload: { _accountId: this.props.account._id }
        })
    }

    clearSelectedEvent() {
        const { dispatch } = this.props

        dispatch({ type: 'EVENT_CLEAR' })
        dispatch({ type: 'EVENT_PARTICIPANTS_CLEAR' })

        if (this.state.watchPositionId)
            this.props.actions.stopWatchPosition(this.state.watchPositionId)

        if (this.state.timerId)
            this.props.actions.stopLoadParticipants(this.state.timerId)
    }

    handleUpdateInput(item) {
        const { dispatch, account, participant } = this.props

        dispatch({ type: 'EVENT_FETCH_SUCCEEDED', payload: item.value })
        dispatch({ type: 'PARTICIPANT_FETCH_REQUESTED', payload: { _eventId: item.value._id, _accountId: account.item._id } })
        dispatch({ type: 'EVENT_PARTICIPANTS_FETCH_REQUESTED', payload: { _eventId: item.value._id } })
        dispatch({ type: 'SET_CURRENT_REGION', coords: [item.value.coords[0], item.value.coords[1]] })

        if (this.state.timerId)
            this.props.actions.stopLoadParticipants(this.state.timerId)

        if (this.state.watchPositionId)
            this.props.actions.stopWatchPosition(this.state.watchPositionId)

        const timerId = this.props.actions.intervalLoadParticipants({ _eventId: item.value._id })

        this.setState({ timerId: timerId })

        const watchPositionId = this.props.actions.watchPosition(participant)

        this.setState({ watchPositionId: watchPositionId })

    };


    render() {

        const { events, account } = this.props

        console.log("Events --> render --> ", events.item)

        if (Object.getOwnPropertyNames(events.item).length === 0) return (<div/>)

        const menuitems = (events) ?
            events.item.map((item) => ({
                text: `${item.name} - ${item.address} ${item.city} ${item.state}`,
                value: item
            }))
            : []

        return (
            <div>
                <IntegrationAutosuggest
                data={menuitems}
                position="absolute"
                handleUpdateInput={this.handleUpdateInput}
                value=""
                 placeholder={`${account.item.firstname}'s Events (${menuitems.length})`}
                 clearSelected={this.clearSelectedEvent}
                 oc ={
                    ({suggestionsContainerOpen: {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        width: '100%',
                        zIndex: 999999999
                    }
                })
                 }
                 />
            </div>
        )
    }
}

function mapStateToProps(state) {

    const { event, events, account, participant } = state

    return {
        event,
        events,
        account,
        participant
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        dispatch,
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)