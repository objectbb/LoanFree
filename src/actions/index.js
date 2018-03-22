import * as config from "../config/config"
import * as api from "../api/restful"
import * as localForage from "localforage"
import firebase from 'firebase'
import io from 'socket.io-client'
import geolib from "geolib"
import { uniqWith } from 'lodash'

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
export const ACCOUNT_LOGOFF = "ACCOUNT_LOGOFF"
export const ACCOUNT_CLEAR = "ACCOUNT_CLEAR"

export const EVENT_UPSERT_REQUESTED = "EVENT_UPSERT_REQUESTED"
export const EVENT_FETCH_REQUESTED = "EVENT_FETCH_REQUESTED"
export const EVENT_FETCH_SUCCEEDED = "EVENT_FETCH_SUCCEEDED"
export const EVENT_FETCH_FAILED = "EVENT_FETCH_FAILED"
export const EVENT_UPSERT_SUCCEEDED = "EVENT_UPSERT_SUCCEEDED"
export const EVENT_UPSERT_FAILED = "EVENT_UPSERT_FAILED"
export const EVENT_CLEAR = "EVENT_CLEAR"
export const EVENT_CLEAR_VIEW = "EVENT_CLEAR_VIEW"


export const PARTICIPANT_CLEAR = "PARTICIPANT_CLEAR"
export const PARTICIPANT_UPSERT_REQUESTED = "PARTICIPANT_UPSERT_REQUESTED"
export const PARTICIPANT_FETCH_REQUESTED = "PARTICIPANT_FETCH_REQUESTED"
export const PARTICIPANT_FETCH_SUCCEEDED = "PARTICIPANT_FETCH_SUCCEEDED"
export const PARTICIPANT_FETCH_FAILED = "PARTICIPANT_FETCH_FAILED"
export const PARTICIPANT_UPSERT_SUCCEEDED = "PARTICIPANT_UPSERT_SUCCEEDED"
export const PARTICIPANT_UPSERT_FAILED = "PARTICIPANT_UPSERT_FAILED"
export const PARTICIPANT_ACCOUNT_UPSERT_REQUESTED = "PARTICIPANT_ACCOUNT_UPSERT_REQUESTED"

export const EVENT_PARTICIPANT_UPSERT_ACCOUNT = "EVENT_PARTICIPANT_UPSERT_ACCOUNT"
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
export const EVENT_PARTICIPANT_UPDATE_COORDS = "EVENT_PARTICIPANT_UPDATE_COORDS"

export const EVENT_PARTICIPANTS_FETCH_REQUESTED = "EVENT_PARTICIPANTS_FETCH_REQUESTED"
export const EVENT_PARTICIPANTS_FETCH_SUCCEEDED = "EVENT_PARTICIPANTS_FETCH_SUCCEEDED"
export const EVENT_PARTICIPANTS_FETCH_FAILED = "EVENT_PARTICIPANTS_FETCH_FAILED"
export const EVENT_PARTICIPANTS_UPSERT = "EVENT_PARTICIPANTS_UPSERT"
export const EVENT_PARTICIPANT_CLEAR = "EVENT_PARTICIPANT_CLEAR"

export const EVENTS_PARTICIPANT_FETCH_REQUESTED = "EVENTS_PARTICIPANT_FETCH_REQUESTED"

export const EVENTS_FETCH_REQUESTED = "EVENTS_FETCH_REQUESTED"
export const EVENTS_FETCH_SUCCEEDED = "EVENTS_FETCH_SUCCEEDED"
export const EVENTS_FETCH_FAILED = "EVENTS_FETCH_FAILED"
export const EVENTS_UPSERT = "EVENTS_UPSERT"

export const PROFILE_FETCH_FAILED = "PROFILE_FETCH_FAILED"
export const PROFILE_FETCH_REQUESTED = "PROFILE_FETCH_REQUESTED"
export const PROFILE_FETCH_SUCCEEDED = "PROFILE_FETCH_SUCCEEDED"
export const PROFILE_UPSERT_REQUESTED = "PROFILE_UPSERT_REQUESTED"
export const PROFILE_UPSERT_FAILED = "PROFILE_UPSERT_FAILED"
export const PROFILE_UPSERT_SUCCEEDED = "PROFILE_UPSERT_SUCCEEDED"

export const PHOTO_INSERT = "PHOTO_INSERT"
export const PHOTO_UPSERT_FAILED = "PHOTO_UPSERT_FAILED"
export const PHOTO_UPSERT_SUCCEEDED = "PHOTO_UPSERT_SUCCEEDED"
export const PHOTO_UPSERT_REQUESTED = "PHOTO_UPSERT_REQUESTED"

export const PHOTO_FETCH_FAILED = "PHOTO_FETCH_FAILED"
export const PHOTO_FETCH_SUCCEEDED = "PHOTO_FETCH_SUCCEEDED"
export const PHOTO_FETCH_REQUESTED = "PHOTO_FETCH_REQUESTED"
export const PHOTO_UPSERT = "PHOTO_UPSERT"

