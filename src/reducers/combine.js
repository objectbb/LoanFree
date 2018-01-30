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

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import * as localForage from "localforage";

import rootSaga from '../sagas'
import accountSaga from '../sagas/account'
import eventSaga from '../sagas/event'
import eventsSaga from '../sagas/events'
import participantSaga from '../sagas/participant'
import eventParticipantsSaga from '../sagas/eventparticipants'
import profileSaga from '../sagas/profile'

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
    profile
})

const persistConfig = {
    key: 'root3',
    storage: localForage,
    whitelist: ['account']
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

sagaMiddleware.run(rootSaga)
sagaMiddleware.run(accountSaga)
sagaMiddleware.run(eventSaga)
sagaMiddleware.run(participantSaga)
sagaMiddleware.run(eventParticipantsSaga)
sagaMiddleware.run(eventsSaga)
sagaMiddleware.run(profileSaga)

export default () => {
    let persistor = persistStore(store)
    return { store, persistor }
}
