import axios, { AxiosResponse } from "axios";
import { BaseResponse } from "../../models";
import { decrypt, encrypt } from "../cryptography/cryptography";
import { userManager } from "../oidc/user-manager";

export const http = axios.create()

http.interceptors.request.use(async (config) => {
    let token: string | undefined = undefined;
    await userManager.getUser().then(x => token = x?.access_token)
    let headerData = {
        "Authorization" : `Bearer ${token}`,
        "X-ENCRYPTION-PIPELINE" : "" 
    };
    const methodRequest = config?.method ?? ""
    if (['get', 'delete'].includes(methodRequest)) {
        headerData["X-ENCRYPTION-PIPELINE"] = "out"
    } else if (['post', 'put'].includes(methodRequest)) {
        const encryptedPayload = {
            Payload: encrypt(config.data)
        };
        config.data = encryptedPayload;
        headerData["X-ENCRYPTION-PIPELINE"] = "in-out"
    }
    config.headers = headerData;
    return config;
})

http.interceptors.response.use((response: AxiosResponse) => {
    return setSettingEncryptResponse(response);
}, function (error) {
    return Promise.reject(error);
});

const setSettingEncryptResponse = (response: AxiosResponse): BaseResponse | null => {
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
}