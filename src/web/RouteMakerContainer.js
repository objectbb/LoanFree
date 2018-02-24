import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import RouteMaker from "./RouteMaker"
import Event from "./Event"
import Error from "./Error"
import BackgroundProcess from "./BackgroundProcess"
import EventParticipant from "./EventParticipant"

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import moment from 'moment'

import Button from "material-ui/Button"
import EventsContainer from './EventsContainer'
import EventParticipants from './EventParticipants'
import ImportEventParticipants from './ImportEventParticipants'
import Layout from './components/Layout'
import CollapsibleCard from './components/CollapsibleCard'
import FullWidthTabs from './components/FullWidthTabs'
import PopOverIt from './components/PopOverIt'
import FullScreenDialog from "./components/FullScreenDialog"
import Logout from './Logout'
import Icon from 'material-ui/Icon'
import Badge from "material-ui/Badge"

import * as actions from "../actions"

import "./styles/app.css"

class RouteMakerContainer extends Component {

    constructor(props) {
        super(props)
        this.state = { isEventOpen: false }

        this.handleClose = this.handleClose.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
    }

    handleClose() {
        this.setState({ isEventOpen: false });
    }

    handleClickOpen() {
        this.setState({ isEventOpen: true });
    }

    render() {

        const {
            account,
            event,
            events,
            eventparticipant,
            eventparticipants,
            participant,
            interval,
            activity
        } = this.props

        console.log("RouteMakerContainer --> render --> event.item._id ", event.item._id)
        console.log("RouteMakerContainer --> render --> interval ", interval.onOff)

        return (
            <Layout
                    header={
                            <span>
                            <ul className="topbar-list">
                                <li style={{width: '50px'}}>
                                    <Badge style={{ float: 'right'}}  badgeContent={events && events.item.length} color="primary">
                                        <Button disabled={interval.onOff} mini onClick={this.handleClickOpen}  variant="fab" color="secondary" aria-label="event" >
                                            <div className='action-button'>EVENTS</div>
                                        </Button>
                                    </Badge>

                                    <FullScreenDialog  open={this.state.isEventOpen} onHandleClose={this.handleClose} onClick={this.handleClickOpen}  header={""} >
                                        {events.item.length > 0 && <EventsContainer />}
                                        <FullWidthTabs>
                                            <Event header= "Event"/>
                                            <div header={`Participants ${eventparticipants.item.length}`}
                                                disable={participant.item._id ? false : true}>
                                                <br />
                                                {eventparticipants.item.length > 1 &&  <EventParticipants />}
                                                <br />
                                                <EventParticipant />
                                            </div>
                                            <div header='Import' disable={participant.item._id ? false : true}>
                                                <ImportEventParticipants />
                                            </div>
                                        </FullWidthTabs>
                                    </FullScreenDialog>
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
                        <div className="toolbar bottom-right">
                            <Error />
                        </div>
                        <RouteMaker />
                    </div>

                </Layout>
        )
    }
}

function mapStateToProps(state) {
    const {
        account,
        event,
        events,
        eventparticipant,
        eventparticipants,
        participant,
        interval,
        activity
    } = state

    return {
        interval,
        account,
        event,
        events,
        eventparticipant,
        eventparticipants,
        participant,
        activity
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        dispatch,
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteMakerContainer)