import { call, put, takeLatest } from 'redux-saga/effects'
import axios from "axios";

function* getParticipant(action) {
/*
    this.socket = io('https://pdxlivebus.now.sh/', {
      transports: ['websocket']
    });
    this.socket.on('participant_update', (data) => this.props.actions.updateVehicles(data));
*/
    var socket = io('pacific-meadow-71522.herokuapp.com',{transports: ['websocket', 'polling']}); // TIP: io() with no args does auto-discovery

    this.socket.on('participant_update', (data) => put ( {type: 'RETRIEVE_PARTICIPANTS', data, receivedAt: Date.now()}) );


}

function *requestParticipant() {
  yield takeLatest('REQUEST_PARTICIPANT', getParticipant);
}

export default requestParticipant;
