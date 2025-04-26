from rest_framework import serializers
from ..models import CustomUserModel


class AccountUserSerializer(serializers.ModelSerializer):
    """
    Account User Serializer
    """

    class Meta:
        model = CustomUserModel
        fields = (
            "id",
            "email",
            "name",
            "is_staff",
            "is_superuser",
            "date_joined",
            "last_login",
        )
