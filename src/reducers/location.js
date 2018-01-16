import { CURR_LOCATION } from "../actions";

export const location = (
    state = {
        coords: null
    },
    action
) => {
    switch (action.type) {
    case CURR_LOCATION:
        return { coords: action.coords };
    default:
        return state;
    }
};
