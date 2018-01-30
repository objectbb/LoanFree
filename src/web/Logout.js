import React, { Component } from "react"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"
import Typography from 'material-ui/Typography'

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

        dispatch({ type: 'ACCOUNT_LOGOFF' })
    }


    render() {
        const { error, isFetching } = this.props.account

        return (
            <div>
                  <Button onClick={this.handleLogout} color="inherit">
                             <Typography color="inherit" >
                              Logout
                          </Typography>
                  </Button>
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

export default connect(mapStateToProps)(Logout)