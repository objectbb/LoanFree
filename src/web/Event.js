import React, { Component } from "react"
import { PropTypes } from "prop-types"
import { connect } from "react-redux"
import moment from 'moment'
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
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon'

import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import Tooltip from 'material-ui/Tooltip';

const initialState = {
    _id: '',
    _accountId: '',
    name: '',
    displayname: '',
    description: '',
    markers: [],
    teams: [],
    coords: [],
    address: '',
    startdate: '',
    city: '',
    state: '',
    zipcode: ''
}

class Event extends Component {
    constructor(props) {
        super(props)

        this.state = props.event.item._id ? props.event.item : {
            name: '',
            displayname: '',
            description: '',
            markers: [],
            teams: [],
            coords: [],
            address: '',
            startdate: '',
            city: '',
            state: '',
            zipcode: '',
            _accountId: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleGeocode = this.handleGeocode.bind(this)
        this.clearState = this.clearState.bind(this)
        this.newState = this.newState.bind(this)
        this.isEnabled = this.isEnabled.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const { event } = nextProps;
        this.setState({ ...event.item, _id: event.item._id })
    }

    handleSubmit(e) {
        e.preventDefault()
        const { coords } = this.props.event.item

        const { dispatch, account, participant } = this.props;

        const newParticipant = {
            _id: participant.item._id,
            _eventId: '',
            _accountId: account.item._id,
            _teamdId: '',
            coords: coords
        }

        if (!this.state._id)
            dispatch({ type: 'EVENT_PARTICIPANTS_CLEAR' })

        dispatch({
            type: 'EVENT_PARTICIPANT_EVENT_UPSERT_REQUESTED',
            payload: {
                newParticipant,
                event: { ...this.state, coords, _accountId: account.item._id }
            }
        });

        dispatch({ type: 'SET_CURRENT_REGION', coords: [coords[0], coords[1]] })

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

        if (!(address && city)) return

        const { dispatch } = this.props;

        this.props.dispatch({
            type: 'REQUEST_GEOCODE',
            payload: { ...this.state }
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
            zipcode,
            coords
        } = this.state

        return (
            (description && description.trim().length > 9) &&
            startdate &&
            (coords.length == 2) &&
            (name && name.trim().length > 5) &&
            (displayname && displayname.trim().length > 1) &&
            (address && address.trim().length > 5) &&
            (city && city.trim().length > 1) &&
            (state && state.trim().length > 1) &&
            (zipcode && zipcode.trim().length > 4)
        )
    }

    clearState() {

        this.setState((prevState) => ({
            id: '',
            _accountId: '',
            name: '',
            displayname: '',
            description: '',
            markers: [],
            teams: [],
            address: '',
            startdate: '',
            city: '',
            state: '',
            zipcode: ''
        }))

    }

    newState() {
        this.setState(initialState)
    }

    render() {

        const { error, isFetching } = this.props.event

        const {
            _id,
            name,
            displayname,
            startdate,
            description,
            address,
            city,
            state,
            zipcode,
            coords
        } = this.state

        let isEnabled = this.isEnabled()

        const items = [];

        const states = [' ', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT',
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
                    value={moment(startdate,"yyyy-MM-DDThh:mmZ").format("YYYY-MM-DDTkk:mm")}
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
              {<div className="coords">{coords}</div>}
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
              {error &&
                  <p style={{ color: "red" }}>
                    {error}
                  </p>}
                <Tooltip id="tooltip-icon" title="Save">
                    <Button  disabled={!isEnabled} onClick={this.handleSubmit} fab color="primary" aria-label="save">
                    {isFetching && <CircularProgress size={25} />}  <Icon>save</Icon>
                    </Button>
                </Tooltip>

                <Tooltip id="tooltip-icon" title="Clear" style={{float:'right'}}>
                    <Button onClick={this.clearState}  fab color="secondary" aria-label="edit" >
                    <Icon>clear</Icon>
                    </Button>
                </Tooltip>

      </div>
        )
    }
}

function mapStateToProps(state) {

    const { event, account, participant } = state

    return {
        event,
        account,
        participant
    }
}

export default connect(mapStateToProps)(Event)