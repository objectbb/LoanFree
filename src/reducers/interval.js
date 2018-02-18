import { STOP_INTERVALS, UPDATE_INTERVAL_IDS } from "../actions";

export const interval = (
    state = {
        timerId: '',
        watchPositionId: '',
        timerMarkersVisitedId:'',
        onOff: false
    },
    action
) => {
    switch (action.type) {
    case STOP_INTERVALS:
    case UPDATE_INTERVAL_IDS:
        return {
            ...state,
            timerId: action.timerId,
            watchPositionId: action.watchPositionId,
            onOff: action.onOff
        }
        case 'UPDATE_INTERVAL_ADDMARKER_ID':
        return {
            ...state,
            timerMarkersVisitedId: action.timerMarkersVisitedId
        }

    default:
        return state;
    }
};
