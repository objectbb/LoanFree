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
    }

    handleLogout() {
        const { dispatch, account } = this.props

        const unauthenicate = { ...account }
        unauthenicate.authenticated = false;

        this.props.actions.logoutUser()
    }


    render() {
        const { error, isFetching } = this.props.account

        return (

            <Button onClick={this.handleLogout} color="inherit">
                           <Icon>exit_to_app</Icon>
                  </Button>

        )
    }
}

function mapStateToProps(state) {
    const { account } = state

    return {
        account
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)