import { memo, type NamedExoticComponent, type PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";

import { dayjsInstance, i18nextInstance } from "../helpers";
import { useLanguage } from "../hooks";

const LanguageProvider: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  const { dayjsLang } = useLanguage();
  dayjsInstance.locale(dayjsLang);

  return <I18nextProvider i18n={i18nextInstance}>{children}</I18nextProvider>;
});

export default LanguageProvider;
