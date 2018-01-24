import { ACCOUNT_AUTHENTICATE_REQUESTED, ACCOUNT_UPSERT_REQUESTED, ACCOUNT_FETCH_REQUESTED, ACCOUNT_AUTHENTICATE_FAILED, ACCOUNT_AUTHENTICATE_SUCCEEDED, ACCOUNT_FETCH_SUCCEEDED, ACCOUNT_FETCH_FAILED, ACCOUNT_UPSERT_SUCCEEDED, ACCOUNT_UPSERT_FAILED } from "../actions";

export const account = (
    state = { item: {}, authenticated: false, isFetching: false, error: "" },
    action
) => {
    switch (action.type) {
    case ACCOUNT_FETCH_REQUESTED:
    case ACCOUNT_UPSERT_REQUESTED:
    case ACCOUNT_AUTHENTICATE_REQUESTED:
        return {
            ...state,
            item: action.payload,
            authenticated: false,
            isFetching: true
        };
    case ACCOUNT_FETCH_SUCCEEDED:
    case ACCOUNT_UPSERT_SUCCEEDED:
    case ACCOUNT_AUTHENTICATE_SUCCEEDED:
        return {
            ...state,
            item: action.payload,
            authenticated: true,
            isFetching: false,
            error: ""
        };

    case ACCOUNT_AUTHENTICATE_FAILED:
        return {
            ...state,
            authenticated: false,
            error: action.message,
            isFetching: false
        };
    case ACCOUNT_UPSERT_FAILED:
    case ACCOUNT_FETCH_FAILED:
        return {
            ...state,
            error: action.message,
            isFetching: false
        };
    default:
        return state;
    }
};