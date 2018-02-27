import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'
import RouteMakerContainer from "./RouteMakerContainer"
import ParticipantContainer from "./ParticipantContainer"
import Typography from 'material-ui/Typography';
import { Map } from 'react-leaflet'
import Login from "./Login"
import Grid from 'material-ui/Grid'
import Profile from "./Profile"
import "./styles/animate.css"
import "./styles/app.css"

class App extends Component {

    constructor(props) {
        super(props);

        this.state = { shouldRegister: false };
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch, account } = nextProps

        if (account.authenticated && account.item.authorization === "ROUTEMAKER") {
            dispatch({
                type: 'EVENTS_FETCH_REQUESTED',
                payload: { _accountId: account.item._id }
            })
        }

        if (account.authenticated && account.item.authorization === "PARTICIPANT") {
            dispatch({
                type: 'EVENTS_PARTICIPANT_FETCH_REQUESTED',
                payload: { _accountId: account.item._id }
            })
        }
    }

    render() {
        const { account } = this.props
        return (
            <div>

                {!account.authenticated &&
                <div className="infinite fadeIn fadeIn-selection">
                    <Grid container spacing={40}>
                        <Grid item xs={1} sm={3} md={3} lg={3}>
                        </Grid>
                        <Grid item xs={10} sm={6} md={6} lg={6}>
                            <Login />
                            <br/>
                            <Typography>...or be an <i>Event Creator</i>...</Typography>
                            <Profile authorization='ROUTEMAKER' />
                        </Grid>
                        <Grid item xs={1} sm={3} md={3} lg={3}>
                        </Grid>
                    </Grid>
                </div>
                }
                {account.authenticated &&  account.item.authorization === "ROUTEMAKER"  &&
                <div className="infinite fadeIn fadeIn-selection">
                <RouteMakerContainer />
                </div>
                }
                {account.authenticated &&  account.item.authorization === "PARTICIPANT"  &&
                <div className="infinite fadeIn fadeIn-selection">
                <ParticipantContainer />
                </div>
                }

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