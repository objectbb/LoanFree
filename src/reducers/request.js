import { REQUEST_POSTS, RECEIVE_POSTS } from "../actions";

export const request = (
    state = {
        payload: ''
    },
    action
) => {
    switch (action.type) {
    case REQUEST_POSTS:
        return {
            ...state,
            isFetching: true
        };
    case RECEIVE_POSTS:
        return { payload: action.payload };
    default:
        return state;
    }
};