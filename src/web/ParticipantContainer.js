import React, { Component } from "react";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';

import RouteMaker from "./RouteMaker"
import DataFeeder from "./DataFeeder"
import ParticipantTracking from "./ParticipantTracking"
import EventsContainer from './EventsContainer'
import Logout from './Logout'

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
                <AppBar>
                    <Grid container spacing={24}>
                    <Grid item xs={9}>
                      <EventsContainer />
                    </Grid>
                    <Grid item xs={3}>
                           <Logout />
                    </Grid>

                    </Grid>
                </AppBar>
                <div>
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