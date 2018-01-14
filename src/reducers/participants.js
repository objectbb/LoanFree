import {REQUEST_PARTICIPANTS, RETRIEVE_PARTICIPANTS} from "../actions";

export const participants = (
    state = {
        items:[]
    },
    action
) => {
    switch (action.type) {
    case REQUEST_PARTICIPANTS:
        return {items: [], payload: action.payload};
    case RETRIEVE_PARTICIPANTS:
        return {items: action.payload};
    default:
        return state;
    }
};