export const PHOTO_FIREBASE_UPSERT_FAILED = "PHOTO_FIREBASE_UPSERT_FAILED"
export const PHOTO_FIREBASE_UPSERT_SUCCEEDED = "PHOTO_FIREBASE_UPSERT_SUCCEEDED"
export const PHOTO_FIREBASE_UPSERT_REQUESTED = "PHOTO_FIREBASE_UPSERT_REQUESTED"

export const UPDATE_INTERVAL_IDS = "UPDATE_INTERVAL_IDS"
export const STOP_INTERVALS = "STOP_INTERVALS"

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

export const stopWatchPosition = (id) => dispatch => {
    navigator.geolocation.clearWatch(id)
}


export const initWebSocketReceive = (participant) => dispatch => {

    if (Object.getOwnPropertyNames(participant.item).length === 0) return

    const _eventId = participant.item._eventId

    const socket = io(config.WS_URL, { transports: ['websocket', 'polling'] });
    socket.on('connect', function () {
        socket.emit('room', _eventId);
    });

    socket.on('eventparticipant_update_coords', (participant) => {
        console.log("watchPosition --> eventparticipant_update_coords --> participant ", participant, participant.coords)

        if (participant.coords && participant.coords.length === 2)
            dispatch({
                type: EVENT_PARTICIPANTS_UPSERT,
                payload: participant
            })
    })


    socket.on('photo_broadcast', (photo) => {
        console.log("watchPosition --> photo_broadcast --> participant ", photo)
        dispatch({
            type: PHOTO_INSERT,
            payload: photo
        })
    })

    socket.on('event_broadcast', (event) => {
        console.log("watchPosition --> event_broadcast --> participant ", event)
        dispatch({
            type: EVENTS_UPSERT,
            payload: event
        })

        dispatch({
            type: EVENT_FETCH_SUCCEEDED,
            payload: event
        })

    })

}

export const watchPosition = (participant, event) => dispatch => {

    console.log("index --> watchPosition --> participant ", participant)

    dispatch(this.initWebSocketReceive(participant))

    return navigator.geolocation.watchPosition(position => {

        const newcoords = [position.coords.latitude, position.coords.longitude]
        this.setCurrLocation(coords)

        console.log("index --> geolocation.watchPosition --> coords ", newcoords)
        console.log("index --> geolocation.watchPosition --> participant ", participant)

        if (Object.getOwnPropertyNames(participant.item).length === 0) return

        const prtCoords = { ...participant.item }
        prtCoords.coords = newcoords

        console.log("index --> geolocation.watchPosition --> prtCoords", prtCoords)

        const { _id, markers, _accountId, _eventId, coords } = prtCoords


        const socket = io(config.WS_URL, { transports: ['websocket', 'polling'] });
        socket.on('connect', function () {
            socket.emit('room', _eventId);

            let newmarkers = dispatch(addMarkersVisited(prtCoords, event))

            console.log("index --> geolocation.watchPosition --> newmarkers ", newmarkers)

            socket.emit('eventparticipant_upsert', { _id, markers: newmarkers, _accountId, _eventId, coords }, (data) =>
                api.resultHandler(data, 'EVENT_PARTICIPANT_UPSERT_'))

            console.log("index --> geolocation.watchPosition --> participant ", participant.item, event)


        });

    }, function error(msg) {}, { maximumAge: 600000000, timeout: 5000, enableHighAccuracy: true });

}

export const stopInterval = (id) => dispatch => {
    console.log("index clearInterval -->", id)
    clearInterval(id)
    id = undefined
}

export const intervalLoadParticipants = (payload) => dispatch => {
    const SECOND = 1000

    console.log("index loadParticipants -->", payload)

    return setInterval(() => {
        // dispatch(retrieveParticipants(payload))
        dispatch({
            type: PHOTO_FETCH_REQUESTED,
            payload: payload
        });
    }, 10 * SECOND)
}

export const withinRangeMarkerIndicator = (markers, participant) => {

    return markers &&
        markers.map((marker) => {
            let distance = geolib.getDistance({
                latitude: participant.coords[0],
                longitude: participant.coords[1]
            }, { latitude: marker.coords[0], longitude: marker.coords[1] })
            if (distance < marker.range) {
                return Object.assign({}, { details: { range: distance, coords: participant.coords } }, { marker })
            }
        }).filter((item) => item);

}

export const addMarkersVisited = (participant, event) => dispatch => {


    console.log("index addMarkersVisited --> ", participant, event.item.markers)

    const markers = event.item.markers
    const closemarker = this.withinRangeMarkerIndicator(markers, participant)

    console.log("index addMarkersVisited closemarker --> ", closemarker)


    let newmarkers = []
    if (participant.markers && participant.markers.length === 0)
        newmarkers = closemarker
    else
        newmarkers = closemarker ?
        closemarker.filter(
            (marker) =>
            participant.markers.find((item) => {
                return marker.marker.guid && item.marker.guid &&
                    marker.marker.guid !== item.marker.guid
            })
        )
        : []

    if (newmarkers && newmarkers.length > 0) {

        const { _id, markers, _accountId, _eventId, coords } = participant

        const mergemarkers = [...participant.markers].concat(newmarkers)

        unqMarkers = uniqWith(mergemarkers, function (item1, item2) {
            return item1.marker.name === item2.marker.name
        })


        console.log("index addMarkersVisited unqMarkers --> ", unqMarkers)


        dispatch(setParticipantMarkers({
            _id,
            markers: unqMarkers,
            _accountId,
            _eventId,
            coords
        }))

        return unqMarkers
    }

    return [...participant.markers]
}

