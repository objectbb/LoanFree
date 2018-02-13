import { STOP_INTERVALS, UPDATE_INTERVAL_IDS } from "../actions";

export const interval = (
    state = {
        timerId: '',
        watchPositionId: ''
    },
    action
) => {
    switch (action.type) {
    case STOP_INTERVALS:
    case UPDATE_INTERVAL_IDS:
        return {
            ...state,
            timerId: action.timerId,
            watchPositionId: action.watchPositionId
        }
    default:
        return state;
    }
};
