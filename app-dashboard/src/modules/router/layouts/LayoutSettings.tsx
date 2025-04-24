import { memo, type NamedExoticComponent, type PropsWithChildren } from "react";
import { AdminSettingsDrawer } from "venomous-ui";

const LayoutSettings: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  return (
    <AdminSettingsDrawer
      title="设置"
      labelOfThemeMode="主题模式"
      labelOfThemePalettes="主题色"
      width={300}
    >
      {children}
    </AdminSettingsDrawer>
  );
});

LayoutSettings.displayName = "LayoutSettings";
export default LayoutSettings;
