import { REQUEST_ROUTE_MARKERS, RETRIEVE_ROUTE_MARKERS, UPDATE_ROUTE_MARKERS } from "../actions";

export const routemarkers = (
    state = {
        items: []
    },
    action
) => {
    switch (action.type) {
    case REQUEST_ROUTE_MARKERS:
        return { items: [], payload: action.payload };
    case RETRIEVE_ROUTE_MARKERS:
        return { items: action.payload };
    case UPDATE_ROUTE_MARKERS:
        return { items: action.payload };
    default:
        return state;
    }
};