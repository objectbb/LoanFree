import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from "../api/restful"
import * as accountApi from "./account"

function* fetchUser(action) {
    try {

        const item = yield accountApi.get(action)
        yield api.resultHandler(item, 'PROFILE_FETCH_')

        /*
        if (item.data.errors)
            yield put({ type: "PROFILE_FETCH_FAILED", payload: item.data.errors });
        else if (!item.data)
            yield put({ type: "PROFILE_FETCH_FAILED", message: "No data" });
        else if (item.data && item.data.length > 0)
            yield put({ type: "PROFILE_FETCH_SUCCEEDED", payload: item.data[0] });
        */

    } catch (e) {
        yield put({ type: "PROFILE_FETCH_FAILED", message: e.message });
    }
}

function* fetchUpsert(action) {
    try {

        const item = yield accountApi.upsert(action)
        yield api.resultHandler(item, 'PROFILE_UPSERT_')
        /*
                if (item.data.errors)
                    yield put({ type: "PROFILE_UPSERT_FAILED", message: JSON.stringify(item.data.errors) });
                else if (!item.data)
                    yield put({ type: "PROFILE_UPSERT_FAILED", message: "No data" });
                else if (item.data)
                    yield put({ type: "PROFILE_UPSERT_SUCCEEDED", payload: item.data });
                */
    } catch (e) {
        yield put({ type: "PROFILE_UPSERT_FAILED", message: e.message });
    }
}



function* profileSaga() {
    yield takeLatest("PROFILE_FETCH_REQUESTED", fetchUser);
    yield takeLatest("PROFILE_UPSERT_REQUESTED", fetchUpsert);
}

export default profileSaga;