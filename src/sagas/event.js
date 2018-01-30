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

        if (account.data.errors)
            yield put({ type: "EVENT_FETCH_FAILED", message: JSON.stringify(item.data.errors) });
        else if (!account.data)
            yield put({ type: "EVENT_FETCH_FAILED", message: "No data" });
        else if (account.data && account.data.length > 0)
            yield put({ type: "EVENT_FETCH_SUCCEEDED", payload: account.data[0] });

    } catch (e) {
        yield put({ type: "EVENT_FETCH_FAILED", message: e.message });
    }
}

function* fetchUpsert(action) {
    try {
        //const account = yield call(api.call, '/event_upsert', action.payload);

        const event = yield upsert(action)

        if (account.data.errors)
            yield put({ type: "EVENT_UPSERT_FAILED", message: JSON.stringify(event.data.errors) });
        else if (!account.data)
            yield put({ type: "EVENT_UPSERT_FAILED", message: "No data" });
        else if (account.data)
            yield put({ type: "EVENT_UPSERT_SUCCEEDED", payload: event.data });
    } catch (e) {
        yield put({ type: "EVENT_UPSERT_FAILED", message: e.message });
    }
}

function* eventSaga() {
    yield takeLatest("EVENT_FETCH_REQUESTED", fetchEvent);
    yield takeLatest("EVENT_UPSERT_REQUESTED", fetchUpsert);
}

export default eventSaga;
