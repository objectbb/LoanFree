import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from "../api/restful"
import * as config from "../config/config";

function* setCurrentRegionAddress(action) {
    try {
        const geocoderesults =
            yield call(api.call, config.GEOCODE_URL, action.address);

        //const item = yield call(api.call, '/account_get', action.payload);

        const loc = geocoderesults.data.results[0].geometry.location

        yield put({ type: 'SET_CURRENT_REGION', coords: [loc.lat, loc.lng] });
    } catch (err) {
        yield put({ type: 'APP_ERROR', error: err });
    }
}

function* requestGeocode(action) {
    try {

        console.log(action)
        const { address, city, state, zipcode, nextAction } = action.payload
        const fulladdress = `${address}, ${city}, ${state}, ${zipcode}`
        const geocoderesults =  yield call(api.call, config.GEOCODE_URL, fulladdress)
            //yield axios.get(config.GEOCODE_URL + fulladdress);

        const loc = geocoderesults.data.results[0].geometry.location

        action.payload = { ...action.payload, coords: [loc.lat, loc.lng] }


        yield put({ type: nextAction, payload: action.payload });
    } catch (err) {
        yield put({ type: 'APP_ERROR', error: err });
    }
}

function* rootSaga() {
    yield takeLatest('SET_START_ADDRESS', setCurrentRegionAddress);
    yield takeLatest('REQUEST_GEOCODE', requestGeocode);
}

export default rootSaga;
