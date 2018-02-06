import * as config from "../config/config"
import * as api from "../api/restful"
import io from 'socket.io-client';

export const REQUEST_GEOCODE_FAILED = "REQUEST_GEOCODE_FAILED"
export const REQUEST_GEOCODE_SUCCEEDED = "REQUEST_GEOCODE_SUCCEEDED"
export const CURR_LOCATION = "CURR_LOCATION"
export const REQUEST_PARTICIPANTS = "REQUEST_PARTICIPANTS"
export const RETRIEVE_PARTICIPANTS = "RETRIEVE_PARTICIPANTS"

export const REQUEST_ROUTE_MARKERS = "REQUEST_ROUTE_MARKERS"
export const RETRIEVE_ROUTE_MARKERS = "RETRIEVE_ROUTE_MARKERS"
export const UPDATE_ROUTE_MARKERS = "UPDATE_ROUTE_MARKERS"
export const AUTHENTICATED_USER = "AUTHENTICATED_USER"
export const SET_CURRENT_REGION = "SET_CURRENT_REGION"
export const APP_ERROR = "APP_ERROR"

export const ACCOUNT_AUTHENTICATE_SUCCEEDED = "ACCOUNT_AUTHENTICATE_SUCCEEDED"
export const ACCOUNT_FETCH_REQUESTED = "ACCOUNT_FETCH_REQUESTED"
export const ACCOUNT_UPSERT_REQUESTED = "ACCOUNT_UPSERT_REQUESTED"
export const ACCOUNT_AUTHENTICATE_REQUESTED = "ACCOUNT_AUTHENTICATE_REQUESTED"
export const ACCOUNT_FETCH_SUCCEEDED = "ACCOUNT_FETCH_SUCCEEDED"
export const ACCOUNT_UPSERT_SUCCEEDED = "ACCOUNT_UPSERT_SUCCEEDED"
export const ACCOUNT_AUTHENTICATE_FAILED = "ACCOUNT_AUTHENTICATE_FAILED"
export const ACCOUNT_UPSERT_FAILED = "ACCOUNT_UPSERT_FAILED"
export const ACCOUNT_FETCH_FAILED = "ACCOUNT_FETCH_FAILED"

export const EVENT_UPSERT_REQUESTED = "EVENT_UPSERT_REQUESTED"
export const EVENT_FETCH_REQUESTED = "EVENT_FETCH_REQUESTED"
export const EVENT_FETCH_SUCCEEDED = "EVENT_FETCH_SUCCEEDED"
export const EVENT_FETCH_FAILED = "EVENT_FETCH_FAILED"
export const EVENT_UPSERT_SUCCEEDED = "EVENT_UPSERT_SUCCEEDED"
export const EVENT_UPSERT_FAILED = "EVENT_UPSERT_FAILED"
export const EVENT_CLEAR = "EVENT_CLEAR"

export const PARTICIPANT_UPSERT_REQUESTED = "PARTICIPANT_UPSERT_REQUESTED"
export const PARTICIPANT_FETCH_REQUESTED = "PARTICIPANT_FETCH_REQUESTED"
export const PARTICIPANT_FETCH_SUCCEEDED = "PARTICIPANT_FETCH_SUCCEEDED"
export const PARTICIPANT_FETCH_FAILED = "PARTICIPANT_FETCH_FAILED"
export const PARTICIPANT_UPSERT_SUCCEEDED = "PARTICIPANT_UPSERT_SUCCEEDED"
export const PARTICIPANT_UPSERT_FAILED = "PARTICIPANT_UPSERT_FAILED"
export const PARTICIPANT_ACCOUNT_UPSERT_REQUESTED = "PARTICIPANT_ACCOUNT_UPSERT_REQUESTED"

export const EVENT_PARTICIPANT_UPSERT_REQUESTED = "EVENT_PARTICIPANT_UPSERT_REQUESTED"
export const EVENT_PARTICIPANT_FETCH_REQUESTED = "EVENT_PARTICIPANT_FETCH_REQUESTED"
export const EVENT_PARTICIPANT_FETCH_SUCCEEDED = "EVENT_PARTICIPANT_FETCH_SUCCEEDED"
export const EVENT_PARTICIPANT_FETCH_FAILED = "EVENT_PARTICIPANT_FETCH_FAILED"
export const EVENT_PARTICIPANT_UPSERT_SUCCEEDED = "EVENT_PARTICIPANT_UPSERT_SUCCEEDED"
export const EVENT_PARTICIPANT_UPSERT_FAILED = "EVENT_PARTICIPANT_UPSERT_FAILED"
export const EVENT_PARTICIPANT_ACCOUNT_UPSERT_REQUESTED = "EVENT_PARTICIPANT_ACCOUNT_UPSERT_REQUESTED"
export const EVENT_PARTICIPANT_EVENT_UPSERT_REQUESTED = "EVENT_PARTICIPANT_EVENT_UPSERT_REQUESTED"

