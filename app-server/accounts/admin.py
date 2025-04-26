from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUserModel


class CustomUserModelAdmin(UserAdmin):
    list_display = ("email", "is_active", "is_superuser")
    list_filter = ("email",)
    list_per_page = 20
    search_fields = ("email",)
    ordering = ("email",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("User Information", {"fields": ("name",)}),
        ("User Permission", {"fields": ("is_staff", "is_superuser")}),
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
