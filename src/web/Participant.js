import React, { Component } from "react"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"
import RaisedButton from "material-ui/RaisedButton"
import "./app.css"
import TextInput from "./components/TextInput"
import CircularProgress from "material-ui/CircularProgress"
import { Card, CardHeader, CardText } from "material-ui/Card"


class Participant extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newAccount: {
                email: '',
                firstname: '',
                lastname: '',
                authorization: 'PARTICIPANT'
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.isEnabled = this.isEnabled.bind(this)
        this.validateEmail = this.validateEmail.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()

        const participant = {
            _eventId: this.props.event.item._id,
            _accountId: '',
            _teamdId: '',
            coords: this.props.event.item.coords
        }

        console.log("Participant --> handleSubmit --> participant ", participant)

        this.props.dispatch({ type: 'PARTICIPANT_UPSERT_REQUESTED', payload: { ...this.state, participant } })
    }

    handleChange(e) {
        e.preventDefault()

        const target = e.target
        const value = target.type === "checkbox" ? target.checked : target.value
        const name = target.name

        this.setState(prevState => ({
            newAccount: { ...prevState.newAccount,
                [name]: value
            }
        }))

    }

    isEnabled() {
        const { email, firstname, lastname } = this.state.newAccount
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
        const { error, isFetching } = this.props.participant
        const { email, firstname, lastname } = this.state.newAccount
        const { name } = this.props.event.item

        let isEnabled = this.isEnabled()

        return (

            <Card>
            <CardHeader>Participant</CardHeader>
            <CardText>
               {name}
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
                <br />
                <RaisedButton
                  label="Add"
                  disabled={!isEnabled}
                  fullWidth={true}
                  onClick={event => this.handleSubmit(event)}
                >
                  {isFetching && <CircularProgress size={18} />}
                </RaisedButton>

                {error &&
                  <p style={{ color: "red" }}>
                    {error}
                  </p>}
            </CardText>
          </Card>
        )
    }
}

function mapStateToProps(state) {
    const { account, event, participant } = state

    return {
        account,
        event,
        participant
    }
}

export default connect(mapStateToProps)(Participant)