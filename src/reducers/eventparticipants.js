import { EVENT_PARTICIPANTS_UPSERT_REQUESTED, EVENT_PARTICIPANTS_FETCH_REQUESTED, EVENT_PARTICIPANTS_FETCH_SUCCEEDED, EVENT_PARTICIPANTS_FETCH_FAILED, EVENT_PARTICIPANTS_UPSERT_SUCCEEDED, EVENT_PARTICIPANTS_UPSERT_FAILED } from "../actions";

export const eventparticipants = (
    state = { item: [], isFetching: false, message: "", error: "" },
    action
) => {
    switch (action.type) {
    case EVENT_PARTICIPANTS_FETCH_REQUESTED:
    case EVENT_PARTICIPANTS_UPSERT_REQUESTED:
        return {
            ...state,
            payload: action.payload,
            isFetching: true
        }
    case EVENT_PARTICIPANTS_FETCH_SUCCEEDED:
    case EVENT_PARTICIPANTS_UPSERT_SUCCEEDED:
        return {
            ...state,
            item: action.payload,
            authenticated: true,
            isFetching: false
        };
    case EVENT_PARTICIPANTS_UPSERT_FAILED:
    case EVENT_PARTICIPANTS_FETCH_FAILED:
        return {
            ...state,
            error: action.message,
            isFetching: false
        }
    default:
        return state;
    }
};