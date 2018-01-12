import { SET_CURRENT_REGION } from "../actions";

export const region = (
    state = {
        isFetching: false,
        didInvalidate: false,
        items: []
    },
    action
) => {
    switch (action.type) {
    case SET_CURRENT_REGION:
        return {
            ...state
        };
    default:
        return state;
    }
};