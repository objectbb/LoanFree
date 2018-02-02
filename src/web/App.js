import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'
import RouteMakerContainer from "./RouteMakerContainer"
import ParticipantContainer from "./ParticipantContainer"
import Login from "./Login"

class App extends Component {

    componentWillMount() {
        const { dispatch, account, event } = this.props

        if (account.authenticated) {
            dispatch({
                type: 'EVENTS_FETCH_REQUESTED',
                payload: { _accountId: account._id }
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
        account,
        event
    }
}

export default connect(mapStateToProps)(App)