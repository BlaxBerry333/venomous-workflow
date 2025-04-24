import {
  memo,
  Suspense,
  useEffect,
  type NamedExoticComponent,
  type PropsWithChildren,
} from "react";
import { Container, Flex, Loading } from "venomous-ui";
import LayoutBackgroundImage from "../LayoutBackgroundImage";
import AdminRouteLayoutHeader from "./AdminRouteLayoutHeader";
import RouteAdminLayoutSideNavMenu from "./AdminRouteLayoutSideNavMenu";

const AdminRouteLayout: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.height = "100svh";
      root.style.width = "100svw";
      root.style.minWidth = "768px"; // iPad
      root.style.overflow = "hidden";
    }
    return () => {
      if (root) {
        root.style.height = "";
        root.style.width = "";
        root.style.minWidth = "";
        root.style.overflow = "";
      }
    };
  }, []);

  return (
    <Container maxWidth="xl">
      {/* Background Image */}
      <LayoutBackgroundImage />

      <Flex row alignItems="flex-start" p="4px" gap={0.5}>
        {/* Side Nav Menu */}
        <RouteAdminLayoutSideNavMenu />

        <Flex flex={1} sx={{ position: "relative" }}>
          {/* Header */}
          <AdminRouteLayoutHeader />

          {/* Content */}
          <div
            style={{
              overflow: "scroll",
              scrollBehavior: "smooth",
              width: "100%",
              height: "calc(100svh - 68px)",
            }}
          >
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </Flex>
      </Flex>
    </Container>
  );
});

AdminRouteLayout.displayName = "AdminRouteLayout";
export default AdminRouteLayout;
