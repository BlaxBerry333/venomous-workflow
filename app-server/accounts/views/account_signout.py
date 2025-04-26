import logging
from django.contrib.auth import logout
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

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
            # 验证 token 是否有效
            # 使用DRF SimpleJWT的验证方式
            try:
                auth = JWTAuthentication()
                auth.authenticate(request)
            except Exception as e:
                logger.error("Invalid token: %s", str(e))
                return Response(
                    {"error": "Invalid token."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            # 使用 Django 自带的退出逻辑
            # Django 自带的 logout 方法会清除 session
            try:
                logout(request)
            except Exception as logout_err:
                logger.error(
                    "Failed to logout user %s: %s", request.user.id, str(logout_err)
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
            logger.error("System error during signout: %s", str(e))
            return Response(
                {"error": "System error during signout."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
