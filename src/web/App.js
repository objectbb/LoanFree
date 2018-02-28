import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'
import RouteMakerContainer from "./RouteMakerContainer"
import ParticipantContainer from "./ParticipantContainer"
import Typography from 'material-ui/Typography'
import { Map } from 'react-leaflet'
import Login from "./Login"
import Grid from 'material-ui/Grid'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
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
                    <Grid container spacing={0}>
                        <Grid item xs sm md={2} lg={2}>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                               {!account.error &&
                                <div className="infinite fadeIn fadeIn-selection backgroundimg-login promo-card">
                                <Login />
                           </div>
                            }
                            <br/>
                            {account.error &&
                                <div className="infinite fadeIn fadeIn-selection backgroundimg-register promo-card">
                                  <Typography>
                                      <div style={{ color: "red" }}>
                                        {(account.error === "No data") ? "Login not found, please reachout to your contact for this event." : error}
                                      </div>
                                        If you are here to setup an event, create an account or <i>Refresh</i> and try a different login.
                                    </Typography>
                                    <Profile authorization='ROUTEMAKER' />
                                </div>
                            }
                        </Grid>
                        <Grid item xs sm md={3} lg={3}>
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