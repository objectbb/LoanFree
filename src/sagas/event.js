import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from "../api/restful"

export const get = (action) => {
    return call(api.call, '/event_get', action.payload)
}

export const upsert = (action) => {
    return call(api.call, '/event_upsert', action.payload)
}

function* fetchEvent(action) {
    try {
        const event = yield get(action)
        yield api.resultHandler(event, 'EVENT_FETCH_')

    } catch (e) {
        yield put({ type: "EVENT_FETCH_FAILED", message: e.message });
    }
}

function* fetchUpsert(action) {

    let event
    try {

        event = yield upsert(action)
        yield api.resultHandler(event, 'EVENT_UPSERT_')

    } catch (e) {
        yield put({ type: "EVENT_UPSERT_FAILED", message: e.message });
    }

    return event;
}

function* eventSaga() {
    yield takeLatest("EVENT_FETCH_REQUESTED", fetchEvent);
    yield takeLatest("EVENT_UPSERT_REQUESTED", fetchUpsert);
}

export default eventSaga;