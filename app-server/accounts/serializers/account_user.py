from rest_framework import serializers
from ..models import CustomUserModel


class AccountUserSerializer(serializers.ModelSerializer):
    """
    Account User Serializer
    """

    is_online = serializers.BooleanField(read_only=True)

    class Meta:
        model = CustomUserModel
        fields = ("id", "email", "name", "is_staff", "is_superuser", "is_online")
