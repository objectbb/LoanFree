import * as config from "../config/config"
import io from 'socket.io-client';

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

export const PARTICIPANT_UPSERT_REQUESTED = "PARTICIPANT_UPSERT_REQUESTED"
export const PARTICIPANT_FETCH_REQUESTED = "PARTICIPANT_FETCH_REQUESTED"
export const PARTICIPANT_FETCH_SUCCEEDED = "PARTICIPANT_FETCH_SUCCEEDED"
export const PARTICIPANT_FETCH_FAILED = "PARTICIPANT_FETCH_FAILED"
export const PARTICIPANT_UPSERT_SUCCEEDED = "PARTICIPANT_UPSERT_SUCCEEDED"
export const PARTICIPANT_UPSERT_FAILED = "PARTICIPANT_UPSERT_FAILED"

export const EVENT_PARTICIPANTS_UPSERT_REQUESTED = "EVENT_PARTICIPANTS_UPSERT_REQUESTED"
export const EVENT_PARTICIPANTS_FETCH_REQUESTED = "EVENT_PARTICIPANTS_FETCH_REQUESTED"
export const EVENT_PARTICIPANTS_FETCH_SUCCEEDED = "EVENT_PARTICIPANTS_FETCH_SUCCEEDED"
export const EVENT_PARTICIPANTS_FETCH_FAILED = "EVENT_PARTICIPANTS_FETCH_FAILED"
export const EVENT_PARTICIPANTS_UPSERT_SUCCEEDED = "EVENT_PARTICIPANTS_UPSERT_SUCCEEDED"
export const EVENT_PARTICIPANTS_UPSERT_FAILED = "EVENT_PARTICIPANTS_UPSERT_FAILED"

export const EVENTS_FETCH_REQUESTED = "EVENTS_FETCH_REQUESTED"
export const EVENTS_FETCH_SUCCEEDED = "EVENTS_FETCH_SUCCEEDED"
export const EVENTS_FETCH_FAILED = "EVENTS_FETCH_FAILED"
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
    type: PARTICIPANT_FETCH_REQUESTED,
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

    dispatch(requestParticipants(payload))

    const socket = io(config.WS_URL, { transports: ['websocket', 'polling'] });

    socket.on('connect', function () {
        socket.emit('participant_broadcast', payload, (data) => dispatch(retrieveParticipants((data))));
    });
}

export const loadRouteMarkers = (payload) => dispatch => {

    dispatch(requestRouteMarkers(payload))

    let items = [{
            index: 0,
            guid: "62r63de1-52f3-43f2-ba69-a21b8ead0a5f",
            place: {
                name: "Point Blank 1"
            },
            coords: [
                41.9082277, -87.6886718
            ],
            range: 70
        },
        {
            index: 1,
            guid: "122720d7-4b50-494f-b4a7-44aa0071305a",
            place: {
                name: "Point Blank 2"
            },
            coords: [
                41.9089477, -87.6880218
            ],
            range: 50
        }
    ];

    dispatch(retrieveRouteMarkers(items))

}

export const setCurrentRegionAddress = (address) => dispatch => {

    dispatch({ type: 'SET_START_ADDRESS', address })
}


export const setRouteMarkers = (payload) => dispatch => {
    dispatch({ type: 'EVENT_UPSERT_REQUESTED', payload: payload });
}


export const setCurrLocation = (coords) => dispatch => {

    dispatch(currLocation(coords))
}

export const registerUser = (payload) => dispatch => {
    dispatch(authenticatedUser(payload))
}