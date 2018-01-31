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
        yield api.resultHandler(item, 'PARTICIPANT_FETCH_')

    } catch (e) {
        yield put({ type: "PARTICIPANT_FETCH_FAILED", message: e.message });
    }
}

function* fetchUpsert(action) {

    try {

        const item = yield upsert(action)
        yield api.resultHandler(item, 'PARTICIPANT_UPSERT_')

    } catch (e) {
        yield put({ type: "PARTICIPANT_UPSERT_FAILED", message: e.message });
    }
}


function* participantSaga() {
    yield takeLatest("PARTICIPANT_FETCH_REQUESTED", fetchParticipant);
    yield takeLatest("PARTICIPANT_UPSERT_REQUESTED", fetchUpsert);
}

export default participantSaga;