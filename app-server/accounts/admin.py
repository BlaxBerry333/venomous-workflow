from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUserModel


class CustomUserModelAdmin(UserAdmin):
    """
    Custom User Model Admin Class
    """

    list_display = ("email", "is_active", "is_superuser", "date_joined", "last_login")
    list_filter = ("email", "date_joined", "last_login")
    list_per_page = 20
    ordering = ("email",)
    search_fields = ("email",)
    readonly_fields = ("id", "date_joined", "last_login")
    ordering = ("email",)
    fieldsets = (
        (None, {"fields": ("password",)}),
        ("User Information", {"fields": ("email", "name", "id")}),
        ("User Permission", {"fields": ("is_staff", "is_superuser")}),
        ("Important Dates", {"fields": ("date_joined", "last_login")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "name", "password1", "password2"),
            },
        ),
    )


admin.site.register(CustomUserModel, CustomUserModelAdmin)
