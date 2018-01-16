import { call, put, takeLatest } from 'redux-saga/effects'
import axios from "axios";

function* setCurrentRegionAddress(action) {
    try {
        const geocoderesults =
            yield axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${action.address}`);

        const loc = geocoderesults.data.results[0].geometry.location

        yield put({ type: 'SET_CURRENT_REGION', coords: [loc.lat, loc.lng] });
    } catch (err) {
        yield put({ type: 'APP_ERROR', error: err });
    }
}

export default function* geocodeAddress() {
    yield takeLatest('REQUEST_GEOCODE', setCurrentRegionAddress);
}
