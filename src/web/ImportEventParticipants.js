import React, { Component } from "react"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"
import Button from "material-ui/Button"
import TextInput from "./components/TextInput"
import { CircularProgress } from "material-ui/Progress"
import { Card, CardHeader, CardText } from "material-ui/Card"
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import Tooltip from 'material-ui/Tooltip';
import Icon from 'material-ui/Icon'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import "./styles/app.css"
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'


class ImportEventParticipants extends Component {
    constructor(props) {
        super(props)
        this.state = { participants: '' };
        this.isEnabled = this.isEnabled.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.clearState = this.clearState.bind(this)
        this.validateEmail = this.validateEmail.bind(this)
        this.isEnabled = this.isEnabled.bind(this)
        this.participantCount = this.participantCount.bind(this)
        this.checkforDups = this.checkforDups.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ participants: '' })
    }

    participantCount() {

        if (!this.state.participants) return

        const originalForm = this.state.participants.trim()

        return originalForm ? this.state.participants.trim().split("\n").length : 0
    }

    isEnabled() {
        return this.participantCount() > 0
    }

    clearState() {
        this.setState({ participants: '' })
    }

    checkforDups() {

        const { participants } = this.state

        const origemail = this.props.
        eventparticipants.
        item.map((item) => item.account.email.trim())

        const copyParticipants = participants

        const markDups = copyParticipants.
        trim().
        split("\n").
        map((participant) => {
            const row = participant.split(',')
            return `\n${row.slice(0,3)}${(origemail.indexOf(row[0]) > -1) ? ',<---dup ignored' : ''}`
        })

        this.setState({ participants: markDups.join('').trim() })
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

        const { event } = this.props;

        const participant = {
            _eventId: event.item._id,
            _accountId: '',
            _teamdId: '',
            coords: event.item.coords,
            markers: []
        }

        const accounts = this.state.participants.trim().split("\n")

        this.props.dispatch({
            type: 'EVENT_PARTICIPANTS_BATCH_UPSERT_REQUESTED',
            payload: { accounts, participant }
        })
    }


    validateEmail(value) {
        return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? "Invalid email address"
            : undefined
    }

    render() {

        //  const { error, isFetching } = this.props.event
        const { error, isFetching } = this.props.eventparticipants

        let isEnabled = this.isEnabled()

        return (
            <div className="card">
                <div className="coords"> Copy/Paste a list of comma delimited -- email, firstname, lastname </div>
                <textarea name="participants"
                    onChange={this.handleChange}
                    onBlur={this.checkforDups}
                    placeholder=""
                    className="participants-list"
                value={this.state.participants} />
                <br />
                { this.participantCount()}

                {error &&
                    <p style={{ color: "red" }}>
                        {error}
                    </p>}
                <br />

                <Button  disabled={!isEnabled} onClick={item => this.handleSubmit(item)} variant="fab" mini color="primary" aria-label="add">
                    {isFetching && <CircularProgress size={25} />}  <div className='action-button'>SAVE</div>
                </Button>

                <Button style={{float: 'right'}} onClick={this.clearState}   variant="fab" mini color="secondary" aria-label="edit" >
                    <div className='action-button'>CLEAR</div>
                </Button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { event, eventparticipants } = state

    console.log("ImportEventParticipant --> mapStateToProps --> event ", event)

    return {
        eventparticipants,
        event
    }
}

export default connect(mapStateToProps)(ImportEventParticipants)