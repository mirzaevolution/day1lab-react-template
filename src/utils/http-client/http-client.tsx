import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { BaseResponse } from "../../models";
import { IS_ENCRYPTION_ACTIVE } from "../constant/global.constants";
import { Cryptography } from "../cryptography/cryptography";
import { EtcHelpersInit } from "../helpers/etc.helpers";
import { AuthManagerInit } from "../oidc/user-manager";

export class HttpClient {
    private _encryptor: Cryptography = new Cryptography();
    public http = axios.create()

    constructor() {
        this.createAxiosInstance()
    }

    private createAxiosInstance = () => {
        this.http.interceptors.request.use(async (config) => {
            let token: string | undefined = undefined;
            await AuthManagerInit.userManager.getUser().then(x => token = x?.access_token)
            let headerData: AxiosRequestHeaders = {
                "Authorization": `Bearer ${token}`
            };
            const methodRequest = config?.method ?? ""
            if (IS_ENCRYPTION_ACTIVE) {
                if (['get', 'delete'].includes(methodRequest)) {
                    headerData["X-ENCRYPTION-PIPELINE"] = "out"
                } else if (['post', 'put'].includes(methodRequest)) {
                    const encryptedPayload = {
                        Payload: this._encryptor.encrypt(config.data)
                    };
                    config.data = encryptedPayload;
                    headerData["X-ENCRYPTION-PIPELINE"] = "in-out"
                }
            }
            config.headers = headerData;
            return config;
        })

        this.http.interceptors.response.use((response: AxiosResponse) => {
            let baseResponse: BaseResponse | null = null;
            try {
                baseResponse = response.data as BaseResponse;
                baseResponse = EtcHelpersInit.convertObjecKeyFirstCharToLower(baseResponse)
            } catch (err) {
                console.error(err);
            }
            if (IS_ENCRYPTION_ACTIVE && baseResponse && baseResponse != null && baseResponse.isEncrypted === true) {
                baseResponse.result = this._encryptor.decrypt(baseResponse.result);
            }
            return baseResponse;
        }, function (error) {
            return Promise.reject(error);
        });
    }
}