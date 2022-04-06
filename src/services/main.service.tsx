import { PingResponse } from "../models";
import { API_GATEWAY_BASE_URL, http } from "../utils";

export const getEncryptedPing = () => {
    const url = `${API_GATEWAY_BASE_URL}/v1/ping`
    return http.get<PingResponse>(url);
}

export const postEncryptedPing = (message: string) => {
    const url = `${API_GATEWAY_BASE_URL}/v1/ping`
    return http.post<PingResponse>(url, { message });
}