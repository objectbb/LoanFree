import { EVENT_CLEAR_VIEW, REQUEST_GEOCODE_FAILED, REQUEST_GEOCODE_SUCCEEDED, EVENT_CLEAR, EVENT_PARTICIPANT_UPSERT_REQUESTED, EVENT_UPSERT_REQUESTED, EVENT_FETCH_REQUESTED, EVENT_FETCH_SUCCEEDED, EVENT_FETCH_FAILED, EVENT_UPSERT_SUCCEEDED, EVENT_UPSERT_FAILED } from "../actions";

export const event = (
    state = { item: {}, isFetching: false, message: "", error: "" },
    action
) => {
    switch (action.type) {
    case 'REQUEST_GEOCODE':
    case EVENT_FETCH_REQUESTED:
    case EVENT_UPSERT_REQUESTED:
    case EVENT_PARTICIPANT_UPSERT_REQUESTED:
        return {
            ...state,
            payload: action.payload,
            isFetching: true,
            message: '',
            error: ""
        }
    case REQUEST_GEOCODE_SUCCEEDED:
        return {
            ...state,
            item: action.payload,
            isFetching: false,
            message: '',
            error: ""
        };
    case EVENT_FETCH_SUCCEEDED:
        return {
            ...state,
            item: action.payload,
            isFetching: false,
            message: '',
            error: ""
        };
    case EVENT_UPSERT_SUCCEEDED:
        return {
            ...state,
            item: action.payload,
            isFetching: false,
            message: "Saved",
            error: ""
        };
    case REQUEST_GEOCODE_FAILED:
        return {
            ...state,
            item: action.payload,
            error: `Geocoding failed - ${action.message}`,
            message: '',
            isFetching: false
        }
    case EVENT_UPSERT_FAILED:
    case EVENT_FETCH_FAILED:
        return {
            ...state,
            error: action.message,
            message: '',
            isFetching: false
        }
    case EVENT_CLEAR_VIEW:
        return {
            error: "",
            message: '',
            isFetching: false,
            item: {
                name: '',
                displayname: '',
                description: '',
                coords: [],
                markers: [],
                teams: [],
                address: '',
                startdate: '',
                city: '',
                state: '',
                zipcode: ''
            }
        }
    case EVENT_CLEAR:
        return {
            ...state,
            message: '',
            item: {}
        }
    default:
        return state;
    }
};