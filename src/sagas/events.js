import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from "../api/restful"
import * as eventApi from "./event"

export const get = (action) => {
    return call(api.call, '/events_get', action.payload)
}

export const getByParticipant = (action) => {
    return call(api.call, '/events_participant_get', action.payload)
}

function* fetchEvents(action) {
    try {

        const events = yield get(action)
        yield api.resultHandler(events, 'EVENTS_FETCH_')

    } catch (e) {
        yield put({ type: "EVENTS_FETCH_FAILED", message: e.message });
    }
}

function* fetchEventsParticipant(action) {
    try {

        const result = yield getByParticipant(action)

        if (result.data.errors)
            yield put({ type: `EVENTS_FETCH_FAILED`, message: JSON.stringify(result.data.errors) });
        else if (!result.data)
            yield put({ type: `EVENTS_FETCH_FAILED`, message: "No data" });
        else if (result.data && result.data.length > 0)
            yield put({ type: `EVENTS_FETCH_SUCCEEDED`, payload: [].concat(result.data.map((item) => item.event)) });

    } catch (e) {
        yield put({ type: "EVENTS_FETCH_FAILED", message: e.message });
    }
}

function* eventsSaga() {
    yield takeLatest("EVENTS_FETCH_REQUESTED", fetchEvents);
    yield takeLatest("EVENTS_PARTICIPANT_FETCH_REQUESTED", fetchEventsParticipant);
}

export default eventsSaga;