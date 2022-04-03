import { API_BASE_URL, http } from "../utils";

export const getPing = () => {
    const url = `${API_BASE_URL}/api/Ping`
    return http.get(url);
}

export const postPing = () => {
    const url = `${API_BASE_URL}/api/Ping`
    return http.post(url);
}