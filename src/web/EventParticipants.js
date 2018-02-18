import React, { Component } from "react"
import { connect } from "react-redux"
import shallowCompare from 'react-addons-shallow-compare'
import "./styles/app.css"

import CircularProgress from "material-ui/Progress"
import Paper from "material-ui/Paper"
import { Card, CardHeader, CardText } from "material-ui/Card"
import IntegrationReactSelect from "./components/Select"
import Typography from 'material-ui/Typography';
import isEqual from 'lodash'

class EventParticipants extends Component {
    constructor(props) {
        super(props)
        this.state = { event: '' }
        this.handleUpdateInput = this.handleUpdateInput.bind(this)
        this.clearSelectedParticipant = this.clearSelectedParticipant.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.eventparticipants.item._id !== nextProps.eventparticipants.item._id
    }

    handleUpdateInput(item) {
            const { dispatch } = this.props
        console.log("EventParticipants --> handleUpdateInput ", item)

        if(!item){
         dispatch({ type: 'EVENT_PARTICIPANT_CLEAR' })
         return
        }

        this.setState({ event: item.label })
        this.props.dispatch({ type: 'EVENT_PARTICIPANT_FETCH_SUCCEEDED', payload: item.value })
    };

    clearSelectedParticipant() {
        const { dispatch } = this.props
        dispatch({ type: 'EVENT_PARTICIPANT_CLEAR' })
    }

    render() {


        const { eventparticipants } = this.props

        if (!eventparticipants.item) return (<div/>)

        const menuitems = (eventparticipants.item) ?
            eventparticipants.item.filter((item) => item.account.authorization === 'PARTICIPANT').map((item) => ({
                label: `${item.account.lastname}, ${item.account.firstname} -- ${item.account.email} `,
                value: item
            }))
            : []

        return (
            <Typography type="caption" color="inherit">
                <IntegrationReactSelect
                 options={menuitems}
                  value={this.state.event}
                  placeholder={"Search for participant(s)"}
                onChange={this.handleUpdateInput}
                 />
            </Typography>
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
