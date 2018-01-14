import {AUTHENTICATED_USER} from "../actions";

export const authenticated = (
    state = {
    },
    action
) => {
    switch (action.type) {
    case AUTHENTICATED_USER:
        return { user: action.user };
    default:
        return state;
    }
};
