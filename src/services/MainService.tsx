import axios from "axios";
import { BASE_URL } from "../utils";

export const getUser = () => {
    return axios.get(`${BASE_URL}/users`)
}