import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEnglish from '@assets/locales/translation.en.json';
import translationFrench from '@assets/locales/translation.fr.json';

const resources = {
  en: {
    translation: translationEnglish,
  },
  fr: {
    translation: translationFrench,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: 'en',
});

export default i18next;
