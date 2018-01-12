import { APP_ERROR } from "../actions";

export const error = (
    state = {
        error: {},
    },
    action
) => {
    switch (action.type) {
    case APP_ERROR:
        return { msg: action.error }
    default:
        return state;
    }
};