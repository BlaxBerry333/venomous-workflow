import { useCallback } from "react";
import { useTranslation as i18nUseTranslation } from "react-i18next";
import { useToast } from "venomous-ui";

import {
  SUPPORTED_LANGUAGE_OPTIONS,
  SUPPORTED_LANGUAGES,
  type ISupportedLanguage,
  type ISupportedLanguageNamespace,
} from "../helpers";

export default function useTranslation(namespace?: ISupportedLanguageNamespace) {
  const toast = useToast();
  const { t, i18n } = i18nUseTranslation(namespace);

  const changeLanguage = useCallback(
    (lang: ISupportedLanguage) => {
      if (SUPPORTED_LANGUAGES.includes(lang)) {
        const { emoji, label } = SUPPORTED_LANGUAGE_OPTIONS[lang];
        i18n
          .changeLanguage(lang)
          .then(() => {
            toast({
              type: "success",
              title: t("settings.languages-change-success"),
              description: `${emoji} ${label}`,
            });
          })
          .catch((error) =>
            toast({
              type: "error",
              title: t("settings.languages-change-failed"),
              description: error.message,
            }),
          );
      }
    },
    [i18n, toast, t],
  );

  return {
    t,
    changeLanguage,
  };
}
