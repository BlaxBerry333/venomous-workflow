import i18next, { type i18n } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

import { LANGUAGE_STORE_KEY, LANGUAGE_STORE_POSITION } from "./handle-language-storage";
import {
  DEFAULT_LANGUAGE,
  DEFAULT_LANGUAGE_NAMESPACE,
  SUPPORTED_LANGUAGE_NAMESPACES,
  SUPPORTED_LANGUAGES,
} from "./languages-options";

function getInstanceOfI18n(): i18n {
  const i18nInstance = i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (lang: string, namespace: string) => import(`../i18n/${lang}/${namespace}.json`),
      ),
    );

  void i18nInstance.init({
    debug: false,
    // lng: handleLanguageStorage().get(), // 使用浏览器语言检测而不是自定义获取
    supportedLngs: SUPPORTED_LANGUAGES,
    ns: SUPPORTED_LANGUAGE_NAMESPACES,
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: DEFAULT_LANGUAGE_NAMESPACE,
    detection: {
      order: ["navigator", "localStorage"], // 先检查浏览器语言, 然后检查 localStorage
      caches: [LANGUAGE_STORE_POSITION],
      lookupLocalStorage: LANGUAGE_STORE_KEY,
    },
  });

  return i18nInstance;
}

const i18nextInstance = getInstanceOfI18n();
export default i18nextInstance;
