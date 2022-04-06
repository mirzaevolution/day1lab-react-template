import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import EN from "../localization/en.json"

export const getErrorMessageFormik = (isTouched?: boolean, value?: string): string => {
    return (isTouched ?? false) ? value ?? "" : "";
};

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