export const logoutUser = () => dispatch => {

    dispatch(this.clearApp())

    dispatch({ type: ACCOUNT_LOGOFF })

    localForage.clear()

    if (typeof (Storage) !== "undefined") {
        console.log("clean local storage")
        localStorage.clear()
        sessionStorage.clear()
    }
}

export const setCurrentRegionAddress = (address) => dispatch => {
    dispatch({ type: 'SET_START_ADDRESS', address })
}

export const setRouteMarkers = (payload) => dispatch => {
    dispatch({ type: 'EVENT_UPSERT_REQUESTED', payload: payload });

    const socket = io(config.WS_URL, { transports: ['websocket', 'polling'] });
    socket.emit('event_broadcast', payload)
}

export const setParticipantMarkers = (payload) => dispatch => {

    dispatch({
        type: EVENT_PARTICIPANT_UPSERT_REQUESTED,
        payload: payload
    })

}


export const uploadImagetoFirebase = (participant, payload) => dispatch => {

    const { email, lastname, firstname } = participant.item.account
    const { name, startdate } = participant.item.event
    const { coords } = participant.item

    const fileName = `${email}_${name}_${startdate}_${coords}_${Date.now()}.jpg`
    const storageRef = firebase.storage().ref(fileName);

    const metadata = {
        email,
        lastname,
        firstname,
        eventName: name,
        startdate,
        coords: String(coords)
    }

    const task = storageRef.put(payload, metadata);

    task.on('state_changed',
        (snapshot) => {
            dispatch({ type: PHOTO_FIREBASE_UPSERT_REQUESTED, payload: snapshot.downloadURL });
            console.log('index -->  uploadImagetoFirebase requested', snapshot.downloadURL);
            console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
            dispatch({ type: PHOTO_FIREBASE_UPSERT_FAILED, payload: error })
            console.log("index --> uploadImagetoFirebase  --> error ", error)

        },
        () => {

            const payload = {
                _eventId: participant.item._eventId,
                participant: participant.item,
                photoURLFirebase: task.snapshot.downloadURL
            }

            dispatch({ type: PHOTO_FIREBASE_UPSERT_SUCCEEDED, payload: task.snapshot.downloadURL });
            dispatch({
                type: PHOTO_UPSERT_REQUESTED,
                payload
            });

            dispatch({
                type: PHOTO_INSERT,
                payload
            })

            const socket = io(config.WS_URL, { transports: ['websocket', 'polling'] });
            socket.emit('photo_broadcast', payload)

            console.log('index -->  uploadImagetoFirebase --> succeed', task.snapshot.downloadURL);
        })

}

export const setCurrLocation = (coords) => dispatch => {
    dispatch(currLocation(coords))
}

export const clearApp = () => dispatch => {
    dispatch({ type: EVENT_CLEAR })
    dispatch({ type: EVENT_CLEAR_VIEW })
    dispatch({ type: EVENT_PARTICIPANTS_CLEAR })
    dispatch({ type: EVENT_PARTICIPANT_CLEAR })
    dispatch({ type: PARTICIPANT_CLEAR })
}

export const refreshHardEvent = (participant) => dispatch => {
    dispatch({ type: EVENT_CLEAR })
    dispatch({ type: EVENT_CLEAR_VIEW })
    dispatch({ type: EVENT_PARTICIPANTS_CLEAR })
    dispatch({ type: EVENT_PARTICIPANT_CLEAR })
    dispatch({ type: PARTICIPANT_CLEAR })
    dispatch({ type: UPDATE_INTERVAL_IDS, action: { onOff: false } })
}

export const refreshEvent = (participant) => dispatch => {

    dispatch({ type: EVENT_CLEAR })
    dispatch({ type: EVENT_PARTICIPANTS_CLEAR })
    dispatch({ type: EVENT_PARTICIPANT_CLEAR })

    dispatch({
        type: 'EVENTS_FETCH_REQUESTED',
        payload: { _accountId: participant.item._accountId }
    })

    dispatch({
        type: 'EVENTS_PARTICIPANT_FETCH_REQUESTED',
        payload: { _accountId: participant.item._accountId }
    })

    dispatch({
        type: 'EVENT_PARTICIPANTS_FETCH_REQUESTED',
        payload: { _eventId: participant.item._eventId }
    })

}

export const registerUser = (payload) => dispatch => {
    dispatch(authenticatedUser(payload))
}