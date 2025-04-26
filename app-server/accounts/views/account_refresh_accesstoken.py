from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.core.cache import cache
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
from rest_framework.throttling import UserRateThrottle
import logging

logger = logging.getLogger(__name__)


class AccountRefreshAccessTokenView(APIView):
    """
    Account Refresh Access Token View

    Supported methods:
    - POST /api/account/refresh-accesstoken/
    """

    permission_classes = [permissions.AllowAny]
    throttle_classes = [UserRateThrottle]

    def post(self, request):
        refresh_token = request.data.get("refresh_token")
        if not refresh_token:
            return Response(
                {"error": "Refresh token is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # 验证并解析刷新令牌
            refresh = RefreshToken(refresh_token)
            user = refresh.user
            # 检查用户是否已被禁用
            if not user.is_active:
                return Response(
                    {"error": "User account is disabled."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
            # 检查刷新令牌是否在黑名单中
            jti = refresh.get("jti")
            if BlacklistedToken.objects.filter(token__jti=jti).exists():
                return Response(
                    {"error": "Token has been blacklisted."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            # 更新 Redis 缓存
            try:
                path("api-auth/", include("rest_framework.urls")),
            except Exception as e:
                logger.error(f"Failed to cache user info: {str(e)}")

            # 返回新的 AccessToken 与 RefreshToken
            return Response(
                {
                    "access_token": str(refresh.access_token),
                    "refresh_token": str(refresh),
                },
                status=status.HTTP_200_OK,
            )

        except TokenError as e:
            logger.error(f"Invalid refresh token or expired: {str(e)}")
            return Response(
                {"error": "Invalid refresh token or expired."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        except Exception as e:
            logger.error(f"System error during refreshing token: {str(e)}")
            return Response(
                {"error": "System error during refreshing token."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
