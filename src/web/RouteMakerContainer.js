import React, { Component } from "react";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";

import RouteMaker from "./RouteMaker"
import DataFeeder from "./DataFeeder"

import Profile from "./Profile"
import Event from "./Event"
import EventParticipant from "./EventParticipant"

import EventsContainer from './EventsContainer'
import EventParticipants from './EventParticipants'
import ImportEventParticipants from './ImportEventParticipants'
import Layout from './components/Layout'
import CollapsibleCard from './components/CollapsibleCard'
import FullWidthTabs from './components/FullWidthTabs'
import Logout from './Logout'

import moment from 'moment'

import "./styles/app.css"

import * as actions from "../actions"

class RouteMakerContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {

            const { account, event, eventparticipant, eventparticipants } = this.props

            return (
                    <div>
                    <Layout
                    header={<span><EventsContainer /> </span>}
                      logout={<Logout />}
                      drawerheader={event.item.name && `${event.item.name} -- ${moment(event.item.startDate).format('llll')}`}
                        body={
                                <div>
                                    <DataFeeder>
                                        <RouteMaker />
                                    </DataFeeder>

                                </div>
                            }
                    >
                         <FullWidthTabs>
                                <Profile header= "Profile" />
                                <Event header= "Event"/>
                                    <div header={`Participants ${eventparticipants.item.length}`}
                                    disable={event.item._id === undefined}>
                                    <br />
                                    {eventparticipants.item.length > 1 &&  <EventParticipants />}
                                    <br />
                                    <EventParticipant />
                                   <ImportEventParticipants />
                                    </div>
                               </FullWidthTabs>

            < /Layout>
            < /div>
        )
    }
}

function mapStateToProps(state) {
    const { account, event, eventparticipant, eventparticipants } = state

    return {
        account,
        event,
        eventparticipant,
        eventparticipants
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteMakerContainer)