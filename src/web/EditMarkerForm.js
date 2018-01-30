import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Icon from 'material-ui/Icon'
import TextInput from "./components/TextInput"
import style from "./styles/app.css"


class EditMarkerForm extends Component {

    constructor(props) {
        super(props)

        this.state = { ...this.props.marker }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.isEnabled = this.isEnabled.bind(this)
    }


    handleChange(e) {
        e.preventDefault()
        const target = e.target
        const value = target.type === "checkbox" ? target.checked : target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.handleSubmit(this.state)
    }


    isEnabled() {

        const {
            name,
            range
        } = this.state

        return (
            (name && name.trim().length > 5) &&
            (range > 0)
        )
    }

    render() {

        const {
            name,
            range
        } = this.state

        let isEnabled = this.isEnabled()

        console.log("EditMarkerForm --> render --> isEnabled", isEnabled)

        return (
            <form onSubmit={this.handleSubmit}>
         <TextInput
                uniquename="name"
                text="Marker Name"
                minCharacters={6}
                onChange={this.handleChange}
                content={name}
                required={true}
                errorMessage="Name is invalid"
                emptyMessage="Name is required"
              />
                <TextInput
                uniquename="range"
                text="Range"
                minCharacters={6}
                onChange={this.handleChange}
                content={range}
                required={true}
                errorMessage="Range is invalid"
                emptyMessage="Range is required"
              />
              <button type="submit" >OK</button>
    </form>
        )
    }
}


export default EditMarkerForm