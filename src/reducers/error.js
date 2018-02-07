import { PROFILE_FETCH_FAILED, PROFILE_UPSERT_FAILED, PARTICIPANT_FETCH_FAILED, PARTICIPANT_UPSERT_FAILED, EVENTS_FETCH_FAILED, EVENT_PARTICIPANTS_FETCH_FAILED, EVENT_PARTICIPANT_FETCH_FAILED, EVENT_PARTICIPANT_UPSERT_FAILED, ACCOUNT_AUTHENTICATE_FAILED, ACCOUNT_FETCH_FAILED, ACCOUNT_UPSERT_FAILED, EVENT_FETCH_FAILED, EVENT_UPSERT_FAILED, APP_ERROR } from "../actions";
import moment from 'moment'
export const error = (
    state = {
        error: {},
        history: []
    },
    action
) => {
    switch (action.type) {
    case PROFILE_UPSERT_FAILED:
    case PROFILE_FETCH_FAILED:
    case PARTICIPANT_UPSERT_FAILED:
    case PARTICIPANT_FETCH_FAILED:
    case EVENTS_FETCH_FAILED:
    case EVENT_PARTICIPANTS_FETCH_FAILED:
    case EVENT_PARTICIPANT_UPSERT_FAILED:
    case EVENT_PARTICIPANT_FETCH_FAILED:
    case ACCOUNT_AUTHENTICATE_FAILED:
    case ACCOUNT_UPSERT_FAILED:
    case ACCOUNT_FETCH_FAILED:
    case EVENT_UPSERT_FAILED:
    case EVENT_FETCH_FAILED:
    case APP_ERROR:
        return {
            ...state,
            error: action.message,
            history: [...state.history, { error: action.message, timeStamp: moment().format('llll') }],
            timeStamp: moment().format('llll')
        }
    default:
        return state;
    }
};