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
import Layout from './components/Layout'
import CollapsibleCard from './components/CollapsibleCard'
import Logout from './Logout'

import "./styles/app.css"

import * as actions from "../actions"

class RouteMakerContainer extends Component {

    constructor(props) {
        super(props);
    }


    render() {

            const {  account, event, eventparticipant,eventparticipants } = this.props

            console.log("RouteMakerContainer --> mapStateToProps --> account", account)
            console.log("RouteMakerContainer --> render --> event", event)
            console.log("RouteMakerContainer --> render --> eventparticipant", eventparticipant)
            console.log("RouteMakerContainer --> render --> eventparticipants", eventparticipants)

            return (
                    <div>
                    <Layout
                    header={<span><EventsContainer /> </span>}
                      logout={<Logout />}
                        body={
                                <div>
                                    <DataFeeder>
                                        <RouteMaker />
                                    </DataFeeder>

                                </div>
                            }
                    >

                    <br />
                            <div className="cards-layout">
                            <CollapsibleCard title="Profile">
                                <Profile />
                             </CollapsibleCard>

                             {Object.getOwnPropertyNames(event.item).length > 0  &&
                             <CollapsibleCard title="Event">
                                <Event />
                             </CollapsibleCard>
                            }

                             {eventparticipants &&
                            <CollapsibleCard title="Participants">
                                <EventParticipants />
                                <br />
                                {eventparticipant && <EventParticipant />}
                            </CollapsibleCard>}
                            </div>
                      </Layout>
            < /div>
    )
}
}

function mapStateToProps(state) {
    const { account, event, eventparticipant,eventparticipants } = state

    console.log("RouteMakerContainer --> mapStateToProps --> account", account)
    console.log("RouteMakerContainer --> mapStateToProps --> event", event)
    console.log("RouteMakerContainer --> mapStateToProps --> eventparticipant", eventparticipant)
    console.log("RouteMakerContainer --> mapStateToProps --> eventparticipants", eventparticipants)

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
