import axios, { AxiosResponse } from "axios";
import { BaseResponse } from "../../models";
import { Cryptography } from "../cryptography/cryptography";
import { AuthManagerInit } from "../oidc/user-manager";

export class HttpClient {
    private _encryptor:Cryptography = new Cryptography();
    public http = axios.create()

    constructor() {
        this.createAxiosInstance()
    }

    private createAxiosInstance = () => {
        this.http.interceptors.request.use(async (config) => {
            let token: string | undefined = undefined;
            await AuthManagerInit.userManager.getUser().then(x => token = x?.access_token)
            let headerData = {
                "Authorization": `Bearer ${token}`,
                "X-ENCRYPTION-PIPELINE": ""
            };
            const methodRequest = config?.method ?? ""
            if (['get', 'delete'].includes(methodRequest)) {
                headerData["X-ENCRYPTION-PIPELINE"] = "out"
            } else if (['post', 'put'].includes(methodRequest)) {
                const encryptedPayload = {
                    Payload: this._encryptor.encrypt(config.data)
                };
                config.data = encryptedPayload;
                headerData["X-ENCRYPTION-PIPELINE"] = "in-out"
            }
            config.headers = headerData;
            return config;
        })

        this.http.interceptors.response.use((response: AxiosResponse) => {
            let baseResponse: BaseResponse | null = null;
            try {
                baseResponse = response.data as BaseResponse;
            } catch (err) {
                console.error(err);
            }
            if (baseResponse && baseResponse != null && baseResponse.IsEncrypted === true) {
                baseResponse.Result = this._encryptor.decrypt(baseResponse.Result);
            }
            return baseResponse;
        }, function (error) {
            return Promise.reject(error);
        });
    }

}