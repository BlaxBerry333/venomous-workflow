import { memo, type NamedExoticComponent } from "react";
import AuthSignupView from "./view";

const AuthSignupPage: NamedExoticComponent = memo(() => {
  return <AuthSignupView />;
});

AuthSignupPage.displayName = "AuthSignupPage";
export default AuthSignupPage;
