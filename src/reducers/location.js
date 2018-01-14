import {CURR_LOCATION} from "../actions";

export const location = (
    state = {
      coords: [41.8781,-87.6298]
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
