import React, { Component } from "react"
import { PropTypes } from "prop-types"
import { connect } from "react-redux"
import "./styles/app.css"
import EventParticipants from './EventParticipants'


class EventParticipantsContainer extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps() {
        console.log("EventParticipantsContainer -->  componentWillReceiveProps -->eventparticipants", this.props.eventparticipants)
    }

    render() {
        console.log("EventParticipantsContainer -->  render -->eventparticipants", this.props.eventparticipants)

        return (
            <div>
               {this.props.eventparticipants && <EventParticipants event={this.props.eventparticipants.item} /> }
            </div>
        )
    }
}

function mapStateToProps(state) {

    const { eventparticipants } = state

    return {
        eventparticipants
    }
}

export default connect(mapStateToProps)(EventParticipantsContainer)
