import React, { Component } from "react"
import { connect } from "react-redux"
import "./styles/app.css"

import CircularProgress from "material-ui/Progress"
import Paper from "material-ui/Paper"
import { Card, CardHeader, CardText } from "material-ui/Card"
import IntegrationAutosuggest from './components/IntegrationAutosuggest'

class EventParticipants extends Component {
    constructor(props) {
        super(props)
        this.handleUpdateInput = this.handleUpdateInput.bind(this)
        this.clearSelectedParticipant = this.clearSelectedParticipant.bind(this)
    }

    handleUpdateInput(item) {
        console.log("EventParticipants --> handleUpdateInput ", item.value)
        this.props.dispatch({ type: 'EVENT_PARTICIPANT_FETCH_SUCCEEDED', payload: item.value })
    };

    clearSelectedParticipant() {
        const { dispatch } = this.props
        dispatch({ type: 'EVENT_PARTICIPANT_CLEAR' })
    }

    render() {

        console.log("EventParticipants --> render ", this.props.eventparticipants)
        const { eventparticipants } = this.props

        if (!eventparticipants.item) return (<div/>)

        const menuitems = (eventparticipants.item) ?
            eventparticipants.item.filter((item) => item.authorization === 'PARTICIPANT').map((item) => ({
                text: `${item.account.lastname}, ${item.account.firstname} -- ${item.account.email} `,
                value: item
            }))
            : []

        return (
            <div>
                <IntegrationAutosuggest
                data={menuitems}
                placeholder={"Search for participant(s)"}
                value=""
                 handleUpdateInput={this.handleUpdateInput}
                  clearSelected={this.clearSelectedParticipant}
                 />
              </div>
        )

    }
}

function mapStateToProps(state) {

    const { eventparticipants } = state

    console.log("EventParticipants --> mapStateToProps --> eventparticipants", eventparticipants)

    return {
        eventparticipants
    }
}

export default connect(mapStateToProps)(EventParticipants)