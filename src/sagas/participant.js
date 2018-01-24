import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from "../api/restful"

function* fetchParticipant(action) {
    try {
        const item = yield call(api.call, '/participant_get', action.payload);

        if (item.data.errors)
            yield put({ type: "PARTICIPANT_FETCH_FAILED", payload: item.data.errors });
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


        const item = yield call(api.call, '/account_upsert', action.payload);

        if (item.data.errors)
            yield put({ type: "PARTICIPANT_FETCH_FAILED", payload: item.data.errors });
        else if (!item.data)
            yield put({ type: "PARTICIPANT_FETCH_FAILED", message: "No data" });

        var account = item.data;


        //const item = yield call(api.call, '/participant_upsert', action.payload);

        if (item.data.errors)
            yield put({ type: "PARTICIPANT_UPSERT_FAILED", payload: item.data.errors });
        else if (!item.data)
            yield put({ type: "PARTICIPANT_UPSERT_FAILED", message: "No data" });
        else if (item.data)
            yield put({ type: "PARTICIPANT_UPSERT_SUCCEEDED", payload: item.data });
    } catch (e) {
        yield put({ type: "PARTICIPANT_UPSERT_FAILED", message: e.message });
    }
}

function* participantSaga() {
    yield takeLatest("PARTICIPANT_FETCH_REQUESTED", fetchParticipant);
    yield takeLatest("PARTICIPANT_UPSERT_REQUESTED", fetchUpsert);
}

export default participantSaga;