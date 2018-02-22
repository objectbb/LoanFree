import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'
import RouteMakerContainer from "./RouteMakerContainer"
import ParticipantContainer from "./ParticipantContainer"
import Typography from 'material-ui/Typography';
import Login from "./Login"
import Profile from "./Profile"
import "./styles/animate.css"
import "./styles/app.css"

class App extends Component {

    constructor(props) {
      super(props);

      this.state = {shouldRegister: false};
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
                    <Login />
                    <br/>
                   <Typography>...or just register to create...</Typography>
                    <Profile authorization='ROUTEMAKER' />
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
