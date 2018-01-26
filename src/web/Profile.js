import React, { Component } from "react"
import { PropTypes } from "prop-types"
import { connect } from "react-redux"
import TextInput from "./components/TextInput"
import "./app.css"


import Button from "material-ui/Button"
import Paper from "material-ui/Paper"
import { Card, CardHeader, CardText } from "material-ui/Card"
import Checkbox from "material-ui/Checkbox"
import Select from "material-ui/Select"
import MenuItem from "material-ui/MenuItem"
import CircularProgress from "material-ui/Progress"

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = this.props.account.item

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.validateEmail = this.validateEmail.bind(this)
        this.isEnabled = this.isEnabled.bind(this)
    }


    componentDidMount() {
        this.setState({
            ...this.props.account.item
        });
    }

    handleSubmit(e) {
        e.preventDefault()

        const { dispatch } = this.props

        dispatch({ type: 'ACCOUNT_UPSERT_REQUESTED', payload: this.state })
    }

    handleSelectChange = (e, index, authorization) => {
        e.preventDefault()
        this.setState({
            authorization: authorization
        })
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
            <div className="container">

          <Card>
            <CardHeader>Profile</CardHeader>
            <CardText>

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
            name="authorization"
            floatingLabelText="Authorization"
            fullWidth={true}
            value={authorization}
            onChange={this.handleSelectChange}
          >
            <MenuItem
              value={"ROUTEMAKER"}
              primaryText="ROUTE MAKER"
            />
            <MenuItem
              value={"ROUTEMANAGER"}
              primaryText="ROUTE MANAGER"
            />
          </SelectField>

                  <br />
        {message &&
          <p style={{ color: "red" }}>
            {message}
          </p>}
        <br />
                 <Button
                 raised
                  label="OK"
                  disabled={!isEnabled}
                  fullWidth={true}
                  onClick={event => this.handleSubmit(event)}
              >
                  {isFetching && <CircularProgress size={18} />}
                </Button>
            </CardText>
          </Card>
        <br />


      </div>
        )
    }
}

function mapStateToProps(state) {
    const { account } = state

    return {
        account: account
    }
}

export default connect(mapStateToProps)(Profile)