import { BASE_URL, httpPublic } from "../utils";

export const getUser = () => {
    return httpPublic.get(`${BASE_URL}/users`)
}