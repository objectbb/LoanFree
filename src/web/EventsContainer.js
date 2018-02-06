import React, { Component } from "react"
import { PropTypes } from "prop-types"
import { connect } from "react-redux"
import "./styles/app.css"
import Events from './Events'

class EventsContainer extends Component {
    constructor(props) {
        super(props)
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