from rest_framework import serializers
from ..models import CustomUserModel


class AccountSignupSerializer(serializers.ModelSerializer):
    """
    Account Signup Serializer
    """

    password = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )

    class Meta:
        model = CustomUserModel
        fields = ["email", "name", "password", "is_staff", "is_superuser"]
        extra_kwargs = {
            "email": {"required": True},
            "name": {"required": True},
            "is_staff": {"default": False, "required": False},
            "is_superuser": {"default": False, "required": False},
        }

    def validate_email(self, value):
        if CustomUserModel.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value

    def create(self, validated_data):
        user = CustomUserModel.objects.create_user(
            email=validated_data["email"],
            name=validated_data["name"],
            is_staff=validated_data.get("is_staff", False),
            is_superuser=validated_data.get("is_superuser", False),
        )
        user.set_password(validated_data["password"])
        user.save()
        return user
