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
import { participant } from "./participant"

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootSaga from '../sagas'
import accountSaga from '../sagas/account'
import eventSaga from '../sagas/event'
import participantSaga from '../sagas/participant'

const sagaMiddleware = createSagaMiddleware()
const loggerMiddleware = createLogger()

const rootReducer = combineReducers({
    participant,
    account,
    routemarkers,
    location,
    region,
    error,
    event,
    participant
})

const persistConfig = {
    key: 'root',
    storage: storage,
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

export default () => {
    //  let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
}