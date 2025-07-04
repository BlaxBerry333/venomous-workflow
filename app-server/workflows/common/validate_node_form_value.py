from rest_framework import serializers

from .supported_node_logic import (
    SUPPORTED_LOGIC_VARIABLE_TYPE,
    SUPPORTED_LOGIC_CONDITION_TYPE,
    SUPPORTED_LOGIC_OPERATOR,
)
from .supported_node_type import SupportedNodeType


__all__ = ["validate_node_data"]


def validate_node_data(node) -> None:
    if "id" not in node or node["id"] is None:
        raise serializers.ValidationError("node must contain 'id' property")
    if "type" not in node or node["type"] is None:
        raise serializers.ValidationError("node must contain 'type' property")
    if "data" not in node or node["data"] is None:
        raise serializers.ValidationError("node must contain 'data' property")

    node_id = node["id"]
    node_type = node["type"]
    node_data = node["data"]

    if node_type not in SupportedNodeType.values:
        raise serializers.ValidationError(
            f"Unsupported node type '{node_type}' for node #{node_id}"
        )

    if node_type not in [SupportedNodeType.Group, SupportedNodeType.LogicEnd]:
        form_value = node_data.get("formValue")
        if not isinstance(form_value, dict):
            raise serializers.ValidationError(
                f"{node_type} #{node_id} 'formValue' must be an object"
            )

    if node_type == SupportedNodeType.Group:
        _validate_group_node(node_id, node_data)
    elif node_type == SupportedNodeType.LogicStart:
        _validate_logic_start_node(node_id, node_data)
    elif node_type == SupportedNodeType.LogicEnd:
        _validate_logic_end_node(node_id, node_data)
    elif node_type == SupportedNodeType.LogicCondition:
        _validate_logic_condition_node(node_id, node_data)
    elif node_type == SupportedNodeType.LogicDatasetInput:
        _validate_logic_dataset_input_node(node_id, node_data)
    elif node_type == SupportedNodeType.LogicDatasetOutput:
        _validate_logic_dataset_output_node(node_id, node_data)
    else:
        pass


def _validate_group_node(node_id, node_data) -> None:
    """
    Validate structure of GroupNode.data.formValue
    """
    # do nothing
    pass


def _validate_logic_start_node(node_id, node_data) -> None:
    """
    Validate structure of LogicStart.data.formValue
    """
    form_value = node_data["formValue"]
    # description
    if "description" not in form_value or not isinstance(
        form_value["description"], str
    ):
        raise serializers.ValidationError(
            f"LogicStart #{node_id} must contain 'description' as string"
        )
    # variables
    if "variables" not in form_value:
        raise serializers.ValidationError(
            f"LogicStart #{node_id} must contain 'variables' property"
        )
    variables = form_value["variables"]
    if not isinstance(variables, list):
        raise serializers.ValidationError(
            f"'variables' of LogicStart #{node_id} must be a list"
        )
    for var in variables:
        if "id" not in var or not isinstance(var["id"], str):
            raise serializers.ValidationError(
                f"Each variable in LogicStart #{node_id} must have 'id' as string"
            )
        if "name" not in var or not isinstance(var["name"], str):
            raise serializers.ValidationError(
                f"Each variable in LogicStart #{node_id} must have 'name' as string"
            )
        if "type" not in var or var["type"] not in SUPPORTED_LOGIC_VARIABLE_TYPE:
            raise serializers.ValidationError(
                f"'type' of variable in LogicStart #{node_id} must be one of {SUPPORTED_LOGIC_VARIABLE_TYPE}"
            )
        if "defaultValue" not in var or not isinstance(var["defaultValue"], str):
            raise serializers.ValidationError(
                f"'defaultValue' of variable in LogicStart #{node_id} must be a string"
            )


def _validate_logic_end_node(node_id, node_data) -> None:
    """
    Validate structure of LogicEnd.data.formValue
    """
    # do nothing
    pass


def _validate_logic_condition_node(node_id, node_data) -> None:
    """
    Validate structure of LogicCondition.data.formValue
    """
    form_value = node_data["formValue"]
    # description
    if "description" not in form_value or not isinstance(
        form_value["description"], str
    ):
        raise serializers.ValidationError(
            f"LogicCondition #{node_id} must contain 'description' as string"
        )
    # conditions
    if "conditions" not in form_value:
        raise serializers.ValidationError(
            f"LogicCondition #{node_id} must contain 'conditions' property"
        )
    conditions = form_value["conditions"]
    if not isinstance(conditions, list):
        raise serializers.ValidationError(
            f"'conditions' of LogicCondition #{node_id} must be a list"
        )
    for cond in conditions:
        if not isinstance(cond, dict):
            raise serializers.ValidationError(
                f"Each condition in LogicCondition #{node_id} must be an object"
            )
        if "id" not in cond or not isinstance(cond["id"], str):
            raise serializers.ValidationError(
                f"Each condition in LogicCondition #{node_id} must have 'id' as string"
            )
        if "type" not in cond or cond["type"] not in SUPPORTED_LOGIC_CONDITION_TYPE:
            raise serializers.ValidationError(
                f"'type' of condition in LogicCondition #{node_id} must be one of {SUPPORTED_LOGIC_CONDITION_TYPE}"
            )
        operator = cond.get("operator")
        if operator is not None and operator not in SUPPORTED_LOGIC_OPERATOR:
            raise serializers.ValidationError(
                f"'operator' of condition in LogicCondition #{node_id} must be one of {SUPPORTED_LOGIC_OPERATOR}"
            )
        variable = cond.get("variable")
        if variable is not None and not isinstance(variable, str):
            raise serializers.ValidationError(
                f"'variable' of condition in LogicCondition #{node_id} must be a string if provided"
            )
        value = cond.get("value")
        if value is not None and not isinstance(value, str):
            raise serializers.ValidationError(
                f"'value' of condition in LogicCondition #{node_id} must be a string if provided"
            )


def _validate_logic_dataset_input_node(node_id, node_data) -> None:
    """
    Validate structure of LogicDatasetInput.data.formValue
    """
    form_value = node_data["formValue"]
    # description
    if "description" not in form_value or not isinstance(
        form_value["description"], str
    ):
        raise serializers.ValidationError(
            f"LogicDatasetInput #{node_id} must contain 'description' as string"
        )


def _validate_logic_dataset_output_node(node_id, node_data) -> None:
    """
    Validate structure of LogicDatasetOutput.data.formValue
    """
    form_value = node_data["formValue"]
    # description
    if "description" not in form_value or not isinstance(
        form_value["description"], str
    ):
        raise serializers.ValidationError(
            f"LogicDatasetOutput #{node_id} must contain 'description' as string"
        )
