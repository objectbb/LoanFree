import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from "../api/restful"
import * as account from "./account"
import * as participant from "./participant"

function* fetchParticipant(action) {
    try {
        const item = yield participant.get(action)

        console.log("fetchParticipant --> ", item)

        if (item.data.errors)
            yield put({ type: "EVENT_PARTICIPANTS_FETCH_FAILED", payload: item.data.errors });
        else if (!item.data)
            yield put({ type: "EVENT_PARTICIPANTS_FETCH_FAILED", message: "No data" });
        else if (item.data && item.data.length > 0)
            yield put({ type: "EVENT_PARTICIPANTS_FETCH_SUCCEEDED", payload: [].concat(item.data) });

    } catch (e) {
        yield put({ type: "EVENT_PARTICIPANTS_FETCH_FAILED", message: e.message });
    }
}


function* fetchUpsert(action) {
    //  try {

    const { newAccount, participant } = action.payload

    account.upsert(newAccount)

    /*

        let item = yield call(api.call, '/account_upsert', newAccount);

        if (item.data.errors) {
            yield put({ type: "EVENT_PARTICIPANTS_FETCH_FAILED", message: JSON.stringify(item.data.errors) });
            return;
        } else if (!item.data) {
            yield put({ type: "EVENT_PARTICIPANTS_FETCH_FAILED", message: "No data" });
            return;
        }
*/

    var account = item.data;
    console.log("EventPart -->fetchUpsert-->account", account)

    participant._accountId = account._id;

    console.log("EventPart -->fetchUpsert-->participant", participant);

    /*
            item = yield call(api.call, '/participant_upsert', participant);

            if (item.data.errors)
                yield put({ type: "EVENT_PARTICIPANTS_UPSERT_FAILED", message: JSON.stringify(item.data.errors) });
            else if (!item.data)
                yield put({ type: "EVENT_PARTICIPANTS_UPSERT_FAILED", message: "No data" });
            else if (item.data)
                yield put({ type: "EVENT_PARTICIPANTS_UPSERT_SUCCEEDED", payload: participant });

        } catch (e) {
            yield put({ type: "EVENT_PARTICIPANTS_UPSERT_FAILED", message: e.message });
        }
        */
}


function* eventParticipantsSaga() {
    yield takeLatest("EVENT_PARTICIPANTS_FETCH_REQUESTED", fetchParticipant);
    yield takeLatest("EVENT_PARTICIPANTS_UPSERT_REQUESTED", fetchUpsert);
}

export default eventParticipantsSaga;
