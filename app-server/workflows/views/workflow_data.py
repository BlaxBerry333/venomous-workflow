from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response

from accounts.models.custom_user import CustomUserModel
from workflows.models.workflow_data import WorkflowDataModel
from workflows.serializers.workflow_data import WorkflowDataSerializer


class WorkflowDataViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Workflow Data
    """

    queryset = WorkflowDataModel.objects.all()
    serializer_class = WorkflowDataSerializer
    lookup_field = "id"

    def get_queryset(self):
        """
        Get workflow data queryset based on user_id
        """
        user_id = self.kwargs.get("user_id")
        if user_id:
            return WorkflowDataModel.objects.filter(user=user_id)
        return WorkflowDataModel.objects.none()

    def perform_create(self, serializer):
        """
        Perform create operation with additional validation
        """
        user_id = self.kwargs.get("user_id")
        user = get_object_or_404(CustomUserModel, id=user_id)
        serializer.save(user=user)

    def get_object(self):
        """
        Get workflow data object based on user_id and pk
        """
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, **{self.lookup_field: self.kwargs.get("pk")})
        return obj

    def list(self, request, *args, **kwargs):
        """
        List workflow data based on user_id
        """
        user_id = kwargs.get("user_id")
        if not user_id:
            return Response(
                {"error": "User ID is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        is_exist = CustomUserModel.objects.filter(id=user_id).exists()
        if not is_exist:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        """
        Create workflow data
        """
        user_id = kwargs.get("user_id")
        if not user_id:
            return Response(
                {"error": "User ID is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().create(request, *args, **kwargs)
