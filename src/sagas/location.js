import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from "../api/restful"
import * as config from "../config/config";


function* fullOnGeocode(fulladdress, action) {

    let coords

    try {
        coords = yield call(api.call, '/geocode', { address: fulladdress })
        return coords

    } catch (err) {
        const errMsg = `Exception - ${String(err)}`

        if (action)
            yield put({
                type: 'REQUEST_GEOCODE_FAILED',
                message: errMsg,
                payload: { ...action.payload, coords: undefined }
            });
        yield put({ type: 'APP_ERROR', message: `Geocoding Failed ${errMsg}` });
    }

}

function currLocation() {

    navigator.geolocation.watchPosition(position => {
        put({
            type: 'CURR_LOCATION',
            coords: [position.coords.latitude,
                position.coords.longitude
            ]
        });
    }, function error(msg) {

        alert('Please enable your GPS position future.');

    }, { maximumAge: 600000000, timeout: 5000, enableHighAccuracy: true });

}

function* setCurrentRegionAddress(action) {
    try {

        const coords = yield* fullOnGeocode(action.address)

        if (!(coords.data && coords.data.lng && coords.data.lat)) {
            const errMsg = `${action.address} ${JSON.stringify(coords)}`
            yield put({ type: 'APP_ERROR', message: `Geocoding Failed ${errMsg}` });
        } else {
            console.log("location --> setCurrentRegionAddress loc ", coords.data)
            yield put({ type: 'SET_CURRENT_REGION', coords: [coords.data.lat, coords.data.lng] });
        }
    } catch (err) {
        yield put({ type: 'APP_ERROR', message: String(err) });
    }

}

function* requestGeocode(action) {
    try {

        console.log(action)
        const { address, city, state, zipcode, nextAction } = action.payload
        const fulladdress = `${address}, ${city}, ${state}, ${zipcode}`

        let coords = yield* fullOnGeocode(fulladdress, action)

        if (!(coords.data && coords.data.lng && coords.data.lat)) {
            const errMsg = `${fulladdress} ${JSON.stringify(coords)}`

            if (action)
                yield put({
                    type: 'REQUEST_GEOCODE_FAILED',
                    message: errMsg,
                    payload: { ...action.payload, coords: undefined }
                });
            yield put({ type: 'APP_ERROR', message: `Geocoding Failed ${errMsg}` });
        } else
            yield put({ type: 'REQUEST_GEOCODE_SUCCEEDED', payload: { ...action.payload, coords: [coords.data.lat, coords.data.lng] } });

    } catch (err) {
        const errMsg = `${String(err)}`
        yield put({ type: 'APP_ERROR', message: errMsg });
    }
}

function* locationSaga() {
    yield takeLatest('SET_START_ADDRESS', setCurrentRegionAddress);
    yield takeLatest('REQUEST_GEOCODE', requestGeocode);
    yield takeLatest('CURR_LOCATION', currLocation);
}

export default locationSaga;