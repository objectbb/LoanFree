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
        yield put({ type: "EVENT_PARTICIPANTS_FETCH_FAILED", message: e.message })
        yield put({ type: "APP_ERROR", message: e.message })
    }
}

function* fetchAccountUpsert(action) {
    let item;
    try {
        item = yield accountApi.upsert(action)

        console.log("eventparticipants --> fetchAccountUpsert ---> item", item)

        if (!item.data.errmsg)
            yield put({ type: "EVENT_PARTICIPANT_UPSERT_SUCCEEDED", payload: item })
        else {
            yield put({ type: 'EVENT_PARTICIPANT_UPSERT_FAILED', message: item.data.errmsg })
            yield put({ type: "APP_ERROR", message: item.data.errmsg })
        }


    } catch (e) {
        yield put({ type: 'EVENT_PARTICIPANT_UPSERT_FAILED', message: e.message })
        yield put({ type: "APP_ERROR", message: e.message });
    }

    return yield item
}

function* fetchUpsert(action) {
    try {
        console.log("eventparticipants --> fetchUpsert ", action.payload)
        item = yield participantApi.upsert(action)

    } catch (e) {
        yield put({ type: 'EVENT_PARTICIPANT_UPSERT_FAILED', message: e.message })
        yield put({ type: "APP_ERROR", message: e.message });
    }
}

function* fetchBatchUpsert(action) {
    try {

        const { accounts, participant } = action.payload

        const acctBatch = accounts.filter((item) => {
            values = item.split(',')
            return values.length === 3
        }).
        filter((item) => {
            values = item.split(',')
            return (values[0] && values[0].length > 4 && values[1] && values[1].length > 1 && values[2] && values[2].length > 1)
        }).
        map((item) => {
            values = item.split(',')
            return { email: values[0].toLowerCase(), firstname: values[1], lastname: values[2], authorization: 'PARTICIPANT' }
        })

        let result = {}
        if (acctBatch && acctBatch.length > 0) {
            const prt = yield upsert({ payload: { participant, accounts: acctBatch } })
            const result = prt.data
        } else {
            result.errmsg = "Nothing was imported. Please follow instructions when importing - email, firstname, lastname"
            result.code = -1
        }

        console.log("Eventparticipants --> fetchBatchUpsert --> result ", result)

        if (!(result.writeErrors || result.errmsg || result.errors))
            yield put({ type: "EVENT_PARTICIPANTS_FETCH_REQUESTED", payload: { _eventId: participant._eventId } });
        else if (result.errmsg) {
            yield put({ type: "EVENT_PARTICIPANTS_BATCH_UPSERT_FAILED", message: (result.code === 11000) ? `Email already in use ${result.op}` : result.errmsg })
            yield put({ type: "APP_ERROR", message: `${result.errmsg} ${result.op}` })
        } else if (result.errors) {
            yield put({ type: "EVENT_PARTICIPANTS_BATCH_UPSERT_FAILED", message: JSON.stringify(result.errors) })
            yield put({ type: "APP_ERROR", message: JSON.stringify(result.errors) })
        } else if (result.writeErrors) {
            yield put({ type: "EVENT_PARTICIPANTS_BATCH_UPSERT_FAILED", message: JSON.stringify(result.writeErrors) })
            yield put({ type: "APP_ERROR", message: JSON.stringify(result.writeErrors) })
        }

    } catch (e) {
        yield put({ type: "EVENT_PARTICIPANTS_BATCH_UPSERT_FAILED", message: e.message })
        yield put({ type: "APP_ERROR", message: e.message })
    }
}

function* fetchEventParticipantUpsert(action) {

    try {
        const { event, newParticipant } = action.payload

        const evt = yield eventApi.upsert({ payload: event })
        yield api.resultHandler(evt, 'EVENT_UPSERT_')

        yield put({ type: "EVENTS_UPSERT", payload: evt.data });

        newParticipant._eventId = evt.data._id;

        const prt = yield participantApi.upsert({ payload: { ...newParticipant } })
        yield api.resultHandler(prt, 'PARTICIPANT_UPSERT_')

    } catch (err) {
        yield put({ type: "EVENT_UPSERT_FAILED", message: err.message });
        yield put({ type: "APP_ERROR", message: err.message })
    }
}

function* eventParticipantsSaga() {
    yield takeLatest("EVENT_PARTICIPANTS_FETCH_REQUESTED", fetchParticipant);
    yield takeLatest("EVENT_PARTICIPANT_UPSERT_REQUESTED", fetchUpsert);

    yield takeLatest("EVENT_PARTICIPANT_EVENT_UPSERT_REQUESTED", fetchEventParticipantUpsert);

    yield takeLatest("EVENT_PARTICIPANT_ACCOUNT_UPSERT_REQUESTED", fetchAccountUpsert);
    yield takeEvery("EVENT_PARTICIPANTS_BATCH_UPSERT_REQUESTED", fetchBatchUpsert);
}

export default eventParticipantsSaga;