import { memo, useCallback, type NamedExoticComponent } from "react";
import { LazyImage, Text } from "venomous-ui";

import { BASIC_CONFIGS } from "@/configs";
import { useRouteNavigate } from "../hooks";
import LOGO from "/favicon.svg";

const LayoutHeaderLogo: NamedExoticComponent<{ to: string }> = memo(({ to = "/" }) => {
  const router = useRouteNavigate();
  const navigateToHome = useCallback(() => {
    router.push(to);
  }, [router, to]);

  return (
    <>
      {/* Logo Image */}
      <LazyImage src={LOGO} alt="logo" width={28} onClick={navigateToHome} />

      {/* Title */}
      <Text
        isTitle
        titleLevel="h5"
        ellipsis
        text={BASIC_CONFIGS.APP_SERIES_NAME.slice(1)}
        sx={{ transform: "translate(-1px, 1px)" }}
        onClick={navigateToHome}
      />
    </>
  );
});

LayoutHeaderLogo.displayName = "LayoutHeaderLogo";
export default LayoutHeaderLogo;
