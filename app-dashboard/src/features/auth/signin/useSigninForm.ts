import type { IAccountSigninParameter } from "@/modules/api/types/account-auth";
import { createZodSchema, useForm, zodResolver } from "venomous-ui";
import { z } from "zod";

export type SigninFormValue = IAccountSigninParameter;

const DEFAULT_SIGNIN_FORM_VALUE: SigninFormValue = {
  email: "",
  password: "",
};

export default function useSigninForm({
  defaultValues = DEFAULT_SIGNIN_FORM_VALUE,
}: {
  defaultValues?: SigninFormValue;
}) {
  const formSchemas = createZodSchema<SigninFormValue>()(
    z.object({
      email: z.string().min(1, "EMAIL_IS_REQUIRED").email("EMAIL_IS_INVALID"),
      password: z.string().min(4, "PASSWORD_TOO_SHORT").max(20, "PASSWORD_TOO_LONG"),
    }),
  );

  const form = useForm<SigninFormValue>({
    mode: "all",
    resolver: zodResolver(formSchemas),
    defaultValues: defaultValues,
  });

  return {
    form,
  };
}
