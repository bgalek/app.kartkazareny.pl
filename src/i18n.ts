import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationPL from "./translations.pl.json";
import translationUA from "./translations.ua.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "PL",
    resources: {
      PL: {
        translation: translationPL,
      },
      UA: {
        translation: translationUA,
      },
    },
  });

export default i18n;
