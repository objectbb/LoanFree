import React, { Component } from "react"
import { PropTypes } from "prop-types"
import { connect } from "react-redux"
import "./styles/app.css"
import Events from './Events'

class EventsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = { account: this.props.account }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ account: nextProps.account })
    }

    render() {
        console.log("EventsContainer --> render --> ", this.props)
        return (
            <div>
               {this.state.account && <Events account={this.state.account.item} />}
            </div>
        )
    }
}

function mapStateToProps(state) {

    const { account, events } = state

    return {
        account,
        events
    }
}

export default connect(mapStateToProps)(EventsContainer)