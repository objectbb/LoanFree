import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from "../api/restful"
import * as eventApi from "./event"

export const get = (action) => {
    return call(api.call, '/events_get', action.payload)
}

function* fetchEvents(action) {
    try {

        const events = yield get(action)
        yield api.resultHandler(events, 'EVENTS_FETCH_')

    } catch (e) {
        yield put({ type: "EVENTS_FETCH_FAILED", message: e.message });
    }
}

function* eventsSaga() {
    yield takeLatest("EVENTS_FETCH_REQUESTED", fetchEvents);
}

export default eventsSaga;