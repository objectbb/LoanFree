import { put } from 'redux-saga/effects'
import axios from "axios";
import * as config from "../config/config"

export function call(path, payload) {
    return axios.post(
        config.API_URL + path,
        payload
    );
}

export function callget(path, payload) {
    return axios.get(`${path}?${payload}`);
}

export function* resultHandler(result, entityAction) {

    if (result.data.errors)
        yield put({ type: `${entityAction}FAILED`, message: JSON.stringify(result.data.errors) });
    else if (!result.data)
        yield put({ type: `${entityAction}FAILED`, message: "No data" });
    else if (result.data && result.data.length > 0)
        yield put({ type: `${entityAction}SUCCEEDED`, payload: [].concat(result.data) });
    else if (result.data)
        yield put({ type: `${entityAction}SUCCEEDED`, payload: result.data });
}