import thunkMiddleware from "redux-thunk"
import { compose, createStore, applyMiddleware } from "redux"
import { combineReducers } from "redux"
import { participants } from "./participants"
import { authenticated  } from "./authenticated"
import { location  } from "./location"
import { routemarkers  } from "./routemarkers"
import { error } from "./error"

const rootReducer = combineReducers({
    participants,
    authenticated,
    routemarkers,
    location,
    error
})

let store = createStore(
    rootReducer,
    compose(
        applyMiddleware(
            thunkMiddleware // lets us dispatch() functions
        )
    )
)

export default store
