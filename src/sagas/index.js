import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from "../api/restful"
import * as config from "../config/config";

function* setCurrentRegionAddress(action) {
    try {
        const geocoderesults =
            yield call(api.callget, config.GEOCODE_URL, `address=${action.address}`);

        const loc = geocoderesults.data.results[0].geometry.location

        yield put({ type: 'SET_CURRENT_REGION', coords: [loc.lat, loc.lng] });
    } catch (err) {
        yield put({ type: 'APP_ERROR', message: String(err) });
    }
}

function* stopIntervals(action) {

    console.log("index --> stopIntervals --> watchPositionId", action.watchPositionId)
    if (action.watchPositionId)
           navigator.geolocation.clearWatch(action.watchPositionId)


    console.log("index --> stopIntervals --> timerId ",action.timerId)
    if (action.timerId)
            navigator.geolocation.clearInterval(action.timerId)
}

function* requestGeocode(action) {
    try {

        console.log(action)
        const { address, city, state, zipcode, nextAction } = action.payload
        const fulladdress = `${address}, ${city}, ${state}, ${zipcode}`
        const geocoderesults = yield call(api.callget, config.GEOCODE_URL, `address=${fulladdress}`)

        const loc = geocoderesults.data.results[0].geometry.location

        yield put({ type: 'REQUEST_GEOCODE_SUCCEEDED', payload: { ...action.payload, coords: [loc.lat, loc.lng] } });
    } catch (err) {
        yield put({ type: 'REQUEST_GEOCODE_FAILED', payload: action.payload });

        yield put({ type: 'APP_ERROR', message: String(err) });
    }
}

function* rootSaga() {
    yield takeLatest('SET_START_ADDRESS', setCurrentRegionAddress);
    yield takeLatest('REQUEST_GEOCODE', requestGeocode);
    yield takeEvery('STOP_INTERVALS', stopIntervals);
}

export default rootSaga;
