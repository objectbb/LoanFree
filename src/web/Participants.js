import React, { Component } from "react"
import { connect } from "react-redux"
import "./app.css"
import FontIcon from "material-ui/FontIcon"

import CircularProgress from "material-ui/CircularProgress"
import Paper from "material-ui/Paper"
import { Card, CardHeader, CardText } from "material-ui/Card"
import AutoComplete from 'material-ui/AutoComplete';

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

                  <Card>

                    <CardText>

                        <AutoComplete
                            floatingLabelText="Search Participants"
                            filter={AutoComplete.fuzzyFilter}
                             openOnFocus={true}
                          dataSource={menuitems}
                          floatingLabelText={"Search Participants [" + menuitems.length + "]"}
                          onNewRequest={this.handleUpdateInput}
                          fullWidth={true}
                        />

                    </CardText>
                  </Card>
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