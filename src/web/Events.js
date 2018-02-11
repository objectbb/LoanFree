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
        this.handleUpdateInput = this.handleUpdateInput.bind(this)
        this.clearSelectedEvent = this.clearSelectedEvent.bind(this)
    }

    /*
        componentDidMount() {

            console.log("Events --> componentWillUpdate --> ", this.props.account)

            this.props.dispatch({
                type: 'EVENTS_FETCH_REQUESTED',
                payload: { _accountId: this.props.account._id }
            })
        }
    */

    clearSelectedEvent() {
        const { dispatch } = this.props

        dispatch({ type: 'EVENT_CLEAR' })
        dispatch({ type: 'EVENT_PARTICIPANTS_CLEAR' })

        if (this.state && this.state.watchPositionId)
            this.props.actions.stopWatchPosition(this.state.watchPositionId)

        if (this.state && this.state.timerId)
            this.props.actions.stopLoadParticipants(this.state.timerId)
    }

    handleUpdateInput(item) {
        const { dispatch, account, participant } = this.props

        dispatch({ type: 'EVENT_FETCH_SUCCEEDED', payload: item.value })
        dispatch({ type: 'PARTICIPANT_FETCH_REQUESTED', payload: { _eventId: item.value._id, _accountId: account.item._id } })


        if (item.value._id) {
            dispatch({ type: 'EVENT_PARTICIPANTS_FETCH_REQUESTED', payload: { _eventId: item.value._id } })
            dispatch({ type: 'PHOTO_FETCH_REQUESTED', payload: { _eventId: item.value._id } })
        }

        dispatch({ type: 'SET_CURRENT_REGION', coords: [item.value.coords[0], item.value.coords[1]] })

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