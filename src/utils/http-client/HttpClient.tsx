import axios from "axios";
import { userManager } from "../oidc/UserManager";

export const http = axios.create()

http.interceptors.request.use(async (config) => {
    let token:string | undefined = undefined;
    await userManager.getUser().then(x => token = x?.access_token)
    config.headers = {
        "Authorization" : `Bearer ${token}`
    }
    return config;
})

export const httpPublic = axios.create()

http.interceptors.request.use(async (config) => {
    return config;
})