import type { IAccountSignupParameter } from "@/modules/api/types/account-auth";
import { useCallback } from "react";
import { createZodSchema, useForm, zodResolver } from "venomous-ui";
import { z } from "zod";

export type SignupFormValue = IAccountSignupParameter;

const DEFAULT_SIGNUP_FORM_VALUE: SignupFormValue = {
  name: "",
  email: "",
  password: "",
};

export default function useSignupForm({
  defaultValues = DEFAULT_SIGNUP_FORM_VALUE,
}: {
  defaultValues?: SignupFormValue;
}) {
  const formSchemas = createZodSchema<SignupFormValue>()(
    z.object({
      name: z
        .string()
        .refine((val) => val === "" || val.length >= 4, { message: "NAME_TOO_SHORT" })
        .refine((val) => val.length <= 20, { message: "NAME_TOO_LONG" }),
      email: z.string().min(1, "EMAIL_IS_REQUIRED").email("EMAIL_IS_INVALID"),
      password: z.string().min(4, "PASSWORD_TOO_SHORT").max(20, "PASSWORD_TOO_LONG"),
    }),
  );

  const form = useForm<SignupFormValue>({
    mode: "all",
    resolver: zodResolver(formSchemas),
    defaultValues,
  });

  /**
   * - 在 email 有值時，自動填入到 name
   * - 但 email 验证失败時，则不自動填入到 name
   */
  const handleAutoSetNameValue = useCallback(() => {
    const email = form.getValues("email");
    const name = form.getValues("name");
    const emailError = form.formState.errors.email;
    if (email && (!name || name === "") && !emailError) {
      form.setValue("name", email, { shouldValidate: true });
    }
  }, [form]);

  return {
    form,
    handleAutoSetNameValue,
  };
}
