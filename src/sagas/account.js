import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from "../api/restful"

export const auth = (action) => {
    return call(api.call, '/authenticate', action.payload);
}

export const upsert = (action) => {
    return call(api.call, '/account_upsert', action.payload);
}

function* fetchUser(action) {
    try {

        const item = yield auth(action)
        yield api.resultHandler(item, 'ACCOUNT_FETCH_')

    } catch (e) {
        yield put({ type: "ACCOUNT_FETCH_FAILED", message: e.message });
    }
}

function* fetchUpsert(action) {
    try {

        const item = yield upsert(action)

        console.log("Account --> fetchUpsert --> item ", item)
        const result = item.data

        if (!result.errmsg)
            yield api.resultHandler(item, 'ACCOUNT_UPSERT_')
        else {
            yield put({ type: 'ACCOUNT_UPSERT_FAILED', message: (result.code === 11000) ? 'Email already in use' : result.errmsg })
            yield put({ type: "APP_ERROR", message: result.errmsg })
        }

    } catch (e) {
        yield put({ type: "ACCOUNT_UPSERT_FAILED", message: e.message });
    }
}

function* fetchAuthenticate(action) {
    try {

        const item = yield auth(action)
        yield api.resultHandler(item, 'ACCOUNT_AUTHENTICATE_')

    } catch (e) {
        yield put({ type: "ACCOUNT_AUTHENTICATE_FAILED", message: e.message });
    }
}

function* accountSaga() {
    yield takeLatest("ACCOUNT_FETCH_REQUESTED", fetchUser);
    yield takeLatest("ACCOUNT_UPSERT_REQUESTED", fetchUpsert);
    yield takeLatest("ACCOUNT_AUTHENTICATE_REQUESTED", fetchAuthenticate);
}

export default accountSaga;