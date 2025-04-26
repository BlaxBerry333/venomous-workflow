import logging
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from ..serializers import AccountSignupSerializer

logger = logging.getLogger(__name__)


class AccountSignupView(APIView):
    """
    Account Signup View

    Supported methods:
    - POST /api/account/signup/
    """

    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = AccountSignupSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # 保存用户数据
            user = serializer.save()

            # 生成并返回 AccessToken 与 RefreshToken
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "access_token": str(refresh.access_token),
                    "refresh_token": str(refresh),
                },
                status=status.HTTP_201_CREATED,
            )

        except Exception as e:
            logger.error(
                "Failed to signup for %s: %s", request.data.get("email"), str(e)
            )
            return Response(
                {"error": "Failed to signup."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
