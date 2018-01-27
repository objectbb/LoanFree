import React, { Component } from "react"
import { PropTypes } from "prop-types"
import { connect } from "react-redux"

import Events from './Events'
import "./app.css"

class EventsContainer extends Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps() {
        console.log("EventsContainer -->  componentWillReceiveProps -->Events", this.props)
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

    const { account } = state

    return {
        account
    }
}

export default connect(mapStateToProps)(EventsContainer)