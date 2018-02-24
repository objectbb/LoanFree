import firebase from 'firebase'

const API_PORT = 5000

const API_HOST = 'https://pacific-meadow-71522.herokuapp.com'
export const WS_URL = 'https://pacific-meadow-71522.herokuapp.com'
export const API_URL = `${API_HOST}`

/*
const API_HOST = 'http://localhost'
export const API_URL = `${API_HOST}:${API_PORT}`
export const WS_URL = 'localhost:5000'
*/
export const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json'
export const GOOGLE_AUTOCOMPLETE = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'
export const GOOGLE_PLACEID = 'https://maps.googleapis.com/maps/api/place/details/json'

var config = {
    apiKey: "AIzaSyAFRs_t117oJ5pG1Pyo9wwKrVvSbLnar4Y",
    authDomain: "photos-and-me.firebaseapp.com",
    databaseURL: "https://photos-and-me.firebaseio.com",
    projectId: "photos-and-me",
    storageBucket: "photos-and-me",
    messagingSenderId: "368131284243"
};
firebase.initializeApp(config);
