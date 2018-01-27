import React, { Component } from "react"
import { connect } from "react-redux"
import "./app.css"

import CircularProgress from "material-ui/Progress"
import Paper from "material-ui/Paper"
import { Card, CardHeader, CardText } from "material-ui/Card"
import IntegrationAutosuggest from './IntegrationAutosuggest'

class Participants extends Component {
    constructor(props) {
        super(props)
        this.handleUpdateInput = this.handleUpdateInput.bind(this)
    }

    componentDidMount() {
        console.log("Participants ---> componentDidMount --> event", this.props.event)
        const { dispatch } = this.props
        this.props.dispatch({
            type: 'EVENT_PARTICIPANTS_FETCH_REQUESTED',
            payload: { _eventId: this.props.event._id }
        })
    }

    handleUpdateInput(item) {
        console.log("Participants --> handleUpdateInput ", item.value)
        this.props.dispatch({ type: 'PARTICIPANT_FETCH_SUCCEEDED', payload: item.value })
    };


    render() {

        console.log("Participants --> render ", this.props.eventparticipants)
        const { eventparticipants } = this.props

        if (!eventparticipants.item) return (<div/>)

        const menuitems = (eventparticipants.item) ?
            eventparticipants.item.map((item) => ({
                text: `${item.account.lastname}, ${item.account.firstname} -- ${item.account.email} `,
                value: item
            }))
            : []

        console.log(menuitems)

        return (
            <div>
                <IntegrationAutosuggest data={menuitems} placeholder={"Search for participant"} handleUpdateInput={this.handleUpdateInput}/>
              </div>
        )

    }
}

function mapStateToProps(state) {

    const { eventparticipants, event, participant } = state

    console.log("Participants --> mapStateToProps --> eventparticipants", eventparticipants)

    return {
        eventparticipants,
        participant,
        event
    }
}

export default connect(mapStateToProps)(Participants)