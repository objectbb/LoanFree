import React, { Component } from "react"
import { connect } from "react-redux"
import * as actions from "../actions"
import { bindActionCreators } from "redux";
import { PropTypes } from "prop-types"
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'

import Button from "material-ui/Button"

import "./styles/app.css"


class Logout extends Component {
    constructor(props) {
        super(props)

        this.handleLogout = this.handleLogout.bind(this)
        this.stopIntervals = this.stopIntervals.bind(this)
    }

    handleLogout() {
        const { dispatch, account } = this.props

        const unauthenicate = { ...account }
        unauthenicate.authenticated = false;

        this.stopIntervals()
        this.props.actions.logoutUser()

    }


    stopIntervals() {
        const { dispatch, interval } = this.props

        console.log("Events --> stopIntervals ---> interval ", interval)

        if (interval.watchPositionId)
            this.props.actions.stopWatchPosition(interval.watchPositionId)

        if (interval.timerId)
            this.props.actions.stopInterval(interval.timerId)

        if (interval.timerMarkersVisitedId)
            this.props.actions.stopInterval(interval.timerMarkersVisitedId)

    }

    render() {
        const { error, isFetching } = this.props.account

        return (

            <Button onClick={this.handleLogout} color="inherit">
                <Icon className="logout" >exit_to_app</Icon>
            </Button>

        )
    }
}

function mapStateToProps(state) {
    const { account, interval } = state

    return {
        account,
        interval
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        dispatch,
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)