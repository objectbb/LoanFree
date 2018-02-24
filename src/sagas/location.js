import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from "../api/restful"
import * as config from "../config/config";

function googleAutoComplete(address) {
    return call(api.callget, config.GOOGLE_AUTOCOMPLETE, `input=${address}&types=geocode&language=fr&key=AIzaSyCnwNNjhla4bLrLmuF7KryB2HBhhj8t_Cc`)
}

function googlePlaceId(placeId) {
    return call(api.callget, config.GOOGLE_PLACEID, `placeid=${placeId}&types=geocode&language=fr&key=AIzaSyCnwNNjhla4bLrLmuF7KryB2HBhhj8t_Cc`)
}

function* googleGeocode(fulladdress) {
    let loc

    try {

        let geocoderesults = yield call(api.callget, config.GEOCODE_URL, `address=${fulladdress}`)

        if (geocoderesults.data.results[0].geometry)
            return geocoderesults.data.results[0].geometry.location

        const results = yield googleAutoComplete(fulladdress)
        const predictions = results.data.predictions

        if (predictions.length > 0) {

            const placeId = predictions[0].place_id
            geocoderesults = yield googlePlaceId(placeId)

            return geocoderesults.data.result.geometry.location

        } else {
            yield put({ type: 'REQUEST_GEOCODE_FAILED', payload: fulladdress });
            yield put({ type: 'APP_ERROR', message: `Geocoding Failed ${fulladdress}` });
        }

    } catch (err) {
        yield put({ type: 'REQUEST_GEOCODE_FAILED', payload: fulladdress });
        yield put({ type: 'APP_ERROR', message: `${String(err)} ${fulladdress}` });
    }
}

function currLocation() {

    navigator.geolocation.watchPosition(position => {
        put({ type: 'CURR_LOCATION', coords: [position.coords.latitude, position.coords.longitude] });
    }, function error(msg) {

        alert('Please enable your GPS position future.');

    }, { maximumAge: 600000000, timeout: 5000, enableHighAccuracy: true });

}

function* setCurrentRegionAddress(action) {
    try {

        const loc = yield* googleGeocode(action.address)

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

        let loc = yield* googleGeocode(fulladdress)
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