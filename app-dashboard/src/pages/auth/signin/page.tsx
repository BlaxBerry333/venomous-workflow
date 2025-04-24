import { memo, type NamedExoticComponent } from "react";
import AuthSigninView from "./view";

const AuthSigninPage: NamedExoticComponent = memo(() => {
  return <AuthSigninView />;
});

AuthSigninPage.displayName = "AuthSigninPage";
export default AuthSigninPage;
