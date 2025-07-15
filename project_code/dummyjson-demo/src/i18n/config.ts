import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';

// console.log('expo-localization', Localization.getLocales());
// console.log('browser', navigator.language, navigator.languages);

const fallbackLng = 'en';
const languageTag = Localization.getLocales()[0]?.languageTag || fallbackLng; // tries to get the first preferred 

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
};

i18n
  .use(initReactI18next)
  .init({
    lng: languageTag,
    fallbackLng,
    resources,
    interpolation: { escapeValue: false },
  });

export default i18n;
