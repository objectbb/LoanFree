import React, { Component } from "react";
import RouteMaker from "./RouteMaker"
import DataFeeder from "./DataFeeder"

class ContainerMap extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <DataFeeder>
                <RouteMaker />
            </DataFeeder>
        )
    }
}

export default ContainerMap
