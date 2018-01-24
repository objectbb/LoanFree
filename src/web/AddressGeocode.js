import React, { Component } from "react"
import style from "./app.css";
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
        this.props.geocode(this.state.address)
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


export default AddressGeocode