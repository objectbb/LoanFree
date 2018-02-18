import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import * as api from "../api/restful"
import * as config from "../config/config";

function* stopIntervals(action) {

    console.log("index --> stopIntervals --> watchPositionId", action.watchPositionId)
    if (action.watchPositionId)
        navigator.geolocation.clearWatch(action.watchPositionId)

    console.log("index --> stopIntervals --> timerId ", action.timerId)
    if (action.timerId)
        navigator.geolocation.clearInterval(action.timerId)
}

function* startIntervals(action) {

    const SECOND = 1000

    console.log("index loadParticipants -->", action)


    const timerId = yield call(setInterval, () => {
        // dispatch(retrieveParticipants(payload))
        put({
            type: 'EVENT_PARTICIPANTS_FETCH_REQUESTED',
            payload: action.payload
        });
        put({
            type: 'PHOTO_FETCH_REQUESTED',
            payload: action.payload
        });
    }, 15 * SECOND)


    put({ type: 'UPDATE_INTERVAL_IDS', timerId: timerId, onOff: true })

}


function* intervalSaga() {
    yield takeEvery('STOP_INTERVALS', stopIntervals);
    yield takeEvery('START_INTERVALS', startIntervals);
}

export default intervalSaga;