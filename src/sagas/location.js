import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from "../api/restful"
import * as config from "../config/config";

function googleAutoComplete(address) {
    return call(api.callget, config.GOOGLE_AUTOCOMPLETE, `?input=${address}&types=geocode&language=fr&key=AIzaSyCnwNNjhla4bLrLmuF7KryB2HBhhj8t_Cc`)
}

function googlePlaceId(placeId) {
    return call(api.callget, config.GOOGLE_PLACEID, `?placeid=${placeId}&types=geocode&language=fr&key=AIzaSyCnwNNjhla4bLrLmuF7KryB2HBhhj8t_Cc`)
}

function mapboxGeocoding(address) {
    return call(api.callget, config.MAPBOX_URL, `${address}+nw.json?access_token=
pk.eyJ1Ijoib2JqZWN0YmIiLCJhIjoiY2pkd3FiYzVtMXhwdzJ2bXVmZDlqejFpMiJ9.rAxR9-G_wpdDBE3ZELQn2w`)
}

function geocodioGeocoding(address) {
    return call(api.callget, config.GEOCODIO_URL, `?q=${address}&api_key=87bbb9b55565f538b9b5b859b2525b52f5f00c5`)
}

function* fullOnGeocode(fulladdress, action) {
    let loc
    let geocoderesults

    try {

        console.log("location --> googleGeocode fulladdress ", fulladdress)

        geocoderesults = yield geocodioGeocoding(fulladdress)
        console.log("location --> geocodioGeocoding ", geocoderesults.data)

        if (geocoderesults.data.results && geocoderesults.data.results.length > 0)
            return geocoderesults.data.results[0].location

        geocoderesults = yield call(api.callget, config.GEOCODE_URL, `?address=${fulladdress}`)

        console.log("location --> googleGeocode fulladdress ", geocoderesults)

        if (!geocoderesults.data.error_message && geocoderesults.data.results > 0 &&
            geocoderesults.data.results[0].geometry)
            return geocoderesults.data.results[0].geometry.location

        geocoderesults = yield googleAutoComplete(fulladdress)
        const predictions = yield geocoderesults.data.predictions

        console.log("location --> googleGeocode predictions ", predictions)

        if (predictions.length > 0) {

            const placeId = predictions[0].place_id

            console.log("location --> googleGeocode placeId ", placeId)

            geocoderesults = yield googlePlaceId(placeId)

            console.log("location --> googleGeocode geocoderesults ", geocoderesults)
            return yield geocoderesults.data.result.geometry.location

        }

        geocoderesults = yield mapboxGeocoding(fulladdress)
        console.log("location --> mapboxGeocoding ", geocoderesults.data)

        if (geocoderesults.data.features && geocoderesults.data.features.length > 0) {
            const coords = geocoderesults.data.features[0].geometry.coordinates
            return { lat: coords[1], lng: coords[0] }
        }

        const errMsg = `${fulladdress} ${geocoderesults.data}`

        if (action)
            yield put({
                type: 'REQUEST_GEOCODE_FAILED',
                message: errMsg,
                payload: { ...action.payload, coords: undefined }
            });
        yield put({ type: 'APP_ERROR', message: `Geocoding Failed ${errMsg}` });


    } catch (err) {
        const errMsg = `${String(err)} ${geocoderesults.data}`

        if (action)
            yield put({
                type: 'REQUEST_GEOCODE_FAILED',
                message: errMsg,
                payload: { ...action.payload, coords: undefined }
            });
        yield put({ type: 'APP_ERROR', message: errMsg });
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

        const loc = yield* fullOnGeocode(action.address)

        console.log("location --> setCurrentRegionAddress loc ", loc)


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

        let loc = yield* fullOnGeocode(fulladdress, action)
        yield put({ type: 'REQUEST_GEOCODE_SUCCEEDED', payload: { ...action.payload, coords: [loc.lat, loc.lng] } });

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