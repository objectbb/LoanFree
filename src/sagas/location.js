import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from "../api/restful"
import * as config from "../config/config";

function currLocation() {

    navigator.geolocation.watchPosition(position => {
        put({ type: 'CURR_LOCATION', coords: [position.coords.latitude, position.coords.longitude] });
    }, function error(msg) {

        alert('Please enable your GPS position future.');

    }, { maximumAge: 600000000, timeout: 5000, enableHighAccuracy: true });

}

function* setCurrentRegionAddress(action) {
    try {

        console.log("index --> setCurrentRegionAddress --> action ", action)
        const geocoderesults =
            yield call(api.callget, config.GEOCODE_URL, `address=${action.address}`);

        console.log("index --> setCurrentRegionAddress --> geocoderesults ", geocoderesults)
        const loc = geocoderesults.data.results[0].geometry.location

        yield put({ type: 'SET_CURRENT_REGION', coords: [loc.lat, loc.lng] });
    } catch (err) {
        yield put({ type: 'APP_ERROR', message: String(err) });
    }
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



function* locationSaga() {
    yield takeLatest('SET_START_ADDRESS', setCurrentRegionAddress);
    yield takeLatest('REQUEST_GEOCODE', requestGeocode);
    yield takeLatest('CURR_LOCATION', currLocation);
}

export default locationSaga;