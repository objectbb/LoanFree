import { PARTICIPANT_UPSERT_REQUESTED, PARTICIPANT_FETCH_REQUESTED, PARTICIPANT_FETCH_SUCCEEDED, PARTICIPANT_FETCH_FAILED, PARTICIPANT_UPSERT_SUCCEEDED, PARTICIPANT_UPSERT_FAILED } from "../actions";

export const participant = (
    state = { item: {}, isFetching: false, message: "", error: "" },
    action
) => {
    switch (action.type) {
    case PARTICIPANT_FETCH_REQUESTED:
    case PARTICIPANT_UPSERT_REQUESTED:
        return {
            ...state,
            payload: action.payload,
            isFetching: true
        }
    case PARTICIPANT_FETCH_SUCCEEDED:
    case PARTICIPANT_UPSERT_SUCCEEDED:
        return {
            ...state,
            item: action.payload,
            authenticated: true,
            isFetching: false
        };
    case PARTICIPANT_UPSERT_FAILED:
    case PARTICIPANT_FETCH_FAILED:
        return {
            ...state,
            error: action.message,
            isFetching: false
        }
    default:
        return state;
    }
};