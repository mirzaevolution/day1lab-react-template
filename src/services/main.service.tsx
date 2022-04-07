import { AxiosInstance } from "axios";
import { PingResponse } from "../models";
import { API_GATEWAY_BASE_URL, HttpClient } from "../utils";

export class MainService {
    private _http:AxiosInstance = new HttpClient().http;

    getEncryptedPing = ():Promise<any> => {
        const url = `${API_GATEWAY_BASE_URL}/v1/ping`
        return this._http.get<PingResponse>(url);
    }

    postEncryptedPing = (message: string):Promise<any> => {
        const url = `${API_GATEWAY_BASE_URL}/v1/ping`
        return this._http.post<PingResponse>(url, { message });
    }
}

export const MainServiceInit = new MainService();