export const SUPPORTED_LANGUAGES = [
  "en", // English
  "ja", // Japanese
  "zh", // Chinese
  // "fr", // French
  // "de", // German
  // "es", // Spanish
  // "it", // Italian
] as const;

export type ISupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export const DEFAULT_LANGUAGE: ISupportedLanguage = SUPPORTED_LANGUAGES[0];

export const SUPPORTED_LANGUAGE_NAMESPACES = ["common", "auth", "admin", "errors"] as const;

export type ISupportedLanguageNamespace = (typeof SUPPORTED_LANGUAGE_NAMESPACES)[number];
export const DEFAULT_LANGUAGE_NAMESPACE: ISupportedLanguageNamespace =
  SUPPORTED_LANGUAGE_NAMESPACES[0];

export const SUPPORTED_DAYJS_LOCALES = {
  en: "en", // English
  ja: "ja", // Japanese
  zh: "zh-cn", // Chinese
  // fr: "fr", // French
  // vi: "vi", // Vietnamese
} as const;

export type ISupportedDayjsLocale =
  (typeof SUPPORTED_DAYJS_LOCALES)[keyof typeof SUPPORTED_DAYJS_LOCALES];
export const DEFAULT_DAYJS_LOCALE: ISupportedDayjsLocale = SUPPORTED_DAYJS_LOCALES["en"];

export const SUPPORTED_LANGUAGE_OPTIONS: Record<
  ISupportedLanguage,
  {
    label: string;
    emoji: string;
    icon: string;
    i18nLang: ISupportedLanguage;
    dayjsLocale: ISupportedDayjsLocale;
  }
> = {
  en: {
    label: "English",
    emoji: "🇬🇧",
    icon: "flag:gb-4x3",
    i18nLang: "en",
    dayjsLocale: SUPPORTED_DAYJS_LOCALES["en"],
  },
  ja: {
    label: "日本語",
    emoji: "🇯🇵",
    icon: "flag:jp-4x3",
    i18nLang: "ja",
    dayjsLocale: SUPPORTED_DAYJS_LOCALES["ja"],
  },
  zh: {
    label: "简体中文",
    emoji: "🇨🇳",
    icon: "flag:cn-4x3",
    i18nLang: "zh",
    dayjsLocale: SUPPORTED_DAYJS_LOCALES["zh"],
  },
};
