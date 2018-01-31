import React, { Component } from "react"
import { connect } from "react-redux"
import "./styles/app.css"

import CircularProgress from "material-ui/Progress"
import Paper from "material-ui/Paper"
import { Card, CardHeader, CardText } from "material-ui/Card"

import IntegrationAutosuggest from './components/IntegrationAutosuggest'

class Events extends Component {
    constructor(props) {
        super(props)
        this.handleUpdateInput = this.handleUpdateInput.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props
        this.props.dispatch({
            type: 'EVENTS_FETCH_REQUESTED',
            payload: { _accountId: this.props.account._id }
        })
    }

    handleUpdateInput(item) {
        this.props.dispatch({ type: 'EVENT_FETCH_SUCCEEDED', payload: item.value })
        this.props.dispatch({ type: 'PARTICIPANT_FETCH_REQUESTED', payload: { _eventId: item.value._id, _accountId: this.props.account._id } })
    };


    render() {

        const { events, account } = this.props

        if (Object.getOwnPropertyNames(events.item).length === 0) return (<div/>)

        const menuitems = (events) ?
            events.item.map((item) => ({
                text: `${item.name} - ${item.address} ${item.city} ${item.state} `,
                value: item
            }))
            : []

        console.log(menuitems)

        return (
            <div>
                <IntegrationAutosuggest data={menuitems} handleUpdateInput={this.handleUpdateInput} placeholder={`${account.item.firstname}'s Events`}/>
            </div>
        )
    }
}

function mapStateToProps(state) {

    const { events, event, account } = state

    return {
        events,
        event,
        account
    }
}

export default connect(mapStateToProps)(Events)