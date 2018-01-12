import { RETRIEVE_INTERESTS } from "../actions";

export const interests = (
    state = {},
    action
) => {
    switch (action.type) {
    case RETRIEVE_INTERESTS:
        return action.interests;
    default:
        return state;
    }
};