export const EVENT_PARTICIPANTS_BATCH_UPSERT_REQUESTED = "EVENT_PARTICIPANTS_BATCH_UPSERT_REQUESTED"
export const EVENT_PARTICIPANTS_BATCH_UPSERT_FAILED = "EVENT_PARTICIPANTS_BATCH_UPSERT_FAILED"
export const EVENT_PARTICIPANTS_CLEAR = "EVENT_PARTICIPANTS_CLEAR"

export const EVENT_PARTICIPANTS_FETCH_REQUESTED = "EVENT_PARTICIPANTS_FETCH_REQUESTED"
export const EVENT_PARTICIPANTS_FETCH_SUCCEEDED = "EVENT_PARTICIPANTS_FETCH_SUCCEEDED"
export const EVENT_PARTICIPANTS_FETCH_FAILED = "EVENT_PARTICIPANTS_FETCH_FAILED"
export const EVENT_PARTICIPANTS_UPSERT = "EVENT_PARTICIPANTS_UPSERT"
export const EVENT_PARTICIPANT_CLEAR = "EVENT_PARTICIPANT_CLEAR"

export const EVENTS_FETCH_REQUESTED = "EVENTS_FETCH_REQUESTED"
export const EVENTS_FETCH_SUCCEEDED = "EVENTS_FETCH_SUCCEEDED"
export const EVENTS_FETCH_FAILED = "EVENTS_FETCH_FAILED"
export const EVENTS_UPSERT = "EVENTS_UPSERT"
export const ACCOUNT_LOGOFF = "ACCOUNT_LOGOFF"

export const PROFILE_UPSERT_FAILED = "PROFILE_UPSERT_FAILED"
export const PROFILE_FETCH_FAILED = "PROFILE_FETCH_FAILED"
export const PROFILE_FETCH_REQUESTED = "PROFILE_FETCH_REQUESTED"
export const PROFILE_UPSERT_REQUESTED = "PROFILE_UPSERT_REQUESTED"
export const PROFILE_FETCH_SUCCEEDED = "PROFILE_FETCH_SUCCEEDED"
export const PROFILE_UPSERT_SUCCEEDED = "PROFILE_UPSERT_SUCCEEDED"

export const currLocation = coords => ({
    type: CURR_LOCATION,
    coords
})

export const requestParticipants = (payload) => ({
    type: REQUEST_PARTICIPANTS,
    payload,
    receivedAt: Date.now()
})

export const retrieveParticipants = (payload) => ({
    type: EVENT_PARTICIPANTS_FETCH_REQUESTED,
    payload,
    receivedAt: Date.now()
})

export const authenticatedUser = (payload) => ({
    type: RETRIEVE_PARTICIPANTS,
    payload,
    receivedAt: Date.now()
})

export const requestRouteMarkers = (payload) => ({
    type: REQUEST_ROUTE_MARKERS,
    payload,
    receivedAt: Date.now()
})

export const retrieveRouteMarkers = (payload) => ({
    type: RETRIEVE_ROUTE_MARKERS,
    payload,
    receivedAt: Date.now()
})

export const updateRouteMarkers = (payload) => ({
    type: UPDATE_ROUTE_MARKERS,
    payload,
    receivedAt: Date.now()
})

export const appError = (error) => ({
    type: APP_ERROR,
    error
})

export const loadParticipants = (payload) => dispatch => {


    dispatch(retrieveParticipants(payload))

    /*
       const socket = io(config.WS_URL, { transports: ['websocket', 'polling'] });

       socket.on('connect', function () {
           setInterval(() => socket.emit('eventparticipants_get',
                   payload, (data) =>
                   api.resultHandler(data, 'EVENT_PARTICIPANTS_FETCH_')),
               10000
           )
       });
       */
}

export const setCurrentRegionAddress = (address) => dispatch => {
    dispatch({ type: 'SET_START_ADDRESS', address })
}


export const setRouteMarkers = (payload) => dispatch => {
    dispatch({ type: 'EVENT_UPSERT_REQUESTED', payload: payload });
}

export const setParticipantMarkers = (payload) => dispatch => {
    dispatch({ type: 'EVENT_PARTICIPANTS_UPSERT', payload: payload });
}

export const setCurrLocation = (coords) => dispatch => {
    dispatch(currLocation(coords))
}

export const updateParticipantCurrLocation = (payload) => dispatch => {

    const { _id, markers, _accountId, _eventId, coords } = payload


    const socket = io(config.WS_URL, { transports: ['websocket', 'polling'] });

    socket.on('connect', function () {
        socket.emit('eventparticipant_upsert', { _id, markers, _accountId, _eventId, coords }, (data) =>
            api.resultHandler(data, 'EVENT_PARTICIPANT_UPSERT_'))

        //socket.emit('eventparticipants_get', { _eventId: _eventId },
        //   (data) => api.resultHandler(data, 'EVENT_PARTICIPANTS_FETCH_'))
    });

    // dispatch(retrieveParticipants({ _eventId: _eventId }))
    //dispatch({ type: 'EVENT_PARTICIPANT_UPSERT_REQUESTED', payload: { _id, markers, _accountId, _eventId } })
}

export const registerUser = (payload) => dispatch => {
    dispatch(authenticatedUser(payload))
}