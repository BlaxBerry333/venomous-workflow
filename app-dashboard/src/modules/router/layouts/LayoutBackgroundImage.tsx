import { memo, type NamedExoticComponent } from "react";
import { LazyImage } from "venomous-ui";

const LayoutBackgroundImage: NamedExoticComponent = memo(() => {
  return (
    <LazyImage
      src="/static/backgrounds/bg-auth.avif"
      alt="background"
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: -1,
        filter: "blur(2px)",
      }}
    />
  );
});

LayoutBackgroundImage.displayName = "LayoutBackgroundImage";
export default LayoutBackgroundImage;
