import axios from "axios";
import * as config from "../config/config"

export function call(path, payload) {
    return axios.post(
        config.API_URL + path,
        payload
    );
}