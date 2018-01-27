import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from "../api/restful"

function* fetchUser(action) {
    try {
        const item = yield call(api.call, '/account_get', action.payload);

        if (item.data.errors)
            yield put({ type: "ACCOUNT_FETCH_FAILED", message: JSON.stringify(item.data.errors) });
        else if (!item.data)
            yield put({ type: "ACCOUNT_FETCH_FAILED", message: "No data" });
        else if (item.data && item.data.length > 0)
            yield put({ type: "ACCOUNT_FETCH_SUCCEEDED", payload: item.data[0] });

    } catch (e) {
        yield put({ type: "ACCOUNT_FETCH_FAILED", message: e.message });
    }
}

function* fetchUpsert(action) {
    try {
        const item = yield call(api.call, '/account_upsert', action.payload);

        if (item.data.errors)
            yield put({ type: "ACCOUNT_UPSERT_FAILED", message: JSON.stringify(item.data.errors) });
        else if (!item.data)
            yield put({ type: "ACCOUNT_UPSERT_FAILED", message: "No data" });
        else if (item.data)
            yield put({ type: "ACCOUNT_UPSERT_SUCCEEDED", payload: item.data });
    } catch (e) {
        yield put({ type: "ACCOUNT_UPSERT_FAILED", message: e.message });
    }
}

function* fetchAuthenticate(action) {
    try {
        const item = yield call(api.call, '/account_get', action.payload);

        if (item.data.length == 0)
            yield put({ type: "ACCOUNT_AUTHENTICATE_FAILED", message: "No data" });
        else
            yield put({ type: "ACCOUNT_AUTHENTICATE_SUCCEEDED", payload: item.data[0] });
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