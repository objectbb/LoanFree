import React, { Component } from "react";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";

import RouteMaker from "./RouteMaker"
import DataFeeder from "./DataFeeder"

import Profile from "./Profile"
import Event from "./Event"
import EventParticipant from "./EventParticipant"
import Grid from 'material-ui/Grid';

import EventsContainer from './EventsContainer'
import EventParticipants from './EventParticipants'
import ImportEventParticipants from './ImportEventParticipants'
import Layout from './components/Layout'
import CollapsibleCard from './components/CollapsibleCard'
import FullWidthTabs from './components/FullWidthTabs'
import PopOverIt from './components/PopOverIt'
import Logout from './Logout'

import moment from 'moment'
import "./styles/app.css"

import * as actions from "../actions"

class RouteMakerContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { account, event, events, eventparticipant, eventparticipants, participant } = this.props

        console.log("RouteMakerContainer --> render --> event.item._id ", event.item._id)

        return (
            <Layout
                    header={
                        <Grid container spacing={0}>
                            <Grid item xs={7} sm={8} md={10} lg={10}>
                                {event.item.name &&  `${event.item.name} -- ${moment(event.item.startdate).format('llll')}`}
                            </Grid>
                            <Grid item xs={1} sm={2} md={1} lg={1}>
                                <PopOverIt>
                                    <Profile />
                                </PopOverIt>
                            </Grid>
                            <Grid item xs={1} sm={2} md={1} lg={1}>
                                <Logout />
                            </Grid>
                        </Grid>
                        }

                        body={
                                <div>
                                    <DataFeeder>
                                        <RouteMaker />
                                    </DataFeeder>
                                </div>
                            }
                    >

                    {events.item.length > 0 && <EventsContainer />}
                         <FullWidthTabs>
                                <Event header= "Event"/>
                                    <div header={`Participants ${eventparticipants.item.length}`}
                                    disable={participant.item._id ? false : true}>
                                    <br />
                                    {eventparticipants.item.length > 1 &&  <EventParticipants />}
                                    <br />
                                    <EventParticipant />
                                   <ImportEventParticipants />
                                    </div>
                               </FullWidthTabs>

                </Layout>
        )
    }
}

function mapStateToProps(state) {
    const { account, event, events, eventparticipant, eventparticipants, participant,interval } = state

    return {
        interval,
        account,
        event,
        events,
        eventparticipant,
        eventparticipants,
        participant
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        dispatch,
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteMakerContainer)
