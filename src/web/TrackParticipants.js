import React, { Component } from "react"
import { connect } from "react-redux"
import MapIt from './MapIt'

class TrackParticipants extends Component {

    constructor(props) {
        super(props);
        this.state = {
            participants: []
        };
    }

    render() {

        return (
            <div>
              <MapIt participants={this.state.participants} />
          </div>
        )
    }
}

function mapStateToProps(state) {
    const { participants } = state

    return {
        participants
    }
}


export default connect(mapStateToProps)(TrackParticipants)