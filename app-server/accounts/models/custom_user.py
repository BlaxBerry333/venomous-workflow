import uuid

from django.contrib.auth.models import UserManager, AbstractBaseUser, PermissionsMixin
from django.db import models


class CustomUserManager(UserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self._create_user(email, password, **extra_fields)


class CustomUserModel(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    email = models.EmailField(
        unique=True,
        blank=False,
        null=False,
        default="",
        verbose_name="User Email",
    )
    name = models.CharField(
        max_length=50,
        unique=False,
        blank=False,
        null=False,
        default="",
        verbose_name="User Name",
    )
    is_superuser = models.BooleanField(
        default=False,
        verbose_name="User Is Superuser",
    )
    is_staff = models.BooleanField(
        default=False,
        verbose_name="User Is Staff",
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name="User Is Active",
    )
    date_joined = models.DateTimeField(
        auto_now_add=True,
        verbose_name="User Date Joined",
    )
    last_login = models.DateTimeField(
        auto_now=True,
        verbose_name="User Last Login",
    )
    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name or self.email.split("@")[0]
