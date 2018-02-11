import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'
import RouteMakerContainer from "./RouteMakerContainer"
import ParticipantContainer from "./ParticipantContainer"
import Typography from 'material-ui/Typography';
import Login from "./Login"
import Error from "./Error"

class App extends Component {

    componentWillReceiveProps(nextProps) {
        const { dispatch, account } = nextProps

        console.log("App --> componentWillReceiveProps --> props ", this.props)
        console.log("App --> componentWillReceiveProps --> nextProps ", nextProps)

        if (account.authenticated) {
            dispatch({
                type: 'EVENTS_FETCH_REQUESTED',
                payload: { _accountId: account.item._id }
            })
        }
    }

    render() {
        const { account } = this.props
        return (
            <div>

            {!account.authenticated && <Login />}
             {account.authenticated &&  account.item.authorization === "ROUTEMAKER"  && <RouteMakerContainer />}
            {account.authenticated &&  account.item.authorization === "PARTICIPANT"  && <ParticipantContainer />}
            <Error />

            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { account, event } = state

    console.log("App --> mapStateToProps --> account", account)

    return {
        account
    }
}

export default connect(mapStateToProps)(App)