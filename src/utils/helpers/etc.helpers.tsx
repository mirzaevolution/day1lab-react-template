import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import EN from "../localization/en.json"
import { AuthManagerInit } from "../oidc/user-manager";
export class EtcHelpers {
    private _userManagerConfig = AuthManagerInit.userManagerConfig;

    getUserSessionStorage = (): string => {
        const storageAuthKey = `oidc.user:${this._userManagerConfig.authority}:${this._userManagerConfig.client_id}`
        const item = sessionStorage.getItem(storageAuthKey) ?? "";
        return item;
    }

    getErrorMessageFormik = (isTouched?: boolean, value?: string): string => {
        return (isTouched ?? false) ? value ?? "" : "";
    }

    convertObjecKeyFirstCharToLower = (data: object): any => {
        let entries = Object.entries(data);
        let capsEntries = entries.map((entry) => [entry[0][0].toLocaleLowerCase() + entry[0].slice(1), entry[1]]);
        return Object.fromEntries(capsEntries);
    }
}

export const EtcHelpersInit = new EtcHelpers();


export const UseTranslationHook = () => {
    i18next
        .use(initReactI18next)
        .init({
            resources: {
                en: {
                    translation: EN
                }
            },
            lng: "en",
            fallbackLng: "en",
            interpolation: {
                escapeValue: false
            }
        });
}