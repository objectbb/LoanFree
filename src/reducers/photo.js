import { PHOTO_FIREBASE_UPSERT_FAILED, PHOTO_FIREBASE_UPSERT_SUCCEEDED, PHOTO_UPSERT, PHOTO_UPSERT_FAILED, PHOTO_FETCH_FAILED, PHOTO_FETCH_REQUESTED, PHOTO_UPSERT_REQUESTED, PHOTO_FETCH_SUCCEEDED, PHOTO_UPSERT_SUCCEEDED } from "../actions";

export const photo = (
    state = { item: [], authenticated: false, isFetching: false, error: "", firebase: false },
    action
) => {
    switch (action.type) {
    case PHOTO_FETCH_REQUESTED:
    case PHOTO_UPSERT_REQUESTED:
        return {
            ...state,
            payload: action.payload,
            authenticated: true,
            isFetching: true,
            message: '',
            error: ""
        };
    case PHOTO_FETCH_SUCCEEDED:
        return {
            ...state,
            item: action.payload,
            authenticated: true,
            isFetching: false,
            message: '',
            error: ""
        };
    case PHOTO_UPSERT_SUCCEEDED:
        return {
            ...state,
            item: action.payload,
            authenticated: true,
            isFetching: false,
            message: "Saved",
            error: ""
        };
    case PHOTO_FIREBASE_UPSERT_SUCCEEDED:
        return {
            ...state,
            message: 'Saved',
            firebase: true
        }
    case PHOTO_FIREBASE_UPSERT_FAILED:
        return {
            ...state,
            message: '',
            firebase: false
        }
    case PHOTO_UPSERT:
        return {
            ...state,
            item: state.item.
            find((item) => (item._id === action.payload._id)) ? state.item.map(item => {
                if (item._id === action.payload._id) {
                    return { ...item, ...action.payload }
                }
                return item
            }) : [...state.item, action.payload],
            isFetching: false,
            message: 'Saved',
            error: ""
        };
    case PHOTO_UPSERT_FAILED:
    case PHOTO_FETCH_FAILED:
        return {
            ...state,
            error: action.message,
            message: '',
            isFetching: false
        };
    default:
        return state;
    }
};