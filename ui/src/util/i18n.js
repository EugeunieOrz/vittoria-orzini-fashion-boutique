import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";

import translationsEn from "../locales/en/translation.json";
import translationsIt from "../locales/it/translation.json";
import translationsAr from "../locales/ar/translation.json";

i18n
   .use(XHR)
   .use(LanguageDetector).init({
    debug: true,
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    },
  // we init with resources
  resources: {
    en: {
      translations: translationsEn
    },
    it: {
      translations: translationsIt
    },
    ar: {
      translations: translationsAr
    }
  },

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",
  react: {
    useSuspense: false,
    wait: false,
  },
});

export default i18n;
