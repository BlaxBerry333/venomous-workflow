import { SigninForm } from "@/features/auth/signin";
import type { SigninFormValue } from "@/features/auth/signin/useSigninForm";
import { useAccountSignin } from "@/modules/api/hooks/account-auth";
import { useRouteNavigate } from "@/modules/router/hooks";
import { AuthRouteLayoutTitle } from "@/modules/router/layouts";
import ROUTE_PATHS from "@/modules/router/paths";
import { memo, useCallback, type NamedExoticComponent } from "react";
import { useToast } from "venomous-ui";

const AuthSigninView: NamedExoticComponent = memo(() => {
  const { mutateAsync: signin, isPending: isSigningin } = useAccountSignin();

  const { replace } = useRouteNavigate();
  const toast = useToast();

  const handleOnSubmit = useCallback(
    async (formValue: SigninFormValue) => {
      await signin(formValue)
        .then(() => {
          toast({ type: "success", title: "登陆成功", description: "欢迎回来" });
          replace(ROUTE_PATHS.ADMIN.ROOT);
        })
        .catch((error) => {
          toast({ type: "error", title: "登陆失败", description: error.message });
        });
    },
    [replace, signin, toast],
  );

  return (
    <>
      <AuthRouteLayoutTitle
        title="用户登陆"
        subtitle="没有账号?"
        subTitleExtraText="创建一个新账号!"
        subTitleExtraUrl="/auth/signup"
      />

      <SigninForm isSubmitting={isSigningin} handleOnSubmit={handleOnSubmit} />
    </>
  );
});

AuthSigninView.displayName = "AuthSigninView";
export default AuthSigninView;
