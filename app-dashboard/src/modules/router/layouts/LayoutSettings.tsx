import { memo, type NamedExoticComponent } from "react";
import { AdminSettingsDrawer, AdminSettingsDrawerBlock, Icon, Text, useToast } from "venomous-ui";

import { useLanguage, useTranslation } from "@/modules/languages";
import { SUPPORTED_LANGUAGE_OPTIONS } from "@/modules/languages/helpers";

const LayoutSettings: NamedExoticComponent = memo(() => {
  const { t: tCommon, changeLanguage } = useTranslation("common");
  const { i18nLang } = useLanguage();

  const toast = useToast();

  return (
    <AdminSettingsDrawer
      width={300}
      title={tCommon("settings.title")}
      labelOfThemeMode={tCommon("settings.title-theme-mode")}
      labelOfThemePalettes={tCommon("settings.title-theme-palettes")}
      onChangeThemeMode={() =>
        toast({
          type: "success",
          title: tCommon("settings.theme-mode-change-success"),
        })
      }
      onChangeThemePalette={(paletteName) =>
        toast({
          type: "success",
          title: tCommon("settings.theme-palette-change-success"),
          description: paletteName,
        })
      }
    >
      <Text text={tCommon("settings.title-theme-languages")} isLabel />
      <AdminSettingsDrawerBlock
        items={Object.values(SUPPORTED_LANGUAGE_OPTIONS)}
        renderItem={(item) => <Icon icon={item.icon} width={32} />}
        isItemSelected={(item) => item.i18nLang === i18nLang}
        isItemDisabled={(item) => item.i18nLang === i18nLang}
        onItemClick={async (item) => {
          changeLanguage(item.i18nLang);
          return Promise.resolve();
        }}
      />
      <br />
    </AdminSettingsDrawer>
  );
});

LayoutSettings.displayName = "LayoutSettings";
export default LayoutSettings;
