import { SET_CURRENT_REGION } from "../actions";

export const region = (
    state = {
        coords: [41.8781, -87.6298]
    },
    action
) => {
    switch (action.type) {
    case SET_CURRENT_REGION:
        return { coords: action.coords };
    default:
        return state;
    }
};
