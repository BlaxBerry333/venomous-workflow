import json

from rest_framework import serializers

from workflows.models.workflow_data import WorkflowDataModel
from workflows.common import validate_node_data

__all__ = ["WorkflowDataSerializer"]


class WorkflowDataSerializer(serializers.ModelSerializer):
    """
    Serializer for Workflow Data
    """

    class Meta:
        model = WorkflowDataModel
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        view = self.context.get("view")
        action = getattr(view, "action", None)
        # Exclude 'element' field in list API responses
        if action == "list":
            self.fields.pop("element", None)

    # def create(self, validated_data):
    #     return super().create(validated_data)

    # def update(self, instance, validated_data):
    #     return super().update(instance, validated_data)

    def validate(self, data):
        """
        Validate all field
        """
        view = self.context.get("view")
        action = getattr(view, "action", None)
        # Only validate create API
        if action == "create":
            user_id = view.kwargs.get("user_id") if view else None
            if not user_id:
                raise serializers.ValidationError("User ID is required.")
            # Validate Max Amount of workflow
            total_instances = WorkflowDataModel.objects.filter(user_id=user_id).count()
            max_count = WorkflowDataModel.MAX_AMOUNT_OF_INSTANCE
            if total_instances >= max_count:
                raise serializers.ValidationError(
                    f"Number of workflow instances per user cannot exceed {max_count}"
                )
        return data

    def validate_element(self, value):
        """
        Validate the field of element
        """
        # Parse JSON string
        if not isinstance(value, str):
            raise serializers.ValidationError("'element' must be a JSON string")
        try:
            element = json.loads(value)
        except json.JSONDecodeError:
            raise serializers.ValidationError("'element' must be a valid JSON string")

        # Validate structure
        if "nodes" not in element:
            raise serializers.ValidationError("'element' must contain 'nodes' property")

        # Validate data type
        nodes = element["nodes"]
        if not isinstance(nodes, list):
            raise serializers.ValidationError("'nodes' must be a list")

        # Validate Max Amount
        max_amount_of_nodes = WorkflowDataModel.MAX_AMOUNT_OF_ELEMENT_NODES
        if len(nodes) > max_amount_of_nodes:
            raise serializers.ValidationError(
                f"Number of nodes cannot exceed {max_amount_of_nodes}"
            )

        # Validate structure of each node
        for node in nodes:
            validate_node_data(node)

        return value
