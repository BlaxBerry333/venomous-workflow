import { handleWebStorage } from "@/modules/tools";
import { DEFAULT_LANGUAGE, type ISupportedLanguage } from "./languages-options";

export const LANGUAGE_STORE_POSITION = "localStorage" as const;
export const LANGUAGE_STORE_KEY = "__I18N_LANGUAGE__" as const;

const {
  get: getLang,
  set: setLang,
  remove: removeLang,
} = handleWebStorage(LANGUAGE_STORE_POSITION);

export default function handleLanguageStorage() {
  return {
    get: (): ISupportedLanguage => {
      return getLang(LANGUAGE_STORE_KEY, { defaultValue: DEFAULT_LANGUAGE });
    },
    set: (lang: ISupportedLanguage): void => {
      setLang(LANGUAGE_STORE_KEY, lang);
    },
    remove: (): void => {
      removeLang(LANGUAGE_STORE_KEY);
    },
  };
}
