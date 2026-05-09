import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import es from '../public/locales/es.json'
import en from '../public/locales/en.json'

i18n.use(initReactI18next).init({
  lng: 'es',
  fallbackLng: 'es',
  resources: {
    es: { common: es },
    en: { common: en },
  },
  defaultNS: 'common',
  interpolation: { escapeValue: false },
})

export default i18n