import thunkMiddleware from "redux-thunk"
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { compose, createStore, applyMiddleware } from "redux"
import { combineReducers } from "redux"
import { participants } from "./participants"
import { authenticated } from "./authenticated"
import { location } from "./location"
import { routemarkers } from "./routemarkers"
import { region } from "./region"
import { error } from "./error"

import rootSaga from '../sagas'
//import currLocationSaga from '../sagas/currlocation'

const sagaMiddleware = createSagaMiddleware()
const loggerMiddleware = createLogger()

const rootReducer = combineReducers({
    participants,
    authenticated,
    routemarkers,
    location,
    region,
    error
})

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

sagaMiddleware.run(rootSaga)
//sagaMiddleware.run(currLocationSaga)

export default store
