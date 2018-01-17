import { call, put, takeLatest } from 'redux-saga/effects'
import axios from "axios";

function  currLocation() {

        navigator.geolocation.watchPosition(position => {
             put({ type: 'CURR_LOCATION', coords: [position.coords.latitude, position.coords.longitude]});
        }, function error(msg) {

            alert('Please enable your GPS position future.');

        }, { maximumAge: 600000000, timeout: 5000, enableHighAccuracy: true });

}

function *currLocationSaga() {
 yield takeLatest('CURR_LOCATION', currLocation);
}

export default currLocationSaga;
