from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.core.cache import cache
from django.conf import settings
from rest_framework import status
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
import logging
from ..common.constants import REDIS_ACCOUNT_USERS_KEY

logger = logging.getLogger(__name__)


class AccountSigninView(APIView):
    """
    Account Signin View

    Supported methods:
    - POST /api/account/signin/
    """

    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        if not email or not password:
            return Response(
                {"error": "Email and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # 使用 Django 自带的验证逻辑
            # CustomUserModel 中定义的 USERNAME_FIELD 为 email
            user = authenticate(request, email=email, password=password)
            if user is None:
                return Response(
                    {"error": "Invalid username or password."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            # 使用 Django 自带的登陆逻辑
            login(request, user)

            # 缓存用户信息到 Redis
            # 缓存时间为 JWT 过期时间 + 5min ( 20min )
            # 缓存处理异常时记录错误日志但不影响登录流程
            try:
                jwt_timeout = int(
                    settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"].total_seconds()
                )
                cache.hset(REDIS_ACCOUNT_USERS_KEY, str(user.id), "1")
                cache.expire(REDIS_ACCOUNT_USERS_KEY, jwt_timeout + 5 * 60)
            except Exception as e:
                logger.error(f"Failed to cache user info: {str(e)}")

            # 生成并返回 AccessToken 与 RefreshToken
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "access_token": str(refresh.access_token),
                    "refresh_token": str(refresh),
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            logger.error(f"System error during signin: {str(e)}")
            return Response(
                {"error": "System error during signin."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
