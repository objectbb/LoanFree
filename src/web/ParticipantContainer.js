import React, { Component } from "react";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Icon from 'material-ui/Icon'

import RouteMaker from "./RouteMaker"
import DataFeeder from "./DataFeeder"
import ParticipantTracking from "./ParticipantTracking"
import EventsContainer from './EventsContainer'
import PopOverIt from './components/PopOverIt'
import BackgroundProcess from "./BackgroundProcess"
import Profile from "./Profile"
import Logout from './Logout'
import Error from "./Error"

import "./styles/app.css"

import * as actions from "../actions"

class ParticipantContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { account } = this.props
        return (
            <div>

                    <Grid container spacing={0}>
                        <Grid item xs={10} sm={11}>
                        <div className="toolbar-background">
                          <EventsContainer />
                          </div>
                        </Grid>
                        <Grid item xs={2} sm={1}>
                               <Logout />
                        </Grid>
                    </Grid>

                <div>
                    <div className="toolbar right toolbar-background">
                            <div className="toolbar-item">
                                <PopOverIt icon={<Icon>account_circle</Icon>}>
                                    <Profile />
                                </PopOverIt>
                            </div>
                            <div className="toolbar-item">
                                <Error />
                            </div>
                            <div className="toolbar-item">
                                <BackgroundProcess />
                            </div>
                        </div>
                    <DataFeeder>
                        <ParticipantTracking />
                    </DataFeeder>

                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const { account } = state

    return {
        account,
        event
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantContainer)