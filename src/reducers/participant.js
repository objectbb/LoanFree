import { PARTICIPANT_CLEAR, PARTICIPANT_ACCOUNT_UPSERT_REQUESTED, PARTICIPANT_UPSERT_REQUESTED, PARTICIPANT_FETCH_REQUESTED, PARTICIPANT_FETCH_SUCCEEDED, PARTICIPANT_FETCH_FAILED, PARTICIPANT_UPSERT_SUCCEEDED, PARTICIPANT_UPSERT_FAILED } from "../actions";

export const participant = (
    state = { item: {}, isFetching: false, message: "", error: "" },
    action
) => {
    switch (action.type) {
    case PARTICIPANT_ACCOUNT_UPSERT_REQUESTED:
    case PARTICIPANT_FETCH_REQUESTED:
    case PARTICIPANT_UPSERT_REQUESTED:
        return {
            ...state,
            payload: action.payload,
            isFetching: true,
            message: '',
            error: ""
        };
    case PARTICIPANT_FETCH_SUCCEEDED:
        return {
            ...state,
            item: action.payload,
            authenticated: true,
            isFetching: false,
            message: '',
            error: ""
        };
    case PARTICIPANT_UPSERT_SUCCEEDED:
        return {
            ...state,
            item: action.payload,
            authenticated: true,
            isFetching: false,
            message: "Saved",
            error: ""
        };
    case PARTICIPANT_UPSERT_FAILED:
    case PARTICIPANT_FETCH_FAILED:
        return {
            ...state,
            error: action.message,
            message: '',
            isFetching: false
        }
    case PARTICIPANT_CLEAR:
        return {
            ...state,
            item: { id: undefined },
            isFetching: false,
            message: '',
            error: ""
        }
    default:
        return state;
    }
};