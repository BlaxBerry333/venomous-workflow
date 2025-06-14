import { memo, type NamedExoticComponent } from "react";
import {
  Flex,
  FormUncontrolled,
  FormUncontrolledAction,
  InputUncontrolled,
  PasswordUncontrolled,
} from "venomous-ui";

import { useTranslation } from "@/modules/languages";
import type { SignupFormValue } from "./useSignupForm";
import useSignupForm from "./useSignupForm";

type SignupFormProps = {
  isSubmitting: boolean;
  handleOnSubmit: (formValue: SignupFormValue) => Promise<void>;
  defaultValues?: SignupFormValue;
};

const SignupForm: NamedExoticComponent<SignupFormProps> = memo(
  ({ defaultValues, handleOnSubmit, isSubmitting }) => {
    const { t: tCommon } = useTranslation("common");
    const { t: tAuth } = useTranslation("auth");

    const { form, handleAutoSetNameValue } = useSignupForm({ defaultValues });

    return (
      <FormUncontrolled
        formInstance={form}
        onSubmit={(formValue) => void handleOnSubmit(formValue)}
      >
        <Flex gap={2}>
          {/* name */}
          <div onBlur={handleAutoSetNameValue} style={{ width: "100%" }}>
            <InputUncontrolled name="name" label={tAuth("form-labels.name")} fullWidth />
          </div>

          {/* email */}
          <div onBlur={handleAutoSetNameValue} style={{ width: "100%" }}>
            <InputUncontrolled name="email" label={tAuth("form-labels.email")} fullWidth />
          </div>

          {/* password */}
          <PasswordUncontrolled name="password" label={tAuth("form-labels.password")} fullWidth />
          <PasswordUncontrolled
            name="passwordConfirm"
            label={tAuth("form-labels.password-confirm")}
            fullWidth
          />

          <FormUncontrolledAction
            cancelButtonText={tCommon("actions.reset")}
            submitButtonText={tCommon("actions.confirm")}
            isSubmitting={isSubmitting}
          />
        </Flex>
      </FormUncontrolled>
    );
  },
);

SignupForm.displayName = "SignupForm";
export default SignupForm;
