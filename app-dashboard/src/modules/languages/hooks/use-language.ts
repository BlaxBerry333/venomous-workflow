import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGE_OPTIONS, type ISupportedLanguage } from "../helpers";

export default function useLanguage() {
  const { i18n } = useTranslation();

  const currentI18nLanguage = i18n.language as ISupportedLanguage;
  const currentDayjsLocale = SUPPORTED_LANGUAGE_OPTIONS[currentI18nLanguage].dayjsLocale;
  const currentFlagIcon = SUPPORTED_LANGUAGE_OPTIONS[currentI18nLanguage].icon;

  return {
    i18nLang: currentI18nLanguage,
    dayjsLang: currentDayjsLocale,
    flagIcon: currentFlagIcon,
  };
}
