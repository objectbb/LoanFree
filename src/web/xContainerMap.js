import React, { Component } from "react";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";

import AppBar from 'material-ui/AppBar';

import RouteMaker from "./RouteMaker"
import DataFeeder from "./DataFeeder"

import Profile from "./Profile"
import Event from "./Event"
import Participant from "./Participant"

import EventsContainer from './EventsContainer'
import ParticipantsContainer from './ParticipantsContainer'
import Layout from './components/Layout'
import CollapsibleCard from './components/CollapsibleCard'
import Logout from './Logout'

import "./styles/app.css"

import * as actions from "../actions"

class ContainerMap extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {

        const { event, account } = this.props

        console.log("ContainerMap --> componentDidMount --> event", this.props.event)

    }


    render() {
            console.log("ContainerMap --> render --> account", this.props.account)

            const { account } = this.props

            console.log("ContainerMap --> render --> account", account.item.authorization)
            return (
                    <div>
                    <Layout
                    header={<span><EventsContainer /> </span>}
                      logout={<Logout />}
                        body={account.item.authorization == "ROUTEMAKER"  &&
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
                             <CollapsibleCard title="Event">
                                <Event />
                             </CollapsibleCard>

                            <CollapsibleCard title="Participants">
                                <ParticipantsContainer />
                                <br />
                                <Participant />
                            </CollapsibleCard>
                            </div>
                      </Layout>
            < /div>
    )
}
}

function mapStateToProps(state) {
    const { account } = state

    console.log("ContainerMap --> mapStateToProps --> account", account)

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

export default connect(mapStateToProps, mapDispatchToProps)(ContainerMap)