import React, { Component } from "react"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"
import Button from "material-ui/Button"
import "./app.css"
import TextInput from "./components/TextInput"
import { CircularProgress } from "material-ui/Progress"
import { Card, CardHeader, CardText } from "material-ui/Card"

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: null
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.isEnabled = this.isEnabled.bind(this)
        this.validateEmail = this.validateEmail.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        const username = this.state.username
        this.props.dispatch({ type: 'ACCOUNT_AUTHENTICATE_REQUESTED', payload: { 'email': username } })
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

    isEnabled() {
        const { username } = this.state
        return (
            username &&
            username.trim().length > 5
        )
    }

    validateEmail(value) {
        return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? "Invalid email address"
            : undefined
    }

    render() {
        const { error, isFetching } = this.props.account

        console.log("Login --> render ---> error", error)

        let isEnabled = this.isEnabled()

        return (
            <div>
                <TextInput
                  uniquename="username"
                  text="Email Address"
                  required={true}
                  minCharacters={6}
                  validate={this.validateEmail}
                  onChange={this.handleChange}
                  content={this.state.username}
                  errorMessage="Email is invalid"
                  emptyMessage="Email is required"
                />
                <Button
                  raised
                  disabled={!isEnabled}
                  fullWidth={true}
                  onClick={event => this.handleSubmit(event)}
                >
                  {isFetching && <CircularProgress  size={30} />} Login
                </Button>
                { error &&
                  <p style={{ color: "red" }}>
                    {(error === "No data") && "Email not found...Please register or contact your local administrator."}
                  </p> }
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

export default connect(mapStateToProps)(Login)