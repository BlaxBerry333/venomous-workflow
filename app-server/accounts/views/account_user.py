import logging
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from ..models import CustomUserModel
from ..serializers import AccountUserSerializer

logger = logging.getLogger(__name__)


class AccountUserViewSet(viewsets.ModelViewSet):
    """
    Account User ViewSet

    Supported methods:
    - GET /api/account/users/
    - POST /api/account/users/
    - GET /api/account/users/{id}/
    - PUT /api/account/users/{id}/
    - DELETE /api/account/users/{id}/
    """

    queryset = CustomUserModel.objects.all()
    serializer_class = AccountUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()

        return queryset
