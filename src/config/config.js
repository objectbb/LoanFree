import firebase from 'firebase'

const API_PORT = 5000
/*
const API_HOST = 'https://pacific-meadow-71522.herokuapp.com'
export const WS_URL = 'https://pacific-meadow-71522.herokuapp.com'
export const API_URL = `${API_HOST}`
*/


const API_HOST = 'http://localhost'
export const API_URL = `${API_HOST}:${API_PORT}`
export const WS_URL = 'localhost:5000'

export const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json'


const config = {
    apiKey: "AIzaSyBG7ADbDjk1utWN4hPKUPHxP5DeSinBZvY",
    authDomain: "loanfree-photos.firebaseapp.com",
    databaseURL: "https://loanfree-photos.firebaseio.com",
    storageBucket: "loanfree-photos.appspot.com",
};
firebase.initializeApp(config);