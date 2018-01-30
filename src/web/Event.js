import React, { Component } from "react"
import { PropTypes } from "prop-types"
import { connect } from "react-redux"
import TextInput from "./components/TextInput"
import "./styles/app.css"

import Button from "material-ui/Button"
import { CircularProgress } from "material-ui/Progress"
import { Paper } from "material-ui/Paper"
import { Card, CardHeader, CardText } from "material-ui/Card"
import Checkbox from "material-ui/Checkbox"
import Select from "material-ui/Select"
import MenuItem from "material-ui/Menu"
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'

class Event extends Component {
    constructor(props) {
        super(props)

        this.state = { ...props.event.item };

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleGeocode = this.handleGeocode.bind(this)
        this.isEnabled = this.isEnabled.bind(this)
    }

    componentDidMount() {
        const { event } = this.props;
        console.log("Event --> componentDidMount --> event", event)
    }

    componentWillReceiveProps() {
        const { event } = this.props;
        console.log("Event --> componentWillReceiveProps --> event", event)

        this.setState({
            ...this.props.event.item
        });
    }

    handleSubmit(e) {
        e.preventDefault()
        const { coords } = this.props.event.item

        const { dispatch, account, participant } = this.props;

        console.log("Events --> handleSubmit --> event", this.state)

        dispatch({ type: 'EVENT_UPSERT_REQUESTED', payload: { ...this.state, coords, _accountId: account.item.id } });

/*
        const participant = {
            _id: participant.item._id,
            _eventId: event.item._id,
            _accountId: account.item._id,
            _teamdId: '',
            coords: event.item.coords
        }

        dispatch({ type: 'PARTICIPANT_UPSERT_REQUESTED', payload: { ...participant } })
*/
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

    validateEmail(value) {
        return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? "Invalid email address"
            : undefined
    }

    handleGeocode() {
        const { address, city, state, zipcode } = this.state

        if (!(address && city && state && zipcode)) return

        const { dispatch } = this.props;

        this.props.dispatch({
            type: 'REQUEST_GEOCODE',
            payload: { ...this.state, nextAction: 'EVENT_UPSERT_SUCCEEDED' }
        })
    }

    isEnabled() {

        const { message, isFetching } = this.props

        const {
            name,
            displayname,
            description,
            address,
            startdate,
            city,
            state,
            zipcode
        } = this.state

        return (
            (description && description.trim().length > 9) &&
            startdate &&
            (name && name.trim().length > 5) &&
            (displayname && displayname.trim().length > 1) &&
            (address && address.trim().length > 5) &&
            (city && city.trim().length > 1) &&
            (state && state.trim().length > 1) &&
            (zipcode && zipcode.trim().length > 4)
        )
    }

    render() {

        const { error, isFetching } = this.props.event
        const { coords } = this.props.event.item
        const {
            name,
            displayname,
            startdate,
            enddate,
            description,
            address,
            city,
            state,
            zipcode
        } = this.state

        let isEnabled = this.isEnabled()

        const items = [];

        const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT',
            'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA',
            'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
            'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK',
            'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
        ].
        map((state, i) => <option value={state} key={i}>{state}</option>)

        return (
            <div className="card">

              <TextInput
                uniquename="name"
                text="Name"
                minCharacters={6}
                onChange={this.handleChange}
                content={name}
                required={true}
                errorMessage="Name is invalid"
                emptyMessage="Name is required"
              />
              <br />


              <TextInput
                uniquename="displayname"
                text="Display Name"
                minCharacters={5}
                required={true}
                onChange={this.handleChange}
                content={displayname}
                errorMessage="Display Name is invalid"
                emptyMessage="Display Name  is required"
              />
              <br />


                 <TextField
                     name="startdate"
                    label="Start Date"
                     fullWidth={true}
                    onChange={this.handleChange}
                    type="datetime-local"
                        value={startdate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

            <TextInput
                uniquename="description"
                text="Description"
                minCharacters={10}
                required={true}
                onChange={this.handleChange}
                content={description}
                multiLine={true}
                errorMessage="Description is invalid"
                emptyMessage="Description is required"
              />
              <br />
                 <TextInput
                uniquename="address"
                text="Address"
                minCharacters={5}
                required={true}
                  onBlur={this.handleGeocode}
                onChange={this.handleChange}
                content={address}
                multiLine={true}
                errorMessage="Address is invalid"
                emptyMessage="Address is required"
              />
              <br />
               {coords}
              <br />
                 <TextInput
                uniquename="city"
                text="City"
                minCharacters={4}
                required={true}
                onBlur={this.handleGeocode}
                onChange={this.handleChange}
                content={city}
                multiLine={true}
                errorMessage="City is invalid"
                emptyMessage="City is required"
              />
              <br />

          <Select
          native
            name="state"
            onBlur={this.handleGeocode}
             fullWidth={true}
            value={state}
            onChange={this.handleChange}
          >
            {states}
          </Select>

                  <br />

            <TextInput
                uniquename="zipcode"
                text="Zip Code"
                minCharacters={5}
                required={true}
                onBlur={this.handleGeocode}
                onChange={this.handleChange}
                content={zipcode}
                errorMessage="Zip Code is invalid"
                emptyMessage="Zip Code is required"
              />
              <br />
        {error &&
          <p style={{ color: "red" }}>
            {error}
          </p>}
        <br />
                 <Button
                 raised
                  disabled={!isEnabled}
                   fullWidth={true}
                  onClick={item => this.handleSubmit(item)}
                >
                  {isFetching && <CircularProgress size={25} />} OK
                </Button>


      </div>
        )
    }
}

function mapStateToProps(state) {

    const { event, account, participant } = state

    console.log("Event --> mapStateToProps --> event", event)
    console.log("Event --> mapStateToProps --> account", account)
    console.log("Event --> mapStateToProps --> participant", participant)

    return {
        event,
        account,
        participant
    }
}

export default connect(mapStateToProps)(Event)
