import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Button from "material-ui/Button"
import Icon from 'material-ui/Icon'
import TextField from 'material-ui/TextField'
import TextInput from "./components/TextInput"
import "./styles/app.css"


class EditMarkerForm extends Component {

    constructor(props) {
        super(props)

        this.state = { ...this.props.marker }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
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

    handleCancel(e) {
        e.preventDefault()
        this.props.handleCancel()
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
                    minMessage="Minimum characters"
                  />

                  <TextField
                  id="range"
                  label="Range (m)"
                  name="range"
                  value={range}
                  onChange={this.handleChange}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                />
                <br />
                <Button variant="fab" mini color="primary" disabled={!isEnabled} onClick={this.handleSubmit} >
                  <div className='action-button'>SAVE</div>
                </Button>

                <Button style={{float:'right'}} variant="fab" mini color="secondary" onClick={this.handleCancel} >
                  <div className='action-button'>CANCEL</div>
                </Button>
            </form>
        )
    }
}


export default EditMarkerForm