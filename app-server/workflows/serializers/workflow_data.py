import json

from rest_framework import serializers

from workflows.models.workflow_data import WorkflowDataModel


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
        view = self.context.get("view", None)
        action = getattr(view, "action", None)
        if action == "list":
            """Only list API excludes element field"""
            self.fields.pop("element", None)

    def create(self, validated_data):
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

    def validate_element(self, value):
        """
        Validate the field of element
        """
        if isinstance(value, dict):
            return json.dumps(value)
        elif isinstance(value, str):
            try:
                return value
            except json.JSONDecodeError as e:
                raise serializers.ValidationError("element must be a valid JSON string")
        else:
            raise serializers.ValidationError("element must be a dict or JSON string")
