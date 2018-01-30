import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from "../api/restful"
import * as event from "./event"

function* fetchEvents(action) {
    try {

        const events = yield event.get(action)

        if (events.data.errors)
            yield put({ type: "EVENTS_FETCH_FAILED", message: JSON.stringify(events.data.errors) });
        else if (!events.data)
            yield put({ type: "EVENTS_FETCH_FAILED", message: "No data" });
        else if (events.data && events.data.length > 0)
            yield put({ type: "EVENTS_FETCH_SUCCEEDED", payload: [].concat(events.data) });

    } catch (e) {
        yield put({ type: "EVENTS_FETCH_FAILED", message: e.message });
    }
}


function* eventsSaga() {
    yield takeLatest("EVENTS_FETCH_REQUESTED", fetchEvents);
}

export default eventsSaga;
