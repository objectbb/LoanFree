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
export const MAPBOX_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
export const GEOCODIO_URL = 'https://api.geocod.io/v1.2/geocode'


/*
921 S. Ninth Avenue, Maywood, IL. 60153
2069 lower saint dennis rd saint paul 55116
*/


var config = {
    apiKey: "AIzaSyAFRs_t117oJ5pG1Pyo9wwKrVvSbLnar4Y",
    authDomain: "photos-and-me.firebaseapp.com",
    databaseURL: "https://photos-and-me.firebaseio.com",
    projectId: "photos-and-me",
    storageBucket: "photos-and-me",
    messagingSenderId: "368131284243"
};
firebase.initializeApp(config);