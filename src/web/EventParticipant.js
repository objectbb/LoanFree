import React, { Component } from "react"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"
import Button from "material-ui/Button"
import TextInput from "./components/TextInput"
import { CircularProgress } from "material-ui/Progress"
import { Card, CardHeader, CardText } from "material-ui/Card"
import Icon from 'material-ui/Icon'

import AddIcon from 'material-ui-icons/Add'
import DeleteIcon from 'material-ui-icons/Delete'
import Tooltip from 'material-ui/Tooltip'
import "./styles/animate.css"
import "./styles/app.css"

class EventParticipant extends Component {
    constructor(props) {
        super(props)

        this.state = { ...this.props.eventparticipant.item.account }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.isEnabled = this.isEnabled.bind(this)
        this.validateEmail = this.validateEmail.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps.eventparticipant.item.account
        });
    }

    handleSubmit(e) {
        e.preventDefault()

        console.log("EventParticipant --> handleSubmit --> state", this.state)

        const account = { ...this.state, authorization: 'PARTICIPANT' }

        const newEP = { ...this.props.eventparticipant }
        newEP.item.account = { ...account }

        this.props.dispatch({
            type: 'EVENT_PARTICIPANTS_UPSERT',
            payload: { ...newEP }
        })

        this.props.dispatch({
            type: 'EVENT_PARTICIPANT_ACCOUNT_UPSERT_REQUESTED',
            payload: account
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
        const { email, firstname, lastname } = this.state

        return (
            email &&
            email.trim().length > 5 &&
            firstname &&
            firstname.trim().length > 1 &&
            lastname &&
            lastname.trim().length > 1
        )
    }

    validateEmail(value) {
        return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? "Invalid email address"
            : undefined
    }

    render() {

        if (!this.props.eventparticipant.item.account) return (<div></div>);

        const { error, isFetching } = this.props.eventparticipant
        const { email, firstname, lastname } = this.state

        let isEnabled = this.isEnabled()

        return (
            <div className="card infinite fadeIn fadeIn-selection">
                <br />
                <TextInput
                  uniquename="email"
                  text="Email"
                  required={true}
                  minCharacters={6}
                  validate={this.validateEmail}
                  onChange={this.handleChange}
                  content={email}
                  errorMessage="Email is invalid"
                  emptyMessage="Email is required"
                />
                <br />
                <TextInput
                  uniquename="firstname"
                  text="First Name"
                  required={true}
                  minCharacters={2}
                  onChange={this.handleChange}
                  content={firstname}
                  errorMessage="First Name is invalid"
                  emptyMessage="First Name is required"
                />
                 <br />

                <TextInput
                  uniquename="lastname"
                  text="Last Name"
                  required={true}
                  minCharacters={2}
                  onChange={this.handleChange}
                  content={lastname}
                  errorMessage="Last Name is invalid"
                  emptyMessage="Last Name is required"
                />
                {error &&
                  <p style={{ color: "red" }}>
                    {error}
                  </p>}
                  <Tooltip id="tooltip-icon" title="Save">
                    <Button mini disabled={!isEnabled} onClick={item => this.handleSubmit(item)} variant="fab" color="primary">
                        {isFetching && <CircularProgress size={25} />}  <Icon>edit</Icon>
                      </Button>
                  </Tooltip>
                  </div>
        )
    }
}

function mapStateToProps(state) {
    const { eventparticipant } = state

    return {
        eventparticipant
    }
}

export default connect(mapStateToProps)(EventParticipant)