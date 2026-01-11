import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import en_US from "../translation/en-US/translation.json"
import tr_TR from "../translation/tr-TR/translation.json"

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en-EN',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: en_US,
            },
            tr: {
                translation: tr_TR,
            }
        },
    });


export default i18n;