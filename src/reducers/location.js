import { CURR_LOCATION } from "../actions";

export const location = (
    state = {
        coords: null,
        history: []
    },
    action
) => {
    switch (action.type) {
    case CURR_LOCATION:
        return {
            coords: action.coords,
            history: [...state.history, action.coords]
        };
    default:
        return state;
    }
};