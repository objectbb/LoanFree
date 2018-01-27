import React, { Component } from "react"
import { PropTypes } from "prop-types"
import { connect } from "react-redux"

import Events from './Events'
import Participants from './Participants'
import "./app.css"

class ParticipantsContainer extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps() {
        console.log("ParticipantsContainer -->  componentWillReceiveProps -->Participants", this.props.event)
    }

    render() {
        console.log("ParticipantsContainer -->  render -->Participants", this.props.event)

        return (
            <div>
               {this.props.event && <Participants event={this.props.event.item} />}
            </div>
        )
    }
}

function mapStateToProps(state) {

    const { event } = state

    return {
        event
    }
}

export default connect(mapStateToProps)(ParticipantsContainer)