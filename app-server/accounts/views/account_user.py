from django.core.cache import cache
from rest_framework import viewsets, permissions
from rest_framework.response import Response
import logging
from ..models import CustomUserModel
from ..serializers import AccountUserSerializer
from ..common.constants import REDIS_ACCOUNT_USERS_KEY

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

        try:
            # 从缓存中获取所有在线用户状态
            online_users = cache.hgetall(REDIS_ACCOUNT_USERS_KEY)
        except Exception as e:
            logger.error(f"Failed to get online users from cache: {str(e)}")
            online_users = {}

        # 给每个用户添加 is_online 属性属性
        for user in queryset:
            user.is_online = str(user.id) in online_users

        return queryset
