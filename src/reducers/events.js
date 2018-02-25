import { EVENTS_UPSERT, EVENTS_FETCH_REQUESTED, EVENTS_FETCH_SUCCEEDED, EVENTS_FETCH_FAILED } from "../actions";

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
            isFetching: true,
            message: '',
            error: ""
        }
    case EVENTS_UPSERT:
        return {
            item: state.item.find((item) => (item._id === action.payload._id)) ? state.item.map(item => {
                if (item._id === action.payload._id) {
                    return { ...item, ...action.payload }
                }
                return item
            }) : [...state.item, action.payload],
            isFetching: false,
            message: 'Saved',
            error: ""
        };
    case EVENTS_FETCH_SUCCEEDED:
        return {
            item: action.payload,
            isFetching: false,
            message: '',
            error: ""
        };
    case EVENTS_FETCH_FAILED:
        return {
            ...state,
            error: action.message,
            message: '',
            isFetching: false
        }
    default:
        return state;
    }
};