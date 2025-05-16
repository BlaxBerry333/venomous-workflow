import { memo, type NamedExoticComponent } from "react";
import {
  FormUncontrolled,
  FormUncontrolledAction,
  InputUncontrolled,
  PasswordUncontrolled,
} from "venomous-ui";

import { useTranslation } from "@/modules/languages";
import useSigninForm, { type SigninFormValue } from "./useSigninForm";

type SigninFormProps = {
  isSubmitting: boolean;
  handleOnSubmit: (formValue: SigninFormValue) => Promise<void>;
  defaultValues?: SigninFormValue;
};

const SigninForm: NamedExoticComponent<SigninFormProps> = memo(
  ({ defaultValues, handleOnSubmit, isSubmitting }) => {
    const { t: tCommon } = useTranslation("common");
    const { t: tAuth } = useTranslation("auth");

    const { form } = useSigninForm({ defaultValues });

    return (
      <FormUncontrolled
        formInstance={form}
        onSubmit={(formValue) => void handleOnSubmit(formValue)}
      >
        {/* name */}
        <InputUncontrolled name="email" label={tAuth("form-labels.email")} fullWidth />

        {/* password */}
        <PasswordUncontrolled name="password" label={tAuth("form-labels.password")} fullWidth />

        <FormUncontrolledAction
          cancelButtonText={tCommon("actions.reset")}
          submitButtonText={tCommon("actions.confirm")}
          isSubmitting={isSubmitting}
        />
      </FormUncontrolled>
    );
  },
);

SigninForm.displayName = "SigninForm";
export default SigninForm;
