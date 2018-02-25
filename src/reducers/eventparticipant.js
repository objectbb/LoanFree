import { EVENT_PARTICIPANT_EVENT_UPSERT_REQUESTED, EVENT_PARTICIPANT_CLEAR, EVENT_PARTICIPANT_ACCOUNT_UPSERT_REQUESTED, EVENT_PARTICIPANT_UPSERT_REQUESTED, EVENT_PARTICIPANT_FETCH_REQUESTED, EVENT_PARTICIPANT_FETCH_SUCCEEDED, EVENT_PARTICIPANT_FETCH_FAILED, EVENT_PARTICIPANT_UPSERT_SUCCEEDED, EVENT_PARTICIPANT_UPSERT_FAILED } from "../actions";

export const eventparticipant = (
    state = { item: {}, isFetching: false, message: "", error: "" },
    action
) => {
    switch (action.type) {
    case EVENT_PARTICIPANT_EVENT_UPSERT_REQUESTED:
    case EVENT_PARTICIPANT_ACCOUNT_UPSERT_REQUESTED:
        return {
            ...state,
            payload: action.payload,
            isFetching: false,
            message: '',
            error: ""
        };
    case EVENT_PARTICIPANT_FETCH_REQUESTED:
    case EVENT_PARTICIPANT_UPSERT_REQUESTED:
        return {
            ...state,
            payload: action.payload,
            isFetching: true,
            message: '',
            error: ""
        };
    case EVENT_PARTICIPANT_FETCH_SUCCEEDED:
        return {
            ...state,
            item: action.payload,
            authenticated: true,
            isFetching: false,
            message: '',
            error: ""
        };
    case EVENT_PARTICIPANT_UPSERT_SUCCEEDED:
        return {
            ...state,
            item: action.payload,
            authenticated: true,
            isFetching: false,
            message: "Saved",
            error: ""
        };
    case EVENT_PARTICIPANT_UPSERT_FAILED:
    case EVENT_PARTICIPANT_FETCH_FAILED:
        return {
            ...state,
            error: action.message,
            message: '',
            isFetching: false
        }
    case EVENT_PARTICIPANT_CLEAR:
        return {
            ...state,
            item: {},
            isFetching: false,
            message: '',
            error: ""
        }
    default:
        return state;
    }
};