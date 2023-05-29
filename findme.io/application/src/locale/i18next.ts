import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ua from './ua.json';

const resources = {
  en: { translation: en },
  ua: { translation: ua },
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    compatibilityJSON: 'v3',
    lng: 'en',
    detection: {
      order: ['AsyncStorage', 'lang'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'lang',
      caches: ['AsyncStorage'],
      keySeparator: false,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    },
  }).then();

export default i18next;
