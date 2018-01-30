import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from "../api/restful"

export const get = (action) => {
    return call(api.call, '/participant_get', action.payload)
}

export const upsert = (action) => {
    return call(api.call, '/participant_upsert', action.payload);
}

function* fetchParticipant(action) {
    try {
        const item = yield get(action)

        if (item.data.errors)
            yield put({ type: "PARTICIPANT_FETCH_FAILED", message: JSON.stringify(item.data.errors) });
        else if (!item.data)
            yield put({ type: "PARTICIPANT_FETCH_FAILED", message: "No data" });
        else if (item.data && item.data.length > 0)
            yield put({ type: "PARTICIPANT_FETCH_SUCCEEDED", payload: item.data[0] });

    } catch (e) {
        yield put({ type: "PARTICIPANT_FETCH_FAILED", message: e.message });
    }
}

function* fetchUpsert(action) {

    try {

        item = yield upsert(action)

        if (item.data.errors)
            yield put({ type: "PARTICIPANT_UPSERT_FAILED", message: JSON.stringify(item.data.errors) });
        else if (!item.data)
            yield put({ type: "PARTICIPANT_UPSERT_FAILED", message: "No data" });
        else if (item.data)
            yield put({ type: "PARTICIPANT_UPSERT_SUCCEEDED", payload: participant });

    } catch (e) {
        yield put({ type: "PARTICIPANT_UPSERT_FAILED", message: e.message });
    }
}


function* participantSaga() {
    yield takeLatest("PARTICIPANT_FETCH_REQUESTED", fetchParticipant);
    yield takeLatest("PARTICIPANT_UPSERT_REQUESTED", fetchUpsert);
}

export default participantSaga;
