import { EVENT_PARTICIPANT_ACCOUNT_UPSERT_REQUESTED, EVENT_PARTICIPANT_UPSERT_REQUESTED, EVENT_PARTICIPANT_FETCH_REQUESTED, EVENT_PARTICIPANT_FETCH_SUCCEEDED, EVENT_PARTICIPANT_FETCH_FAILED, EVENT_PARTICIPANT_UPSERT_SUCCEEDED, EVENT_PARTICIPANT_UPSERT_FAILED } from "../actions";

export const eventparticipant = (
    state = { item: {}, isFetching: false, message: "", error: "" },
    action
) => {
    switch (action.type) {
    case EVENT_PARTICIPANT_ACCOUNT_UPSERT_REQUESTED:
    case EVENT_PARTICIPANT_FETCH_REQUESTED:
    case EVENT_PARTICIPANT_UPSERT_REQUESTED:
        return {
            ...state,
            payload: action.payload,
            isFetching: true,
            error: ""
        };
    case EVENT_PARTICIPANT_FETCH_SUCCEEDED:
    case EVENT_PARTICIPANT_UPSERT_SUCCEEDED:
        return {
            ...state,
            item: action.payload,
            authenticated: true,
            isFetching: false,
            error: ""
        };
    case EVENT_PARTICIPANT_UPSERT_FAILED:
    case EVENT_PARTICIPANT_FETCH_FAILED:
        return {
            ...state,
            error: action.message,
            isFetching: false
        }
    default:
        return state;
    }
};