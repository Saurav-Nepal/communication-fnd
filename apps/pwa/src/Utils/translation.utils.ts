import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ChainedBackend from 'i18next-chained-backend';
import { initReactI18next } from 'react-i18next';

i18n.use(ChainedBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        // debug: true,
        defaultNS: 'common',
        ns: ['common', 'dashboard', 'settings'],
        // saveMissing: true,
        // backend: {
        //     backendOptions: [
        //         {
        //             expirationTime: 2 * 24 * 60 * 60 * 1000, // 2 days
        //         },
        //         {
        //             loadPath: `${GLOBAL.ROUTE_URL}next-language?lng={{lng}}&ns={{ns}}`,
        //             addPath: `${GLOBAL.ROUTE_URL}next-missing-language?lng={{lng}}&ns={{ns}}`,
        //         },
        //     ],
        //     backends: [LocalStorageBackend, HttpBackend],
        // },
        detection: {
            order: ['htmlTag', 'cookie', 'localStorage', 'subdomain'],
        },
        react: {
            bindI18n: 'languageChanged',
            bindI18nStore: 'added',
            useSuspense: false,
        },
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });
