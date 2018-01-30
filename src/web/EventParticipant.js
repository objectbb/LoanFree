import React, { Component } from "react"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"
import Button from "material-ui/Button"
import TextInput from "./components/TextInput"
import { CircularProgress } from "material-ui/Progress"
import { Card, CardHeader, CardText } from "material-ui/Card"
import "./styles/app.css"

class EventParticipant extends Component {
    constructor(props) {
        super(props)

        this.state = {...props.eventparticipant};

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.isEnabled = this.isEnabled.bind(this)
        this.validateEmail = this.validateEmail.bind(this)
    }

    componentWillReceiveProps() {
        const { eventparticipant } = this.props;
        console.log("eventparticipant --> componentWillReceiveProps --> eventparticipant", eventparticipant)
        console.log("eventparticipant --> componentWillReceiveProps --> props", this.props)

        this.setState({
            ...eventparticipant
        });
    }

    handleSubmit(e) {
        e.preventDefault()

        console.log("EventParticipant --> handleSubmit --> state ", this.state)

/*
        const participant = {
            _eventId: this.props.event.item._id,
            _accountId: '',
            _teamdId: '',
            coords: this.props.event.item.coords
        }
*/
        console.log("EventParticipant --> handleSubmit --> eventparticipant ", participant)

        this.props.dispatch({ type: 'EVENT_PARTICIPANT_UPSERT_REQUESTED', payload: { ...this.state, participant } })
    }

    handleChange(e) {
        e.preventDefault()

        const target = e.target
        const value = target.type === "checkbox" ? target.checked : target.value
        const name = target.name

        this.setState(prevState => ({
            account: { ...prevState.account,
                [name]: value
            }
        }))

    }

    isEnabled() {
        const { email, firstname, lastname } = this.props.eventparticipant.item.account
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
      console.log("EventParticipant --> render --> this.props.eventparticipant.item ",
        this.props.eventparticipant,
        this.props.eventparticipant.item.account.email,
        this.props.eventparticipant.item.event
        )

        const { error, isFetching } = this.props.eventparticipant
        const { email, firstname, lastname } = this.props.eventparticipant.item.account
        const { name } = this.props.eventparticipant.item.event

        let isEnabled = this.isEnabled()

        return (
            <div className="card">
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
                <Button
                  raised
                  disabled={!isEnabled}
                  fullWidth={true}
                  onClick={event => this.handleSubmit(event)}
                >
                  {isFetching && <CircularProgress size={25} />} Add
                </Button>

                {error &&
                  <p style={{ color: "red" }}>
                    {error}
                  </p>}

                  </div>
        )
    }
}

function mapStateToProps(state) {
    const {eventparticipant } = state

     console.log("EventParticipant --> mapStateToProps --> eventparticipant ", eventparticipant)

    return {
        eventparticipant
    }
}

export default connect(mapStateToProps)(EventParticipant)
