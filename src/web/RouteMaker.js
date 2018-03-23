import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Icon from 'material-ui/Icon'
import Badge from "material-ui/Badge"
import TextInput from "./components/TextInput"
import Dialog from "./components/Dialog"
import FullScreenDialog from "./components/FullScreenDialog"
import AddressGeocode from './AddressGeocode'
import MapIt from './MapIt'

import EditMarkerForm from './EditMarkerForm'

import Profile from "./Profile"
import RefreshProcess from "./RefreshProcess"
import Error from "./Error"

import PopOverIt from './components/PopOverIt'

import * as actions from "../actions"
import uuid from 'uuid'
import Grid from 'material-ui/Grid'
import Button from "material-ui/Button"
import { uniqWith, isEqual, debounce, throttle, remove } from 'lodash'

import "./styles/app.css"

class RouteMaker extends Component {

    constructor(props) {
        super(props);

        this.state = { isEditMarker: false, marker: {}, isPhoto: false, photoGallery: [] }

        this.addMarker = this.addMarker.bind(this)
        this.updateMarker = this.updateMarker.bind(this)
        this.viewPhotos = this.viewPhotos.bind(this)
        this.openEditMarker = this.openEditMarker.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.updatePosition = this.updatePosition.bind(this)
        this.removeMarker = this.removeMarker.bind(this)
        this.setCurrentRegionAddress = this.setCurrentRegionAddress.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    setCurrentRegionAddress(address) {
        this.props.actions.setCurrentRegionAddress(address)
    }

    addMarker() {
        let offset = .0006
        let length = this.props.event.item.markers.length;

        let lastcoords = this.props.region;

        let item = { coords: [lastcoords[0] + offset, lastcoords[1] + offset] };
        item.name = "MRKR #" + length + 1
        item.guid = uuid.v1();
        item.range = 50;

        let event = { ...this.props.event.item }
        event.markers = [...this.props.event.item.markers, item]

        event.__v = undefined

        console.log("RouteMaker --> addMarker --> event ", event)

        this.props.actions.setRouteMarkers(event)
    }

    viewPhotos(photogallery, e) {
        e.preventDefault()

        this.setState({ isPhoto: true, photoGallery: [...photogallery] })
    }

    removeMarker(item) {

        let newmarkers = this.props.event
            .item.markers.
        filter((marker) => marker.guid !== item.guid);

        console.log("RouteMaker --> removeMarker newmarkers ", newmarkers)

        let event = { ...this.props.event.item }
        event.markers = [...newmarkers];

        event.__v = undefined
        this.props.actions.setRouteMarkers(event)

    }

    openEditMarker(item) {
        this.setState({ isEditMarker: true, marker: item })
    }

    handleSubmit(item) {

        this.updateMarker({ ...item })
        this.setState({ isEditMarker: false })
    }

    handleCancel() {
        this.setState({ isEditMarker: false })
    }

    handleClose() {
        this.setState({ isPhoto: false });
    };

    updateMarker(item) {

        let { markers, _id, _accountId, _eventId, coords, name } = this.props.event.item

        const newmarkers = markers.map(
            (marker) => {
                if (marker.guid === item.guid) {
                    marker = item;
                }

                return marker;
            }
        );

        this.props.actions.setRouteMarkers({ _id, markers: newmarkers, _accountId, coords, name })
    }


    updatePosition(item) {

        let { markers, _id, _accountId, _eventId, coords, name } = this.props.event.item

        const newmarkers = markers.map(
            (marker) => {
                if (marker.guid === item.guid) {
                    marker.coords = item.coords;
                }

                return marker;
            }
        );

        this.props.actions.setRouteMarkers({ _id, markers: newmarkers, _accountId, coords, name })
    }


    render() {

        const { event } = this.props

        console.log("RouteMaker --> render --> markers ", event.item.markers)

        return (
            <span>

                <MapIt
                    routeMarkers = {event.item.markers}
                    participants={this.props.participants}
                    participant={this.props.participant}
                    removeMarker={this.removeMarker}
                    editMarker={this.openEditMarker}
                    region={this.props.region}
                    currLocation={this.props.location}
                    draggable={true}
                    updatePosition={this.updatePosition}
                    viewPhotos = {this.viewPhotos}
                    photos={this.props.photo}
                />

                <Dialog open={this.state.isEditMarker} header={""}>
                    <EditMarkerForm marker={this.state.marker}  handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} />
                </Dialog>

                <FullScreenDialog open={this.state.isPhoto} onHandleClose={this.handleClose}   header={""}>
                    <Grid container spacing={0}>
                        <Grid item xs={1} sm={3} md={3} lg={3}>
                        </Grid>
                        <Grid item xs={10} sm={6} md={5} lg={5}>
                        <ul className="photogallery">{this.state.photoGallery}</ul>
                        </Grid>
                        <Grid item xs={1} sm={3} md={5} lg={5}>
                        </Grid>
                    </Grid>
                </FullScreenDialog>

                {Object.getOwnPropertyNames(event.item).length > 0 &&
                <div className="toolbar bottom toolbar-background">

                    <Grid container spacing={0}>
                         <Grid item xs={6} sm={6} md={6} lg={6}>
                             <AddressGeocode />
                        </Grid>
                        <Grid item  sm={2} md={2} lg={2}>
                        </Grid>
                        <Grid item xs={6} sm={4} md={3} lg={3}>
                            <ul className="topbar-list">
                            {event.item._id &&
                                <li style={{width: '60px'}}>
                                    <Badge style={{ float: 'right'}}  badgeContent={event && event.item.markers.length} color="primary">
                                        <Button mini onClick={this.addMarker}  variant="fab" color="secondary" aria-label="add">
                                           <div className='action-button'>+ MRKR</div>
                                        </Button>
                                    </Badge>
                                </li>
                            }
                             <li style={{width: '20px'}}>&nbsp;</li>
                            <li style={{width: '60px'}}>
                               <RefreshProcess />
                            </li>
                            <li style={{width: '60px'}}>
                               <PopOverIt  anchorReference='anchorEl' icon={<Icon>account_circle</Icon>}>
                                    <Profile />
                                </PopOverIt>
                            </li>
                            </ul>
                         </Grid>
                    </Grid>
                </div>
            }
            </span>
        )
    }
}

function mapStateToProps(state) {
    const { location, region, eventparticipants, event, photo, participant } = state

    console.log("RouteMaker --> mapStateToProps --> eventparticipants", eventparticipants)

    return {
        participant,
        photo,
        event,
        participants: eventparticipants.item,
        region: region.coords,
        location
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteMaker)