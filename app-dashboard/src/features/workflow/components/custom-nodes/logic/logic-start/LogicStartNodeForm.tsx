import { memo, useEffect, useMemo } from "react";
import {
  Button,
  createZodSchema,
  Flex,
  FormUncontrolled,
  Icon,
  InputUncontrolled,
  Modal,
  Paper,
  SelectUncontrolled,
  Text,
  useFieldArray,
  useForm,
  useModal,
  zodResolver,
} from "venomous-ui";
import z from "zod";

import { LOGIC_START_NODE } from "@/features/workflow/constants";
import { useNodePanelSelected } from "@/features/workflow/hooks";
import {
  LogicVariableType,
  type ILogicVariableItem,
} from "@/modules/api/types/workflow-logic-common";
import type { ILogicStartNodeFormValue } from "@/modules/api/types/workflow-logic-node-form-value";

import { useLanguage, useTranslation } from "@/modules/languages";

const LogicStartNodeForm = memo(() => {
  const { t: tCommon } = useTranslation("common");
  const { t: tWorkflow } = useTranslation("workflow");

  const editModalHandler = useModal();

  const { selectedNode, updateSelectedNodeFormValue, updateSelectedNodeData } =
    useNodePanelSelected<ILogicStartNodeFormValue>();

  const { form, variables, appendVariable, removeVariable } = useLogicStartNodeForm({
    defaultValues: selectedNode?.data?.formValue,
  });

  useEffect(() => {
    const unsub = form.subscribe({
      formState: { values: true, errors: true },
      callback: ({ values, errors }) => {
        const hasError = !!errors && Object.keys(errors).length > 0;
        updateSelectedNodeData({ isInValid: hasError });
        updateSelectedNodeFormValue(values);
      },
    });
    return () => unsub();
  }, [form, updateSelectedNodeData, updateSelectedNodeFormValue]);

  return (
    <FormUncontrolled
      formInstance={form}
      onSubmit={(formValue) => void updateSelectedNodeFormValue(formValue)}
    >
      <Flex gap={2} width={1}>
        {/* description */}
        <InputUncontrolled name="description" label={tWorkflow(`fields.description`)} fullWidth />

        {/* variables */}
        <Flex gap={0} width={1}>
          <Text text={tWorkflow(`info.variable-list`)} isLabel bold />
          <Flex width={1} sx={{ mb: "8px" }}>
            {form.watch("variables").map((variable) => (
              <Paper
                key={variable.id}
                isOutlined
                sx={{ width: 1, display: "flex", alignItems: "center" }}
              >
                <Icon icon="eos-icons:env" color="disabled" sx={{ ml: "8px", mr: "16px" }} />
                <Flex gap={0} width={1} alignItems="flex-start" justifyContent="space-between">
                  <Flex row>
                    <Text text={variable.name} bold textColor="primary" />
                    <Text text={variable.type} textColor="disabled" isLabel />
                  </Flex>
                  <Text text={variable.defaultValue} bold />
                </Flex>
              </Paper>
            ))}
          </Flex>
          {/* Open variables edit modal */}
          <Button
            text={tWorkflow("actions.edit-variables")}
            sx={{ width: 1 }}
            onClick={editModalHandler.openModal}
          />
        </Flex>

        {/* variables edit modal */}
        <Modal
          isOpen={editModalHandler.isOpen}
          closeModal={editModalHandler.closeModal}
          isPrevented={false}
        >
          {variables.map((variable, index) => {
            const realTimeVariableType = form.watch().variables.find((_, i) => i === index)?.type;
            return (
              <Flex key={variable.id} width={1} sx={{ mb: "8px", p: "8px" }}>
                <Flex row gap={0} width={1} alignItems="center" justifyContent="space-between">
                  {/* No */}
                  <Text text={`No.${index + 1}`} bold textColor="primary" isTitle />
                  {/* Delete condition */}
                  <Button
                    icon="solar:trash-bin-trash-line-duotone"
                    color="error"
                    isGhost
                    isCircle
                    onClick={() => removeVariable(index)}
                  />
                </Flex>

                <Flex row width={1} sx={{ alignItems: "flex-start" }}>
                  {/* variables.name */}
                  <InputUncontrolled
                    name={`variables[${index}].name`}
                    label={tWorkflow(`fields.${selectedNode.type}.variables.name`)}
                    fullWidth
                  />
                  {/* variables.type */}
                  <SelectUncontrolled
                    name={`variables[${index}].type`}
                    label={tWorkflow(`fields.${selectedNode.type}.variables.type`)}
                    fullWidth
                    options={LOGIC_START_NODE.VARIABLE_TYPE_OPTIONS}
                    emptyOptionMessage={tCommon("messages.NO_DATA")}
                  />
                </Flex>

                {/* variables.defaultValue */}
                {realTimeVariableType !== LogicVariableType.Boolean && (
                  <InputUncontrolled
                    name={`variables[${index}].defaultValue`}
                    label={tWorkflow(`fields.${selectedNode.type}.variables.defaultValue`)}
                    fullWidth
                  />
                )}
                {realTimeVariableType === LogicVariableType.Boolean && (
                  <SelectUncontrolled
                    name={`variables[${index}].defaultValue`}
                    label={tWorkflow(`fields.${selectedNode.type}.variables.defaultValue`)}
                    fullWidth
                    options={[
                      {
                        label: "true",
                        value: "true",
                      },
                      {
                        label: "false",
                        value: "false",
                      },
                    ]}
                  />
                )}
              </Flex>
            );
          })}

          {/* Add variable */}
          <Button
            icon="material-symbols:add-rounded"
            text={tWorkflow(`fields.${selectedNode.type}.variables.variable`)}
            onClick={() => appendVariable()}
            sx={{ mt: "8px", mb: "24px", width: 1 }}
          />
        </Modal>
      </Flex>
    </FormUncontrolled>
  );
});

LogicStartNodeForm.displayName = "LogicStartNodeForm";
export default LogicStartNodeForm;

function useLogicStartNodeForm({
  defaultValues = LOGIC_START_NODE.DEFAULT_FORM_VALUE,
}: {
  defaultValues?: ILogicStartNodeFormValue;
}) {
  const { i18nLang } = useLanguage();
  const { t: tCommon } = useTranslation("common");

  // Zod Schema
  const formSchemas = useMemo(() => {
    return createZodSchema<ILogicStartNodeFormValue>()(
      z.object({
        description: z.string().min(1, { message: tCommon("validations.REQUIRED") }),
        variables: z.array(
          z.object({
            id: z.string().min(1, { message: tCommon("validations.REQUIRED") }),
            name: z.string().min(1, { message: tCommon("validations.REQUIRED") }),
            type: z.nativeEnum(LogicVariableType),
            defaultValue: z
              .string()
              .min(1, { message: tCommon("validations.REQUIRED") })
              .transform((value) => value.trim()),
          }),
        ),
        // autoExcute: z.boolean(),
        // autoExcuteInterval: z.enum(["week", "day", "hour"]).optional(),
        // autoExcuteIntervalValue: z.number().int().min(1, { message: tCommon("validations.REQUIRED") }).optional(),
      }),
    );
  }, [tCommon, i18nLang]);

  const form = useForm<ILogicStartNodeFormValue>({
    mode: "all",
    resolver: zodResolver(formSchemas),
    defaultValues,
  });

  useEffect(() => {
    void form.trigger();
  }, [form, i18nLang]);

  const {
    fields: variables,
    remove,
    append,
  } = useFieldArray({
    control: form.control,
    name: "variables",
  });

  const appendVariable = () => {
    const newVariable: ILogicVariableItem = {
      id: crypto.randomUUID(),
      name: "",
      type: LogicVariableType.String,
      defaultValue: "",
    };
    append(newVariable);
    void form.trigger();
  };

  const removeVariable = (index: number) => {
    remove(index);
    void form.trigger();
  };

  return {
    form,
    variables,
    appendVariable,
    removeVariable,
  };
}
