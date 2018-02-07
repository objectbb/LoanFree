import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from "../actions"
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';

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
        this.onClear = this.onClear.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.address)

        if (this.state.address && this.state.address.length > 4)
            this.props.actions.setCurrentRegionAddress(this.state.address)
    }

    handleChange(event) {
        this.setState({ address: event.target.value });
    }

    onClear() {
        this.setState({ address: "" })
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>

          <Input
              className="address_geocode"
              value={this.state.address}
                onChange={this.handleChange}
                onBlur={this.handleSubmit}
                placeholder="Enter Start Address"
                endAdornment={<InputAdornment  onClick={this.onClear} position="end">X</InputAdornment>}
          />
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