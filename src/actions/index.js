export const REQUEST_POSTS = "REQUEST_POSTS"
export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const SET_CURRENT_REGION = "SET_CURRENT_REGION"

export const RETRIEVE_PEOPLE = "RETRIEVE_PEOPLE"
export const RETRIEVE_INTERESTS = "RETRIEVE_INTERESTS"
export const APP_ERROR = "APP_ERROR"

export const requestPosts = payload => ({
    type: REQUEST_POSTS,
    payload
})

export const receivePosts = (payload) => ({
    type: RECEIVE_POSTS,
    payload,
    receivedAt: Date.now()
})

export const appError = payload => ({
    type: APP_ERROR,
    payload
})

export const setCurrentRegion = region => ({
    type: REQUEST_CUSTOMER_PROPERTY_TRACKING,
    region
})

export const retrieveInterests = interests => ({
    type: RETRIEVE_INTERESTS,
    interests
})

export const retrievePeople = people => ({
    type: RETRIEVE_PEOPLE,
    people: people
})


const config = {
    method: "GET"
}