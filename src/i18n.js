import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import XHR from 'i18next-xhr-backend'

i18next
  .use(XHR)
  .use(initReactI18next)
  .init({
    lng: 'en-US',
    backend: {
      loadPath: `./locales/{{lng}}.json`,
    },
    react: {
      useSuspense: false,
    },
    fallbackLng: 'en-US',
    preload: ['en-US'],
    keySeparator: false,
    interpolation: { escapeValue: false },
  })

export default i18next
