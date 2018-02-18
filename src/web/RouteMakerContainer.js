import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import RouteMaker from "./RouteMaker"
import DataFeeder from "./DataFeeder"

import Profile from "./Profile"
import Event from "./Event"
import EventParticipant from "./EventParticipant"
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import moment from 'moment'

import EventsContainer from './EventsContainer'
import EventParticipants from './EventParticipants'
import ImportEventParticipants from './ImportEventParticipants'
import Layout from './components/Layout'
import CollapsibleCard from './components/CollapsibleCard'
import FullWidthTabs from './components/FullWidthTabs'
import PopOverIt from './components/PopOverIt'
import Logout from './Logout'
import Icon from 'material-ui/Icon'

import Error from "./Error"
import BackgroundProcess from "./BackgroundProcess"
import * as actions from "../actions"

import "./styles/app.css"

class RouteMakerContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { account, event, events, eventparticipant, eventparticipants, participant, interval } = this.props

        console.log("RouteMakerContainer --> render --> event.item._id ", event.item._id)
        console.log("RouteMakerContainer --> render --> interval ", interval.onOff)

        return (
            <Layout
                    header={
                            <span>
                            <ul className="topbar-list">
                                <li style={{width: '50px'}}>
                                    <PopOverIt disabled={interval.onOff} icon={<Icon>more_vert</Icon>}>

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
                                    </PopOverIt>
                                </li>
                                <li style={{width: '50px'}}>
                                    <BackgroundProcess />
                                </li>
                                <li style={{width: '20px'}}>&nbsp;</li>
                                <li style={{width: '50%'}}>

                                        <div className="toolbar-background">
                                         <Typography type="title" >
                                            {event.item.name &&  `${event.item.name} -- ${moment(event.item.startdate).format('llll')}`}
                                          </Typography>
                                        </div>

                                </li>
                             </ul>

                                <div className="top-right">
                                    <Logout />
                                </div>
                        </span>

                        }
                    >
                    <div id='profile'>
                        <div className="toolbar bottom-right  toolbar-background">
                            <div className="toolbar-item">
                                <PopOverIt icon={<Icon>account_circle</Icon>}>
                                    <Profile />
                                </PopOverIt>
                            </div>
                            <div className="toolbar-item">
                                <Error />
                            </div>
                        </div>
                        <DataFeeder>
                            <RouteMaker />
                        </DataFeeder>
                    </div>

                </Layout>
        )
    }
}

function mapStateToProps(state) {
    const { account, event, events, eventparticipant, eventparticipants, participant, interval } = state

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