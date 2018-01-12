import React, { Component } from "react";
import RouteMaker from "./RouteMaker"

class ContainerMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            participants: []
        };
    }


    render() {
        return (
            <RouteMaker />
        )
    }
}

export default ContainerMap