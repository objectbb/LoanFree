import { EVENTS_FETCH_REQUESTED, EVENTS_FETCH_SUCCEEDED, EVENTS_FETCH_FAILED } from "../actions";

export const events = (
    state = { item: [], isFetching: false, message: "", error: "" },
    action
) => {
    switch (action.type) {
    case EVENTS_FETCH_REQUESTED:
        return {
            ...state,
            payload: action.payload,
            error: action.message,
            isFetching: true
        }
    case EVENTS_FETCH_SUCCEEDED:
        return {
            item: action.payload,
            isFetching: false
        };
    case EVENTS_FETCH_FAILED:
        return {
            ...state,
            error: action.message,
            isFetching: false
        }
    default:
        return state;
    }
};