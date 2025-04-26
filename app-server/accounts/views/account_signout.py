from django.contrib.auth import logout
from django.core.cache import cache
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
import logging
from ..common.constants import REDIS_ACCOUNT_USERS_KEY

logger = logging.getLogger(__name__)


class AccountSignoutView(APIView):
    """
    Account Signout View

    Supported methods:
    - POST /api/account/signout/
    """

    permission_classes = [permissions.AllowAny]

    def post(self, request):
        if not request.user.is_authenticated:
            return Response(
                {"error": "User is not authenticated."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            # 清除 Redis 中的用户缓存
            # 缓存清除失败不影响登出流程，但需要记录日志
            try:
                cache.hdel(REDIS_ACCOUNT_USERS_KEY, str(request.user.id))
            except Exception as cache_err:
                logger.error(
                    f"Failed to clear cache for user {request.user.id}: {str(cache_err)}"
                )

            # 使用 Django 自带的退出逻辑
            # Django 自带的 logout 方法会清除 session
            try:
                logout(request)
            except Exception as logout_err:
                logger.error(
                    f"Failed to logout user {request.user.id}: {str(logout_err)}"
                )
                return Response(
                    {"error": "Failed to signout."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

            return Response(
                {"message": "Successfully signout."},
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            logger.error(f"System error during signout: {str(e)}")
            return Response(
                {"error": "System error during signout."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
