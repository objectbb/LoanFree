import { PROFILE_UPSERT_FAILED, PROFILE_FETCH_FAILED, PROFILE_FETCH_REQUESTED, PROFILE_UPSERT_REQUESTED, PROFILE_FETCH_SUCCEEDED, PROFILE_UPSERT_SUCCEEDED } from "../actions";

export const profile = (
    state = { item: {}, authenticated: false, isFetching: false, error: "" },
    action
) => {
    switch (action.type) {
    case PROFILE_FETCH_REQUESTED:
    case PROFILE_UPSERT_REQUESTED:
        return {
            ...state,
            payload: action.payload,
            authenticated: true,
            isFetching: true,
            error: ""
        };
    case PROFILE_FETCH_SUCCEEDED:
    case PROFILE_UPSERT_SUCCEEDED:
        return {
            ...state,
            item: action.payload,
            authenticated: true,
            isFetching: false,
            error: ""
        };
    case PROFILE_UPSERT_FAILED:
    case PROFILE_FETCH_FAILED:
        return {
            ...state,
            error: action.message,
            isFetching: false
        };
    default:
        return state;
    }
};