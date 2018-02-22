import thunkMiddleware from "redux-thunk"
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { compose, createStore, applyMiddleware } from "redux"
import { combineReducers } from "redux"
import { account } from "./account"
import { location } from "./location"
import { routemarkers } from "./routemarkers"
import { region } from "./region"
import { error } from "./error"
import { event } from "./event"
import { events } from "./events"
import { participant } from "./participant"
import { eventparticipants } from "./eventparticipants"
import { eventparticipant } from "./eventparticipant"
import { profile } from "./profile"
import { photo } from "./photo"
import { interval } from "./interval"
import { activity } from "./activity"

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import * as localForage from "localforage";

import intervalSaga from '../sagas/interval'
import locationSaga from '../sagas/location'
import accountSaga from '../sagas/account'
import eventSaga from '../sagas/event'
import eventsSaga from '../sagas/events'
import participantSaga from '../sagas/participant'
import eventParticipantsSaga from '../sagas/eventparticipants'
import profileSaga from '../sagas/profile'
import photoSaga from '../sagas/photo'

const sagaMiddleware = createSagaMiddleware()
const loggerMiddleware = createLogger()

const rootReducer = combineReducers({
    eventparticipants,
    eventparticipant,
    participant,
    account,
    routemarkers,
    location,
    region,
    error,
    event,
    events,
    profile,
    photo,
    interval,
    activity
})

/*
const persistConfig = {
    key: 'root3',
    storage: localForage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(
    persistedReducer,
    compose(
        applyMiddleware(
            sagaMiddleware,
            thunkMiddleware,
            loggerMiddleware
        )
    )
)
*/
let store = createStore(
    rootReducer,
    compose(
        applyMiddleware(
            sagaMiddleware,
            thunkMiddleware,
            loggerMiddleware
        )
    )
)


sagaMiddleware.run(locationSaga)
sagaMiddleware.run(intervalSaga)
sagaMiddleware.run(accountSaga)
sagaMiddleware.run(eventSaga)
sagaMiddleware.run(participantSaga)
sagaMiddleware.run(eventParticipantsSaga)
sagaMiddleware.run(eventsSaga)
sagaMiddleware.run(profileSaga)
sagaMiddleware.run(photoSaga)

/*
export default () => {
    let persistor = persistStore(store)
    return { store, persistor }
}*/

export default store
