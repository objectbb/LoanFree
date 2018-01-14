import React, { Component } from "react"
import { connect } from "react-redux"
import MapIt from './MapIt'

class TrackParticipants extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>
              <MapIt participants={this.props.participants} />
          </div>
        )
    }
}

function mapStateToProps(state) {
    const { participants } = state

    return {
        participants: participants.items
    }
}


export default connect(mapStateToProps)(TrackParticipants)