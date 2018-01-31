import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from "../api/restful"
import * as accountApi from "./account"
import * as participantApi from "./participant"
import * as eventApi from "./event"

function* fetchParticipant(action) {
    try {
        const item = yield participantApi.get(action)
        yield api.resultHandler(item, 'EVENT_PARTICIPANTS_FETCH_')

    } catch (e) {
        yield put({ type: "EVENT_PARTICIPANTS_FETCH_FAILED", message: e.message });
    }
}


function* fetchAccountUpsert(action) {
    //  try {

    console.log("eventparticipants --> fetchUpstart --> action ", action.payload)

    const { account, participant } = action.payload
    /*
    account.upsert(newAccount)

    var account = item.data;
    console.log("EventPart -->fetchUpsert-->account", account)

    participant._accountId = account._id;

    console.log("EventPart -->fetchUpsert-->participant", participant);

        */
}

function* fetchParticipantUpsert(action) {

    const { event, newParticipant } = action.payload

    console.log("eventparticipants --> fetchParticipantUpsert --> event ", event)
    console.log("eventparticipants --> fetchParticipantUpsert --> newParticipant ", newParticipant)

    const evt = yield eventApi.upsert({ payload: event })
    yield api.resultHandler(evt, 'EVENT_UPSERT_')

    console.log("eventparticipants --> fetchParticipantUpsert --> evt ", evt.data)

    newParticipant._eventId = evt.data._id;

    const prt = yield participantApi.upsert({ payload: { ...newParticipant } })
    yield api.resultHandler(prt, 'PARTICIPANT_UPSERT_')

    console.log("eventparticipants --> fetchParticipantUpsert --> prt ", prt)


}

function* eventParticipantsSaga() {
    yield takeLatest("EVENT_PARTICIPANTS_FETCH_REQUESTED", fetchParticipant);
    yield takeLatest("EVENT_PARTICIPANT_UPSERT_REQUESTED", fetchParticipantUpsert);
}

export default eventParticipantsSaga;