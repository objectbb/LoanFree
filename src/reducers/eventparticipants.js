import { EVENT_PARTICIPANTS_CLEAR, EVENT_PARTICIPANTS_UPSERT, EVENT_PARTICIPANTS_FETCH_FAILED, EVENT_PARTICIPANTS_FETCH_REQUESTED, EVENT_PARTICIPANTS_FETCH_SUCCEEDED, } from "../actions";

export const eventparticipants = (
    state = { item: [], isFetching: false, message: "", error: "" },
    action
) => {
    switch (action.type) {
    case EVENT_PARTICIPANTS_FETCH_REQUESTED:
        return {
            ...state,
            payload: action.payload,
            isFetching: true
        }
    case EVENT_PARTICIPANTS_FETCH_SUCCEEDED:
        return {
            ...state,
            item: action.payload,
            authenticated: true,
            isFetching: false
        };
    case EVENT_PARTICIPANTS_UPSERT:
        return {
            item: state.item.find((item) => (item.id === action.payload.id)) ? state.item.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, ...action.payload }
                }
                return item
            }) : [...state.item, ...action.payload],
            isFetching: false
        };
    case EVENT_PARTICIPANTS_FETCH_FAILED:
        return {
            ...state,
            error: action.message,
            isFetching: false
        }
    case EVENT_PARTICIPANTS_CLEAR:
        return {
            ...state,
            item: []
        };
    default:
        return state;
    }
};