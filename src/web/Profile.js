import React, { Component } from "react"
import { PropTypes } from "prop-types"
import { connect } from "react-redux"
import TextInput from "./components/TextInput"
import "./styles/app.css"

import Button from "material-ui/Button"
import Paper from "material-ui/Paper"
import { Card, CardHeader, CardText } from "material-ui/Card"
import Checkbox from "material-ui/Checkbox"
import Select from "material-ui/Select"
import MenuItem from "material-ui/Menu"
import CircularProgress from "material-ui/Progress"
import Icon from 'material-ui/Icon'

import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import Tooltip from 'material-ui/Tooltip';

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = { ...props.account.item }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.validateEmail = this.validateEmail.bind(this)
        this.isEnabled = this.isEnabled.bind(this)
    }


    componentWillReceiveProps() {

        this.setState({
            ...this.props.account.item
        });

    }

    handleSubmit(e) {
        e.preventDefault()

        const { dispatch } = this.props

        dispatch({ type: 'PROFILE_UPSERT_REQUESTED', payload: this.state })
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

    isEnabled() {

        const {
            firstname,
            lastname,
            email,
            authorization
        } = this.state

        return (
            authorization &&
            email &&
            email.trim().length > 5 &&
            (firstname && firstname.trim().length > 1) &&
            (lastname && lastname.trim().length > 1)
        )
    }

    render() {

        const { message, isFetching } = this.props

        const {
            firstname,
            lastname,
            email,
            authorization
        } = this.state

        let isEnabled = this.isEnabled()

        return (
            <div className="card">

              <TextInput
                uniquename="email"
                text="Email"
                minCharacters={6}
                onChange={this.handleChange}
                content={email}
                validate={this.validateEmail}
                required={true}
                errorMessage="Email is invalid"
                emptyMessage="Email is required"
              />
              <br />


              <TextInput
                uniquename="firstname"
                text="First Name"
                minCharacters={2}
                required={true}
                onChange={this.handleChange}
                content={firstname}
                errorMessage="First is invalid"
                emptyMessage="First is required"
              />

              <br />

              <TextInput
                uniquename="lastname"
                text="Last Name"
                minCharacters={2}
                required={true}
                onChange={this.handleChange}
                content={lastname}
                errorMessage="Last Name is invalid"
                emptyMessage="Last Name is required"
              />
              <br />

          <Select
          native
            name="authorization"
            value={authorization}
             fullWidth={true}
            onChange={this.handleChange}
          >
            <option value="ROUTEMAKER">ROUTE MAKER</option>
            <option value="ROUTEMANAGER">ROUTE MANAGER</option>
          </Select>

                  <br />
        {message &&
          <p style={{ color: "red" }}>
            {message}
          </p>}
        <br />

<Tooltip id="tooltip-icon" title="Save">
    <Button  disabled={!isEnabled} onClick={item => this.handleSubmit(item)} fab color="primary" aria-label="add">
         {isFetching && <CircularProgress size={25} />}  <Icon>save</Icon>
      </Button>
    </Tooltip>

<Tooltip id="tooltip-icon" title="Clear">
      <Button onClick={item => this.clearState}  fab color="secondary" aria-label="edit" >
        <Icon>clear</Icon>
      </Button>
</Tooltip>



      </div>
        )
    }
}

function mapStateToProps(state) {
    const { account } = state

    return {
        account
    }
}

export default connect(mapStateToProps)(Profile)