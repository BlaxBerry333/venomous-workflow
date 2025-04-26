import logging
from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


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
            logger.error("System error during signin: %s", str(e))
            return Response(
                {"error": "System error during signin."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
