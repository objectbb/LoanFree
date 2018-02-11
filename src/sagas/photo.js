import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from "../api/restful"

export const auth = (action) => {
    return call(api.call, '/photos_get', action.payload);
}

export const upsert = (action) => {
    return call(api.call, '/photo_upsert', action.payload);
}

function* fetchUpsert(action) {
    try {

        const item = yield upsert(action)

    } catch (e) {
        yield put({ type: "PHOTO_UPSERT_FAILED", message: e.message });
    }
}

function* fetch(action) {
    try {

        const item = yield auth(action)
        yield api.resultHandler(item, 'PHOTO_FETCH_')

    } catch (e) {
        yield put({ type: "PHOTO_FETCH_FAILED", message: e.message });
    }
}

function* photoSaga() {
    yield takeLatest("PHOTO_FETCH_REQUESTED", fetch);
    yield takeLatest("PHOTO_UPSERT_REQUESTED", fetchUpsert);
}

export default photoSaga;