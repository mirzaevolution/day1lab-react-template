import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BaseResponse } from "../../models";
import { decrypt, encrypt } from "../cryptography/Cryptography";
import { userManager } from "../oidc/UserManager";

export const http = axios.create()

http.interceptors.request.use(async (config) => {
    let token: string | undefined = undefined;
    await userManager.getUser().then(x => token = x?.access_token)
    config.headers = {
        "Authorization": `Bearer ${token}`
    }
    return config;
})

export const httpPublic = axios.create()

httpPublic.interceptors.request.use(async (config) => {
    return config;
})

export const httpEncrypt = axios.create()

httpEncrypt.interceptors.request.use(async (config) => {
    setSettingEncryptHeader(config)
    return config;
})

httpEncrypt.interceptors.response.use((response: AxiosResponse) => {
    let baseResponse: BaseResponse | null = null;
    try {
        baseResponse = response.data as BaseResponse;
    } catch (err) {
        console.error(err);
    }
    if (baseResponse && baseResponse != null && baseResponse.IsEncrypted === true) {
        baseResponse.Result = decrypt(baseResponse.Result);
    }
    return baseResponse;
}, function (error) {
    return Promise.reject(error);
});

const setSettingEncryptHeader = (config: AxiosRequestConfig<any>): AxiosRequestConfig<any> => {
    const methodRequest = config?.method ?? ""
    if (['get', 'delete'].includes(methodRequest)) {
        config.headers = {
            "X-ENCRYPTION-PIPELINE": `out`
        }
    } else if (['post', 'put'].includes(methodRequest)) {
        const encryptedPayload = {
            Payload: encrypt(config.data)
        };

        config.data = encryptedPayload;

        config.headers = {
            "X-ENCRYPTION-PIPELINE": `in-out`
        }
    }
    return config;
}