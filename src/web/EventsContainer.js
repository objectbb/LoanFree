import React, { Component } from "react"
import { PropTypes } from "prop-types"
import { connect } from "react-redux"
import "./styles/app.css"
import Events from './Events'

class EventsContainer extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps() {
        const { dispatch, account, event } = this.props

        console.log("EventsContainer -->  componentWillReceiveProps -->Events", this.props)
               dispatch({
                type: 'EVENT_PARTICIPANTS_FETCH_REQUESTED',
                payload: { _eventId: event._id }
            })
    }

    render() {

        return (
            <div>
               {this.props.account && <Events account={this.props.account.item} />}
            </div>
        )
    }
}

function mapStateToProps(state) {

    const { account, event } = state

    return {
        account,
        event
    }
}

export default connect(mapStateToProps)(EventsContainer)
