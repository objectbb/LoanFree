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

        const acctBatch = accounts.map((item) => {
            values = item.split(',')
            return { email: values[0], firstname: values[1], lastname: values[2], authorization: 'PARTICIPANT' }
        })

        const prt = yield upsert({ payload: { participant, accounts: acctBatch } })

        yield put({ type: "EVENT_PARTICIPANTS_FETCH_REQUESTED", payload: { _eventId: participant._eventId } });

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