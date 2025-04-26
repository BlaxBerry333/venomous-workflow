import logging

from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle
from rest_framework.views import APIView

from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken


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

            # 从令牌的 payload 中获取用户信息
            user_id = refresh.payload.get("user_id")
            if not user_id:
                return Response(
                    {"error": "Invalid refresh token."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
            user = User.objects.get(id=user_id)

            # 检查用户是否已被禁用
            if not user.is_active:
                return Response(
                    {"error": "User account is disabled."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            # 返回新的 AccessToken 与 RefreshToken
            return Response(
                {
                    "access_token": str(refresh.access_token),
                    "refresh_token": str(refresh),
                },
                status=status.HTTP_200_OK,
            )

        except TokenError as e:
            logger.error("Invalid refresh token or expired: %s", str(e))
            return Response(
                {"error": "Invalid refresh token or expired."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        except ObjectDoesNotExist:
            logger.error("User not found during token refresh")
            return Response(
                {"error": "User not found during token refresh."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        except Exception as e:
            logger.error("System error during refreshing token: %s", str(e))
            return Response(
                {"error": "System error during refreshing token."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
