import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from "../actions"

import style from "./styles/app.css";
import TextInput from "./components/TextInput"

class AddressGeocode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.address)
        this.props.actions.setCurrentRegionAddress(this.state.address)
    }

    handleChange(event) {
        this.setState({ address: event.target.value });
    }

    render() {

        return (
            <form  onSubmit={this.handleSubmit}>
                <TextInput
                className="address_geocode"
                text="Enter Start Address"
                type="text"
                uniquename="address"
                content={this.state.address}
                onChange={this.handleChange}
                onBlur={this.handleSubmit}
                placeholder="Address" />
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}


export default connect(null, mapDispatchToProps)(AddressGeocode)