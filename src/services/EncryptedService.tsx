import { PingResponse } from "../models";
import { API_GATEWAY_BASE_URL, httpEncrypt } from "../utils";

export const getEncryptedPing = () => {
    const url = `${API_GATEWAY_BASE_URL}/v1/ping`
    return httpEncrypt.get<PingResponse>(url);
}

export const postEncryptedPing = (message: string) => {
    const url = `${API_GATEWAY_BASE_URL}/v1/ping`
    return httpEncrypt.post<PingResponse>(url, { message });
}