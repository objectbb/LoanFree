import React, { Component } from "react";
import { connect } from "react-redux"
import { bindActionCreators } from "redux";

import AppBar from 'material-ui/AppBar';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';

import RouteMaker from "./RouteMaker"
import DataFeeder from "./DataFeeder"
import Login from "./Login"
import Profile from "./Profile"
import Event from "./Event"
import Participant from "./Participant"
import AddressGeocode from './AddressGeocode'
import EventsContainer from './EventsContainer'
import ParticipantsContainer from './ParticipantsContainer'
import Layout from './Layout'

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
        console.log("ContainerMap --> render --> account", this.props.account)

        const { account } = this.props

        console.log("ContainerMap --> render --> account", account.item.authorization)
        return (
            <div>




         {!account.authenticated && <Login />}

        {account.authenticated  &&
           <div>
               <AppBar
                 title={<EventsContainer />}
               />

               <Layout>
                <Profile />


                <Event />

                 <ParticipantsContainer />
                <Participant />
                </Layout>

                {account.item.authorization == "ROUTEMAKER"  &&
                    <div>
                        <DataFeeder>
                            <RouteMaker />
                        </DataFeeder>
                    </div>
                }

                <BottomNavigation>
                    <AddressGeocode geocode={ this.setCurrentRegionAddress}/>
                </BottomNavigation>
            </div>
        }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { account } = state

    console.log("ContainerMap --> mapStateToProps --> account", account)

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