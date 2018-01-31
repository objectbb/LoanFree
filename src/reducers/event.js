import { EVENT_PARTICIPANT_UPSERT_REQUESTED, EVENT_UPSERT_REQUESTED, EVENT_FETCH_REQUESTED, EVENT_FETCH_SUCCEEDED, EVENT_FETCH_FAILED, EVENT_UPSERT_SUCCEEDED, EVENT_UPSERT_FAILED } from "../actions";

export const event = (
    state = { item: {}, isFetching: false, message: "", error: "" },
    action
) => {
    switch (action.type) {
    case EVENT_FETCH_REQUESTED:
    case EVENT_UPSERT_REQUESTED:
    case EVENT_PARTICIPANT_UPSERT_REQUESTED:
        return {
            ...state,
            payload: action.payload,
            error: action.message,
            isFetching: true
        }
    case EVENT_FETCH_SUCCEEDED:
    case EVENT_UPSERT_SUCCEEDED:
        return {
            item: action.payload,
            isFetching: false
        };
    case EVENT_UPSERT_FAILED:
    case EVENT_FETCH_FAILED:
        return {
            ...state,
            error: action.message,
            isFetching: false
        }
    default:
        return state;
    }
};