export const CURR_LOCATION = "CURR_LOCATION"
export const REQUEST_PARTICIPANTS = "REQUEST_PARTICIPANTS"
export const RETRIEVE_PARTICIPANTS = "RETRIEVE_PARTICIPANTS"
export const REQUEST_ROUTE_MARKERS = "REQUEST_ROUTE_MARKERS"
export const RETRIEVE_ROUTE_MARKERS = "RETRIEVE_ROUTE_MARKERS"
export const UPDATE_ROUTE_MARKERS = "UPDATE_ROUTE_MARKERS"
export const AUTHENTICATED_USER = "AUTHENTICATED_USER"
export const APP_ERROR = "APP_ERROR"

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
    type: RETRIEVE_PARTICIPANTS,
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
    dispatch(retrieveParticipants([{
            index: 0,
            guid: "62c63de1-52f3-43f2-ba69-a21b8ead0a5f",
            name: {
                first: "Angelita",
                last: "Bird"
            },
            coords: [
                41.8281, -87.6698
            ]
        },
        {
            index: 1,
            guid: "122720d7-4b55-494f-b4a7-44aa0071305a",
            name: {
                "first": "Phyllis",
                "last": "Wood"
            },
            coords: [
                41.8291, -87.6698
            ]
        }
    ]))
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
                  41.8241, -87.6698
            ],
            range: 50
        },
        {
            index: 1,
            guid: "122720d7-4b50-494f-b4a7-44aa0071305a",
            place: {
                name: "Point Blank 2"
            },
            coords: [
                 41.8241, -87.6698
            ],
            range: 50
        }
    ];

    dispatch(retrieveRouteMarkers(items))
}

export const setRouteMarkers = (payload) => dispatch => {
    dispatch(updateRouteMarkers(payload))
}

export const setCurrRegion = (coords) => dispatch => {
    console.log(coords);
    dispatch(currLocation(coords))
}

export const registerUser = (payload) => dispatch => {
    dispatch(authenticatedUser(payload))
}
