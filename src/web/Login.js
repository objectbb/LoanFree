import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"
import Button from "material-ui/Button"
import TextInput from "./components/TextInput"
import { CircularProgress } from "material-ui/Progress"
import { Card, CardHeader, CardText } from "material-ui/Card"
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'
import "./styles/app.css"
import * as actions from "../actions"

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

        this.props.actions.logoutUser()

        const username = this.state.username
        this.props.dispatch({
            type: 'ACCOUNT_AUTHENTICATE_REQUESTED',
            payload: { 'email': username }
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

    isEnabled() {
        const { username } = this.state
        return (
            username &&
            username.trim().length > 5 &&
            !this.validateEmail(username)
        )
    }

    validateEmail(value) {
        return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? "Invalid email address"
            : undefined
    }

    render() {
        const { error, isFetching } = this.props.account
        const { activity } = this.props

        let isEnabled = this.isEnabled()

        return (
            <div>
                <TextInput
                  uniquename="username"
                  text="Email Address"
                  required={true}
                  minCharacters={5}
                  validate={this.validateEmail}
                  onChange={this.handleChange}
                  content={this.state.username}
                  errorMessage="Email is invalid"
                  emptyMessage="Email is required"
                  minMessage="Minimum characters"
                />

                <Button
                  variant="raised"
                  disabled={(!isEnabled || isFetching) ? true : false}
                  fullWidth={true}
                  onClick={event => this.handleSubmit(event)}
                >
                  {isFetching && <CircularProgress  size={30} />} Login
                </Button>
                { error &&
                  <p style={{ color: "red" }}>
                    {(error === "No data") ? "Email not found...Please register or contact your local administrator." : error}
                  </p> }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { account, activity } = state

    return {
        account,
        activity
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        dispatch,
        actions: bindActionCreators(actions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)