import { call, put, takeLatest, takeEvery, all, take } from 'redux-saga/effects'
import * as api from "../api/restful"
import * as accountApi from "./account"
import * as participantApi from "./participant"
import * as eventApi from "./event"

export const get = (action) => {
    return call(api.call, '/eventparticipants_get', action.payload)
}

export const upsert = (action) => {
    return call(api.call, '/eventparticipants_upsert', action.payload);
}

export const upsertAccount = (action) => {
    return call(api.call, '/account_upsert', action.payload);
}

function* fetchParticipant(action) {
    try {
        const item = yield get(action)
        yield api.resultHandler(item, 'EVENT_PARTICIPANTS_FETCH_')

    } catch (e) {
        yield put({ type: "EVENT_PARTICIPANTS_FETCH_FAILED", message: e.message });
    }
}

function* fetchAccountUpsert(action) {
    let item;
    try {
        console.log("eventparticipants --> fetchAccountUpsert ", action.payload)
        item = yield accountApi.upsert(action)
    } catch (e) {
        yield put({ type: "APP_ERROR", message: e.message });
    }

    return yield item
}


function* fetchBatchUpsert(action) {
    try {

        console.log("sagas --> eventparticipants --> fetchBatchUpsert --> action ", action.payload)

        const { accounts, participant } = action.payload

        for (var item in accounts) {
            const acctArray = accounts[item].split(',');

            if (acctArray.length < 3) {
                return;
            }

            const act = call(upsertAccount, {
                payload: {
                    email: acctArray[0].trim(),
                    firstname: acctArray[1].trim(),
                    lastname: acctArray[2].trim()
                }
            })

            console.log("sagas --> eventparticipants --> fetchBatchUpsert --> account ", act)

            //participant._accountId = act._id

            //console.log("sagas --> eventparticipants --> fetchBatchUpsert --> participant ", participant)

            const prt = call(upsert, { payload: { ...participant, _accountId: act._id } })

            console.log("sagas --> eventparticipants --> prt", prt)

        }
        // }).bind(this)

        //call fetchParticipant({ payload: { _eventId: participant._eventId } })

    } catch (e) {
        yield put({ type: "EVENT_PARTICIPANTS_BATCH_UPSERT_FAILED", message: e.message });
    }
}

function* fetchParticipantUpsert(action) {

    const { event, newParticipant } = action.payload

    console.log("eventparticipants --> fetchParticipantUpsert --> event ", event)
    console.log("eventparticipants --> fetchParticipantUpsert --> newParticipant ", newParticipant)

    const evt = yield eventApi.upsert({ payload: event })
    yield api.resultHandler(evt, 'EVENT_UPSERT_')

    console.log("eventparticipants --> fetchParticipantUpsert --> evt ", evt.data)

    yield put({ type: "EVENTS_UPSERT", payload: evt.data });

    newParticipant._eventId = evt.data._id;

    const prt = yield participantApi.upsert({ payload: { ...newParticipant } })
    yield api.resultHandler(prt, 'PARTICIPANT_UPSERT_')

    console.log("eventparticipants --> fetchParticipantUpsert --> prt ", prt)


}

function* eventParticipantsSaga() {
    yield takeLatest("EVENT_PARTICIPANTS_FETCH_REQUESTED", fetchParticipant);
    yield takeLatest("EVENT_PARTICIPANT_UPSERT_REQUESTED", fetchParticipantUpsert);
    yield takeLatest("EVENT_PARTICIPANT_ACCOUNT_UPSERT_REQUESTED", fetchAccountUpsert);
    yield takeEvery("EVENT_PARTICIPANTS_BATCH_UPSERT_REQUESTED", fetchBatchUpsert);
}

export default eventParticipantsSaga;