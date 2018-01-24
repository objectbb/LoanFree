import React, { Component } from "react";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";
import RouteMaker from "./RouteMaker"
import DataFeeder from "./DataFeeder"
import Login from "./Login"
import Profile from "./Profile"
import Event from "./Event"
import Participant from "./Participant"
import AddressGeocode from './AddressGeocode'

import * as actions from "../actions"

class ContainerMap extends Component {

    constructor(props) {
        super(props);
        this.setCurrentRegionAddress = this.setCurrentRegionAddress.bind(this);
    }

    setCurrentRegionAddress(address) {
        this.props.actions.setCurrentRegionAddress(address)
    }



    render() {
        return (
            <div>
         <Login />
            <Profile />
            <Event />
            <Participant />

            <DataFeeder>
                <RouteMaker />
            </DataFeeder>
            <AddressGeocode geocode={ this.setCurrentRegionAddress}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { account } = state

    return {
        account: account
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerMap)