import { SignupForm } from "@/features/auth/signup";
import type { SignupFormValue } from "@/features/auth/signup/useSignupForm";
import { useAccountSignup } from "@/modules/api/hooks/account-auth";
import { useRouteNavigate } from "@/modules/router/hooks";
import { AuthRouteLayoutTitle } from "@/modules/router/layouts";
import ROUTE_PATHS from "@/modules/router/paths";
import { memo, useCallback, type NamedExoticComponent } from "react";
import { useToast } from "venomous-ui";

const AuthSignupView: NamedExoticComponent = memo(() => {
  const { mutateAsync: signup, isPending: isSigningin } = useAccountSignup();

  const toast = useToast();
  const { replace } = useRouteNavigate();

  const handleOnSubmit = useCallback(
    async (formValue: SignupFormValue) => {
      await signup(formValue)
        .then(() => {
          toast({ type: "success", title: "注册成功", description: "欢迎注册" });
          replace(ROUTE_PATHS.ADMIN.ROOT);
        })
        .catch((error) => {
          toast({ type: "error", title: "注册失败", description: error.message });
        });
    },
    [replace, signup, toast],
  );

  return (
    <>
      <AuthRouteLayoutTitle
        title="用户注册"
        subtitle=""
        subTitleExtraText="已经有账号了?"
        subTitleExtraUrl="/auth/signin"
      />

      <SignupForm isSubmitting={isSigningin} handleOnSubmit={handleOnSubmit} />
    </>
  );
});

AuthSignupView.displayName = "AuthSignupView";
export default AuthSignupView;
