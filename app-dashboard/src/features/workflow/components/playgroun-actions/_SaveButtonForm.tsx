import { memo, useEffect, useMemo, type NamedExoticComponent } from "react";
import {
  Button,
  createZodSchema,
  Flex,
  FormUncontrolled,
  InputUncontrolled,
  SwitchUncontrolled,
  useForm,
  zodResolver,
} from "venomous-ui";
import { z } from "zod";

import { WORKFLOW_DATA_DEFAULT_INFO } from "@/features/workflow/constants";
import { useWorkflowDataDetail } from "@/modules/api/hooks/workflow-data";
import type { IWorkflowDataInfo } from "@/modules/api/types/workflow-data";
import { useLanguage, useTranslation } from "@/modules/languages";

export type SaveButtonFormValue = Pick<IWorkflowDataInfo, "name" | "description" | "isActive">;

const SaveButtonForm: NamedExoticComponent<{
  isSubmitting: boolean;
  handleOnSubmit: (formValue: SaveButtonFormValue) => Promise<void>;
  handleOnCancel: () => void;
}> = memo(({ isSubmitting, handleOnSubmit, handleOnCancel }) => {
  const { t: tCommon } = useTranslation("common");
  const { t: tWorkflow } = useTranslation("workflow");

  const { form } = useSaveButtonForm();
  const {
    formState: { errors, isValid },
    reset,
    trigger,
  } = form;

  const isDisabledSubmit = !isValid || Object.keys(errors).length > 0;

  return (
    <FormUncontrolled formInstance={form} onSubmit={(formValue) => void handleOnSubmit(formValue)}>
      <Flex>
        {/* name */}
        <InputUncontrolled name="name" label={tWorkflow("info.name")} fullWidth />
        {/* description */}
        <InputUncontrolled
          name="description"
          label={tWorkflow("info.description")}
          fullWidth
          multiline
          rows={2}
        />
        {/* isActive */}
        <SwitchUncontrolled name="isActive" startLabel={tWorkflow("info.isActive")} />
      </Flex>

      <Flex row sx={{ justifyContent: "flex-end", mt: "16px" }}>
        <Button
          type="reset"
          text={tCommon("actions.cancel")}
          isOutlined
          disabled={isSubmitting}
          onClick={() => {
            reset(form.formState.defaultValues);
            void trigger();
            handleOnCancel();
          }}
        />
        <Button
          type="submit"
          text={tCommon("actions.confirm")}
          loading={isSubmitting}
          disabled={isDisabledSubmit}
        />
      </Flex>
    </FormUncontrolled>
  );
});

SaveButtonForm.displayName = "SaveButtonForm";
export default SaveButtonForm;

function useSaveButtonForm() {
  const { data: worfklowDataDetail } = useWorkflowDataDetail();

  const { i18nLang } = useLanguage();
  const { t: tCommon } = useTranslation("common");

  const formSchemas = useMemo(() => {
    return createZodSchema<SaveButtonFormValue>()(
      z.object({
        name: z.string().min(1, tCommon("validations.REQUIRED")),
        description: z.string().min(1, tCommon("validations.REQUIRED")),
        isActive: z.boolean(),
      }),
    );
  }, [tCommon, i18nLang]);

  const form = useForm<SaveButtonFormValue>({
    mode: "all",
    resolver: zodResolver(formSchemas),
    defaultValues: worfklowDataDetail || WORKFLOW_DATA_DEFAULT_INFO,
  });

  useEffect(() => {
    void form.trigger();
  }, [form, i18nLang]);

  return {
    form,
  };
}
